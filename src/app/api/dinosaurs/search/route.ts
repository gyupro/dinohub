import { NextRequest, NextResponse } from 'next/server';
import DinosaurDataService from '@/lib/DinosaurDataService';

const dinosaurService = new DinosaurDataService();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');
        
        if (!query) {
            return NextResponse.json(
                { success: false, error: 'Search query is required' },
                { status: 400 }
            );
        }

        // Supabase에서 검색 수행
        const results = await dinosaurService.searchDinosaurs(query);

        // 각 공룡 데이터에 id가 없는 경우 name의 해시값을 id로 사용
        const processedResults = results.map((dinosaur: any, index: number) => ({
            ...dinosaur,
            id: dinosaur.id || `${dinosaur.name}-${index}`.replace(/\s+/g, '-').toLowerCase(),
            // Supabase 필드명을 프론트엔드 형식으로 매핑
            locomotionType: dinosaur.locomotion_type || dinosaur.locomotionType,
            temporalRange: dinosaur.temporal_range || dinosaur.temporalRange,
            // DinosaurImage 구조로 반환하여 타입 호환성 확보
            image: dinosaur.image ? {
                id: dinosaur.image.id || 0,
                source: dinosaur.image.url || dinosaur.image.source || '',
                attribution: dinosaur.image.attribution || dinosaur.image.author || '',
                license: dinosaur.image.license || ''
            } : null
        }));

        return NextResponse.json({
            success: true,
            data: processedResults
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to search dinosaurs' },
            { status: 500 }
        );
    }
} 