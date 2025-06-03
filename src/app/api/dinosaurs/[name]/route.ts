import { NextRequest, NextResponse } from 'next/server';
import DinosaurDataService from '@/lib/DinosaurDataService';

const dinosaurService = new DinosaurDataService();

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ name: string }> }
) {
    try {
        const { name } = await params;
        const dinosaurName = decodeURIComponent(name);
        
        // Supabase에서 공룡 상세 정보 조회
        const dinosaur = await dinosaurService.getDinosaurDetails(dinosaurName);

        if (!dinosaur) {
            return NextResponse.json(
                { success: false, error: 'Dinosaur not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: dinosaur
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch dinosaur details' },
            { status: 500 }
        );
    }
} 