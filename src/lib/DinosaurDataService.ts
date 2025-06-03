import { createClient } from '@supabase/supabase-js';

// Supabase 설정
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Classification {
    domain?: string;
    kingdom?: string;
    phylum?: string;
    clade?: string;
    family?: string;
    genus?: string;
    species?: string;
}

export interface DinosaurDetails {
    id: number;
    name: string;
    temporalRange: string;
    classification: Classification;
    diet: string;
    locomotionType: string;
    description: string;
    source?: any;
    image?: any;
    createdAt?: string;
}

export interface PaginationResult {
    data: any[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface DinosaurFilters {
    diet?: string;
    locomotionType?: string;
    search?: string;
}

class DinosaurDataService {
    
    /**
     * 모든 공룡 이름 조회
     */
    async getAllDinosaurNames(): Promise<string[]> {
        try {
            const { data, error } = await supabase
                .from('dinosaur_names')
                .select('*')
                .order('name');
            
            if (error) throw error;
            return data?.map((item: any) => item.name) || [];
        } catch (error) {
            console.error('공룡 이름 조회 오류:', error);
            return [];
        }
    }

    /**
     * 필터된 공룡 이름 조회
     */
    async getFilteredDinosaurNames(): Promise<string[]> {
        try {
            const { data, error } = await supabase
                .from('filtered_dinosaur_names')
                .select('*')
                .order('name');
            
            if (error) throw error;
            return data?.map((item: any) => item.name) || [];
        } catch (error) {
            console.error('필터된 공룡 이름 조회 오류:', error);
            return [];
        }
    }

    /**
     * 특정 공룡의 상세 정보 조회
     */
    async getDinosaurDetails(name: string): Promise<DinosaurDetails | null> {
        try {
            const { data, error } = await supabase
                .from('dinosaur_details')
                .select('*')
                .eq('name', name)
                .single();
            
            if (error) throw error;
            return this.formatDinosaurDetails(data);
        } catch (error) {
            console.error('공룡 상세 정보 조회 오류:', error);
            return null;
        }
    }

    /**
     * 여러 공룡의 상세 정보 조회
     */
    async getMultipleDinosaurDetails(names: string[]): Promise<DinosaurDetails[]> {
        try {
            const { data, error } = await supabase
                .from('dinosaur_details')
                .select('*')
                .in('name', names);
            
            if (error) throw error;
            return data?.map((item: any) => this.formatDinosaurDetails(item)).filter((item): item is DinosaurDetails => item !== null) || [];
        } catch (error) {
            console.error('다중 공룡 정보 조회 오류:', error);
            return [];
        }
    }

    /**
     * 모든 공룡 리스트 (기본 정보만)
     */
    async getAllDinosaursBasicInfo(): Promise<any[]> {
        try {
            const { data, error } = await supabase
                .from('dinosaur_details')
                .select('id, name, diet, locomotion_type, temporal_range')
                .order('name');
            
            if (error) throw error;
            console.log(`📊 Supabase에서 총 ${data?.length || 0}개의 공룡 데이터를 가져왔습니다`);
            return data || [];
        } catch (error) {
            console.error('공룡 기본 정보 조회 오류:', error);
            return [];
        }
    }

    /**
     * 모든 공룡 데이터 조회 (페이지네이션 없음)
     */
    async getAllDinosaursWithoutPagination(): Promise<any[]> {
        try {
            console.log('🔍 모든 공룡 데이터를 조회 중...');
            const { data, error } = await supabase
                .from('dinosaur_details')
                .select('id, name, diet, locomotion_type, temporal_range, description')
                .order('name');
            
            if (error) throw error;
            console.log(`✅ 총 ${data?.length || 0}개의 공룡 데이터를 성공적으로 조회했습니다`);
            return data || [];
        } catch (error) {
            console.error('전체 공룡 데이터 조회 오류:', error);
            return [];
        }
    }

    /**
     * 식성별 공룡 조회
     */
    async getDinosaursByDiet(diet: string): Promise<any[]> {
        try {
            const { data, error } = await supabase
                .from('dinosaur_details')
                .select('id, name, diet, locomotion_type, temporal_range')
                .eq('diet', diet)
                .order('name');
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('식성별 공룡 조회 오류:', error);
            return [];
        }
    }

    /**
     * 이동 방식별 공룡 조회
     */
    async getDinosaursByLocomotion(locomotionType: string): Promise<any[]> {
        try {
            const { data, error } = await supabase
                .from('dinosaur_details')
                .select('id, name, diet, locomotion_type, temporal_range')
                .eq('locomotion_type', locomotionType)
                .order('name');
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('이동방식별 공룡 조회 오류:', error);
            return [];
        }
    }

    /**
     * 공룡 이름으로 검색
     */
    async searchDinosaurs(searchTerm: string): Promise<any[]> {
        try {
            const { data, error } = await supabase
                .from('dinosaur_details')
                .select('id, name, diet, locomotion_type, temporal_range, description, image_info')
                .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
                .order('name');
            
            if (error) throw error;
            
            // 각 공룡에 대해 image_data 테이블에서 이미지 정보 가져오기
            const dinosaursWithImages = await Promise.all(
                (data || []).map(async (dinosaur) => {
                    const directImageInfo = await this.getDirectDinosaurImageInfo(dinosaur.name);
                    return {
                        ...dinosaur,
                        // image 필드에 image_data 테이블의 정보 설정
                        image: directImageInfo 
                    };
                })
            );
            
            return dinosaursWithImages;
        } catch (error) {
            console.error('공룡 검색 오류:', error);
            return [];
        }
    }

    /**
     * 랜덤 공룡 조회
     */
    async getRandomDinosaurs(count: number = 5): Promise<DinosaurDetails[]> {
        try {
            const { data, error } = await supabase
                .from('dinosaur_details')
                .select('*')
                .limit(count);
            
            if (error) throw error;
            return data?.map((item: any) => this.formatDinosaurDetails(item)).filter((item): item is DinosaurDetails => item !== null) || [];
        } catch (error) {
            console.error('랜덤 공룡 조회 오류:', error);
            return [];
        }
    }

    /**
     * 공룡 이미지 정보 조회
     */
    async getDinosaurImage(dinosaurName: string): Promise<any | null> {
        try {
            // 공룡 상세 정보에서 이미지 정보 가져오기
            const { data: detailData, error: detailError } = await supabase
                .from('dinosaur_details')
                .select('image_info')
                .eq('name', dinosaurName)
                .single();
            
            if (detailError) throw detailError;
            
            return detailData?.image_info || null;
        } catch (error) {
            console.error('공룡 이미지 조회 오류:', error);
            return null;
        }
    }

    /**
     * 통계 데이터 조회
     */
    async getStatistics(): Promise<any | null> {
        try {
            const [totalCount, dietStats, locomotionStats] = await Promise.all([
                this.getTotalDinosaurCount(),
                this.getDietStatistics(),
                this.getLocomotionStatistics()
            ]);

            return {
                totalDinosaurs: totalCount,
                dietDistribution: dietStats,
                locomotionDistribution: locomotionStats
            };
        } catch (error) {
            console.error('통계 조회 오류:', error);
            return null;
        }
    }

    /**
     * 전체 공룡 수 조회 (데이터는 가져오지 않고 개수만)
     */
    async getTotalDinosaurCount(): Promise<number> {
        try {
            const { count, error } = await supabase
                .from('dinosaur_details')
                .select('*', { count: 'exact', head: true }); // head: true로 데이터는 가져오지 않음
            
            if (error) throw error;
            console.log(`📊 전체 공룡 수: ${count}개`);
            return count || 0;
        } catch (error) {
            console.error('전체 공룡 수 조회 오류:', error);
            return 0;
        }
    }

    /**
     * 식성 통계 조회
     */
    async getDietStatistics(): Promise<Record<string, number>> {
        try {
            const { data, error } = await supabase
                .from('dinosaur_details')
                .select('diet')
                .not('diet', 'is', null);
            
            if (error) throw error;
            
            const dietCount: Record<string, number> = {};
            data?.forEach((item: any) => {
                const diet = item.diet || 'unknown';
                dietCount[diet] = (dietCount[diet] || 0) + 1;
            });
            
            return dietCount;
        } catch (error) {
            console.error('식성 통계 조회 오류:', error);
            return {};
        }
    }

    /**
     * 이동방식 통계 조회
     */
    async getLocomotionStatistics(): Promise<Record<string, number>> {
        try {
            const { data, error } = await supabase
                .from('dinosaur_details')
                .select('locomotion_type')
                .not('locomotion_type', 'is', null);
            
            if (error) throw error;
            
            const locomotionCount: Record<string, number> = {};
            data?.forEach((item: any) => {
                const locomotion = item.locomotion_type || 'unknown';
                locomotionCount[locomotion] = (locomotionCount[locomotion] || 0) + 1;
            });
            
            return locomotionCount;
        } catch (error) {
            console.error('이동방식 통계 조회 오류:', error);
            return {};
        }
    }

    /**
     * 공룡 데이터 포맷팅
     */
    formatDinosaurDetails(data: any): DinosaurDetails | null {
        if (!data) return null;
        
        return {
            id: data.id,
            name: data.name,
            temporalRange: data.temporal_range,
            classification: {
                domain: data.domain,
                kingdom: data.kingdom,
                phylum: data.phylum,
                clade: data.clade,
                family: data.family_info,
                genus: data.genus_info,
                species: data.species_info
            },
            diet: data.diet,
            locomotionType: data.locomotion_type,
            description: data.description,
            source: data.source_info,
            image: data.image_info,
            createdAt: data.created_at
        };
    }

    /**
     * 최적화된 페이지네이션 조회 (기본 페이지 크기: 12개)
     */
    async getPaginatedDinosaurs(page: number = 1, limit: number = 12, filters: DinosaurFilters = {}): Promise<PaginationResult> {
        try {
            const offset = (page - 1) * limit;

            let query = supabase
                .from('dinosaur_details')
                // IMPORTANT: Select all columns needed for the main listing AND for getDirectDinosaurImageInfo
                // Ensure 'name' and 'image_info' (if image_info.title is used by getDirectDinosaurImageInfo)
                // are selected. For now, using '*' for simplicity, but specify columns for production.
                .select('*', { count: 'exact' }); 

            if (filters.diet) {
                query = query.eq('diet', filters.diet);
            }
            if (filters.locomotionType) {
                query = query.ilike('locomotion_type', filters.locomotionType);
            }
            if (filters.search) {
                // Assuming filters.search is used for a general text search on 'name' or 'description'
                // This might need adjustment based on actual search requirements
                query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
            }

            query = query.range(offset, offset + limit - 1)
                         .order('name', { ascending: true }); // Or any other default sort order

            const { data: baseData, error, count } = await query;

            if (error) throw error;

            // Fetch detailed image information for each dinosaur in parallel
            const dinosaursWithImages = await Promise.all(
                (baseData || []).map(async (dinosaur) => {
                    const directImageInfo = await this.getDirectDinosaurImageInfo(dinosaur.name);
                    return {
                        ...dinosaur,
                        // The 'image' field will now hold the record from 'image_data' table
                        // or null if not found. The API route will then use image.url as source.
                        image: directImageInfo 
                    };
                })
            );

            const total = count || 0;
            const totalPages = Math.ceil(total / limit);

            return {
                data: dinosaursWithImages,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages,
                    hasNext: page < totalPages,
                    hasPrev: page > 1,
                },
            };
        } catch (error) {
            console.error('페이지네이션된 공룡 데이터 조회 오류:', error);
            return {
                data: [],
                pagination: {
                    page,
                    limit,
                    total: 0,
                    totalPages: 0,
                    hasNext: false,
                    hasPrev: false,
                },
            };
        }
    }

    /**
     * 특정 공룡의 image_data 테이블 정보 조회 (직접 URL 포함)
     */
    async getDirectDinosaurImageInfo(dinosaurName: string): Promise<any | null> {
        try {
            // 1. dinosaur_details에서 image_info.title 가져오기
            const { data: details, error: detailsError } = await supabase
                .from('dinosaur_details')
                .select('name, image_info') // image_info만 선택해도 될 수 있습니다.
                .eq('name', dinosaurName)
                .single();

            if (detailsError) throw detailsError;
            if (!details || !details.image_info || !details.image_info.title) {
                // console.warn(`이미지 기본 정보를 찾을 수 없습니다 (getDirectDinosaurImageInfo): ${dinosaurName}`);
                return null;
            }

            const baseImageTitle = details.image_info.title;

            // 2. image_data 테이블에서 매칭되는 이미지 검색
            const searchPattern = `File:${baseImageTitle}.%`; // `File:` 접두사가 항상 붙는지 확인 필요
            
            const { data: imageDataEntry, error: imageError } = await supabase
                .from('image_data')
                .select('*') // 필요한 컬럼만 명시 (예: 'url, title, author, license')
                .ilike('title', searchPattern)
                .maybeSingle();

            if (imageError) throw imageError;
            
            // if (!imageDataEntry) {
            //     console.warn(`image_data 테이블에서 매칭되는 이미지를 찾을 수 없습니다. Pattern: ${searchPattern}, Name: ${dinosaurName}`);
            // }

            return imageDataEntry; 

        } catch (error) {
            console.error(`직접 공룡 이미지 정보 조회 오류 (${dinosaurName}):`, error);
            return null;
        }
    }
}

export default DinosaurDataService; 