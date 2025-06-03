import { NextRequest, NextResponse } from 'next/server';
import DinosaurDataService from '@/lib/DinosaurDataService';

const dinosaurService = new DinosaurDataService();

export async function GET(request: NextRequest) {
    try {
        console.log('📊 총 공룡 수 조회 요청');
        
        // 총 개수만 조회 (데이터는 가져오지 않음)
        const totalCount = await dinosaurService.getTotalDinosaurCount();
        
        console.log(`✅ 총 공룡 수: ${totalCount}개`);

        return NextResponse.json({
            success: true,
            data: {
                total: totalCount
            }
        });
    } catch (error) {
        console.error('총 개수 조회 API 오류:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to get dinosaur count' },
            { status: 500 }
        );
    }
} 