import { NextRequest, NextResponse } from 'next/server';
import DinosaurDataService from '@/lib/DinosaurDataService';

const dinosaurService = new DinosaurDataService();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12'); // 기본 12개씩
        const diet = searchParams.get('diet') || undefined;
        const locomotionType = searchParams.get('locomotionType') || undefined;
        const period = searchParams.get('period') || undefined;

        console.log(`🔍 API 요청: page=${page}, limit=${limit}, diet=${diet}, locomotionType=${locomotionType}, period=${period}`);

        // 필터 객체 생성
        const filters: any = {};
        if (diet) filters.diet = diet;
        if (locomotionType) filters.locomotionType = locomotionType;
        if (period) filters.search = period;
        
        console.log('🔧 Filters object:', JSON.stringify(filters, null, 2));

        // Supabase에서 페이지네이션된 데이터 가져오기
        const result = await dinosaurService.getPaginatedDinosaurs(page, limit, filters);

        console.log(`📊 페이지 ${page}: ${result.data.length}개 조회, 전체 ${result.pagination.total}개`);

        // 데이터 매핑
        const processedData = result.data.map((dinosaur: any, index: number) => {
            // DinosaurDataService의 getPaginatedDinosaurs는 이제 각 공룡 객체의 
            // 'image' 필드에 image_data 테이블의 레코드(또는 null)를 직접 포함하여 반환합니다.
            const directImageData = dinosaur.image; // image_data 테이블의 레코드 (또는 null)
            const directImageUrl = directImageData?.url; // 실제 이미지 URL 추출

            // 기존 dinosaur 객체에서 image 필드(directImageData)를 제외한 나머지를 보존합니다.
            // API 응답으로 나가는 최종 image 객체는 새로 구성합니다.
            const { image, ...restOfDinosaurDetails } = dinosaur;

            return {
                ...restOfDinosaurDetails, // name, description, image_info (기존 웹페이지 링크가 있는 객체) 등 포함
                id: dinosaur.id || `${dinosaur.name}-${(page-1)*limit + index}`.replace(/\s+/g, '-').toLowerCase(),
                locomotionType: dinosaur.locomotion_type || dinosaur.locomotionType,
                temporalRange: dinosaur.temporal_range || dinosaur.temporalRange,
                // 프론트엔드가 사용할 최종 image 객체 구성
                // directImageUrl이 있으면, directImageData의 모든 정보와 함께 source: directImageUrl 추가
                // directImageUrl이 없으면 (예: directImageData가 null), image 필드는 undefined가 됨
                image: directImageUrl ? { ...directImageData, source: directImageUrl } : undefined
            };
        });

        return NextResponse.json({
            success: true,
            data: {
                ...result,
                data: processedData
            }
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch dinosaurs' },
            { status: 500 }
        );
    }
} 