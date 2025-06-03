import DinosaurDataService, { DinosaurDetails } from '@/lib/DinosaurDataService';

// 공룡 데이터 타입 정의
export interface DinosaurImage {
  id: number;
  source: string;
  attribution: string;
  license: string;
}

export interface ClassificationInfo {
  id: number;
  kingdom: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  species: string;
}

export interface DinosaurSource {
  id: number;
  title: string;
  author: string;
  url: string;
  lastRevision: string;
}

export interface Dinosaur {
  id: number;
  name: string;
  temporalRange: string;
  diet: string;
  locomotionType: string;
  description: string;
  length?: string;
  weight?: string;
  height?: string;
  location?: string;
  period?: string;
  existed?: string;
  classification?: ClassificationInfo;
  image?: DinosaurImage;
  source?: DinosaurSource;
}

// DinosaurDataService 인스턴스 생성
const dinosaurService = new DinosaurDataService();

// API 기본 설정
const API_BASE = '/api';

// 공룡 데이터 API 함수들
export async function getAllDinosaurs(limit: number = 20): Promise<Dinosaur[]> {
  try {
    console.log('🦕 공룡 데이터를 가져오는 중...');
    
    const response = await fetch(`${API_BASE}/dinosaurs?limit=${limit}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success || !result.data) {
      throw new Error('API 응답 형식이 올바르지 않습니다');
    }
    
    const dinosaurs = Array.isArray(result.data) ? result.data : result.data.data || [];
    
    console.log(`✅ ${dinosaurs.length}개의 공룡 데이터를 성공적으로 가져왔습니다!`);
    
    return dinosaurs;
  } catch (error) {
    console.error('❌ API 연결 실패:', error);
    throw error;
  }
}

export async function searchDinosaurs(query: string): Promise<Dinosaur[]> {
  try {
    console.log(`🔍 검색어 "${query}"로 공룡을 검색 중...`);
    
    const response = await fetch(`${API_BASE}/dinosaurs/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error('검색 API 응답에서 오류 발생');
    }
    
    console.log(`✅ ${result.data.length}개의 검색 결과를 찾았습니다`);
    return result.data;
  } catch (error) {
    console.error('❌ 검색 API 오류:', error);
    throw error;
  }
}

export async function searchDinosaursByFilter(filters: {
  period?: string;
  diet?: string;
  region?: string;
  type?: string;
}): Promise<Dinosaur[]> {
  try {
    const queryParams = new URLSearchParams();
    if (filters.diet) queryParams.append('diet', filters.diet);
    if (filters.type) queryParams.append('locomotionType', filters.type);
    if (filters.period) queryParams.append('period', filters.period);
    if (filters.region) queryParams.append('region', filters.region);
    
    const url = `${API_BASE}/dinosaurs?${queryParams.toString()}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error('필터 API 응답에서 오류 발생');
    }
    
    return result.data;
  } catch (error) {
    console.error('필터 검색 중 오류:', error);
    throw error;
  }
}

export async function getDinosaurByName(name: string): Promise<Dinosaur | null> {
  try {
    const response = await fetch(`${API_BASE}/dinosaurs/${encodeURIComponent(name)}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      return null;
    }
    
    return result.data;
  } catch (error) {
    console.error('공룡 이름으로 검색 중 오류:', error);
    throw error;
  }
}

export async function getDinosaurById(id: number): Promise<Dinosaur | null> {
  try {
    const response = await fetch(`${API_BASE}/dinosaurs/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      return null;
    }
    
    return result.data;
  } catch (error) {
    console.error('공룡 ID로 검색 중 오류:', error);
    throw error;
  }
}

export function getRandomDinosaurs(count: number = 20): Promise<Dinosaur[]> {
  return getAllDinosaurs(count);
}

// DinosaurDataService 인스턴스를 외부에서 사용할 수 있도록 export
export { dinosaurService }; 