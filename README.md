# 🦕 Dinosaur Discovery

**공룡 발견과 탐험을 위한 현대적인 웹 애플리케이션**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![React](https://img.shields.io/badge/React-18-blue)

## 🌟 프로젝트 소개

Dinosaur Discovery는 다양한 시대의 공룡 데이터를 제공하는 현대적인 웹 애플리케이션입니다. 과학적 정확성과 사용자 경험을 모두 만족시키는 공룡 도감입니다.

### ✨ 주요 기능

- **실시간 검색**: 공룡 이름, 시대, 식성별 빠른 검색
- **상세 정보**: 각 공룡의 분류학적 정보, 크기, 서식지 데이터
- **반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험
- **다국어 지원**: 한국어/영어 지원
- **과학적 분류**: 완전한 분류학적 체계 제공
- **고품질 이미지**: 각 공룡의 상세한 시각적 정보

## 🛠️ 기술 스택

### Frontend
- **Next.js 14**: React 기반 풀스택 프레임워크
- **TypeScript**: 타입 안전성 보장
- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크
- **React Hooks**: 현대적인 React 패턴

### 데이터 관리
- **React Query**: 서버 상태 관리
- **TypeScript Interfaces**: 타입 안전한 데이터 모델
- **Local Storage**: 클라이언트 사이드 데이터 캐싱

### UI/UX
- **Responsive Design**: 모바일 퍼스트 디자인
- **Accessibility**: WCAG 2.1 준수
- **Loading States**: 향상된 사용자 경험
- **Error Boundaries**: 안정적인 에러 핸들링

## 🚀 시작하기

### 사전 요구사항

```bash
Node.js 18.0.0 이상
npm 또는 yarn 패키지 매니저
```

### 설치

1. **저장소 클론**
```bash
git clone https://github.com/yourusername/dinosaur-discovery.git
cd dinosaur-discovery
```

2. **의존성 설치**
```bash
npm install
# 또는
yarn install
```

3. **개발 서버 실행**
```bash
npm run dev
# 또는
yarn dev
```

4. **브라우저에서 확인**
```
http://localhost:3000
```

### 환경 설정

`.env.local` 파일을 생성하고 필요한 환경 변수를 설정하세요:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── globals.css        # 글로벌 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # React 컴포넌트
│   ├── blog/             # 블로그 관련 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   └── ui/               # 재사용 가능한 UI 컴포넌트
├── data/                 # 데이터 모델 및 타입
├── hooks/                # 커스텀 React 훅
├── lib/                  # 유틸리티 함수
└── locales/              # 다국어 지원 파일
```

## 🔧 사용 가능한 스크립트

```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run lint         # ESLint 실행
npm run type-check   # TypeScript 타입 체크
```

## 🎨 컴포넌트 아키텍처

### 주요 컴포넌트

- **DinosaurSearch**: 공룡 검색 기능
- **DinosaurPost**: 개별 공룡 카드 컴포넌트
- **BlogPostModal**: 공룡 상세 정보 모달

### 커스텀 훅

- **useDinosaurData**: 공룡 데이터 관리
- **useI18n**: 국제화 지원

## 📊 데이터 구조

```typescript
interface Dinosaur {
  id: number
  name: string
  description: string
  diet: string
  locomotionType: string
  temporalRange: string
  existed?: string
  length?: string
  weight?: string
  height?: string
  location?: string
  period?: string
  classification?: Classification
  image?: DinosaurImage
  source?: DinosaurSource
}
```

## 🌐 국제화 (i18n)

프로젝트는 다국어를 지원합니다:

- **한국어** (기본): `src/locales/ko.json`
- **영어**: `src/locales/en.json`

### 새로운 언어 추가

1. `src/locales/` 디렉토리에 새 JSON 파일 생성
2. `src/lib/i18n.ts`에 언어 설정 추가
3. `LanguageSwitcher` 컴포넌트에 옵션 추가

## 🔍 검색 기능

### 지원하는 검색 유형

- **이름 검색**: 공룡 이름으로 검색
- **시대 검색**: 지질학적 시대별 필터링
- **식성 검색**: 육식/초식/잡식 필터링
- **크기 검색**: 크기별 분류

### 검색 알고리즘

```typescript
const searchAlgorithm = (dinosaurs: Dinosaur[], query: string) => {
  return dinosaurs.filter(dinosaur => 
    dinosaur.name.toLowerCase().includes(query.toLowerCase()) ||
    dinosaur.diet.toLowerCase().includes(query.toLowerCase()) ||
    dinosaur.temporalRange.toLowerCase().includes(query.toLowerCase())
  )
}
```

## 📱 반응형 디자인

### 브레이크포인트

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### 그리드 시스템

- **Mobile**: 1열 레이아웃
- **Tablet**: 2열 레이아웃
- **Desktop**: 3열 레이아웃 (사이드바 포함)

## 🚀 배포

### Vercel 배포 (권장)

1. **Vercel 계정 생성**: [vercel.com](https://vercel.com)

2. **저장소 연결**
```bash
npx vercel --prod
```

3. **환경 변수 설정**: Vercel 대시보드에서 환경 변수 추가

### 다른 플랫폼 배포

- **Netlify**: `npm run build` 후 `out` 폴더 배포
- **GitHub Pages**: GitHub Actions 워크플로우 사용
- **Docker**: 제공된 Dockerfile 사용

## 🤝 기여하기

프로젝트에 기여해주셔서 감사합니다!

### 기여 방법

1. **Fork** 저장소를 포크하세요
2. **Branch** 새로운 기능 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. **Commit** 변경사항을 커밋하세요 (`git commit -m 'Add some amazing feature'`)
4. **Push** 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. **Pull Request** 풀 리퀘스트를 생성하세요

### 개발 가이드라인

- **코딩 스타일**: ESLint 및 Prettier 설정 준수
- **커밋 메시지**: [Conventional Commits](https://conventionalcommits.org/) 형식 사용
- **타입 안전성**: TypeScript 엄격 모드 준수
- **테스트**: 새로운 기능에 대한 테스트 코드 작성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- **위키피디아**: 기초 공룡 정보 제공
- **Tailwind CSS**: 아름다운 UI 컴포넌트
- **Next.js 팀**: 훌륭한 React 프레임워크
- **TypeScript 팀**: 타입 안전성 제공

## 📞 문의하기

- **이슈 리포트**: [GitHub Issues](https://github.com/yourusername/dinosaur-discovery/issues)
- **기능 요청**: [GitHub Discussions](https://github.com/yourusername/dinosaur-discovery/discussions)

## 🔍 SEO 최적화

이 프로젝트는 검색엔진 최적화를 위해 다음을 포함합니다:

- 페이지별 title, description, keywords, canonical, robots 메타 태그
- Open Graph, Twitter Card 메타 태그
- JSON-LD 구조화 데이터 (Organization, Website)
- favicon.ico, apple-touch-icon.png, og-image.jpg 등 대표 이미지
- robots.txt, sitemap.xml (public 폴더에 위치, 필요시 생성)
- 접근성(alt 태그, 명확한 버튼/링크 텍스트 등)
- 다국어 지원 및 <html lang="ko"> 설정
- 반응형 디자인

SEO 관련 추가 설정은 필요에 따라 public 폴더에 파일을 추가하거나, Next.js의 generateMetadata/generateSitemap 기능을 활용할 수 있습니다.

---

**🦕 공룡의 세계로 떠나는 여행을 시작하세요! 🦖** 