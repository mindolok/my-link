# MyLink 프로젝트 가이드

이 파일은 MyLink 프로젝트의 구조, 기술 스택, 개발 규칙 및 핵심 워크플로우를 정의합니다. 제미나이(Gemini) CLI 에이전트는 개발 중에 이 가이드를 반드시 따라야 합니다.

## 1. 프로젝트 개요
* **목적:** 여러 링크(SNS, 포트폴리오, 블로그 등)를 공유하기 위해 하나의 통합된 페이지로 모아주는 '멀티 링크 프로필' 서비스.
* **타겟 사용자:** 개발자, 크리에이터.
* **핵심 철학:** 간결한 UI/UX, **인라인 편집(Inline Editing)**을 통한 즉각적인 관리 경험.

## 2. 기술 스택
* **프레임워크:** Next.js 16 (App Router)
* **라이브러리:** React 19
* **스타일링:** Tailwind CSS v4
* **UI 컴포넌트:** shadcn/ui (Radix UI 기반)
* **백엔드/인증:** Firebase (Authentication, Firestore) - *설정 예정*
* **아이콘:** Lucide React
* **테마:** next-themes (다크 모드 지원)

## 3. 프로젝트 구조
```text
D:\vibe_coding\my-link\
├── app/                # Next.js App Router (페이지 및 레이아웃)
├── components/         # 공통 컴포넌트
│   └── ui/             # shadcn/ui 컴포넌트
├── docs/               # 기획 및 디자인 문서 (PRD, 시나리오, 와이어프레임)
├── hooks/              # 커스텀 React 훅
├── lib/                # 유틸리티 함수 및 설정 (Firebase 등)
└── public/             # 정적 에셋
```

## 4. 개발 규칙 및 컨벤션

### 언어 및 소통
* **한국어 작성:** 모든 대화, 문서화, 태스크, 커밋 메시지는 항상 **한국어(Korean)**로 작성해야 합니다.

### UI/UX 원칙
* **반응형 디자인:** 모든 화면은 모바일 기기부터 데스크탑까지 완벽하게 작동하고 아름답게 보여야 합니다. (소프트 섀도우, 둥근 모서리를 강조하는 모던 UI 적용)
* **인라인 편집 (Inline Editing):** 프로필 정보(이름, 소개)나 링크 정보(제목, URL)를 수정할 때 별도의 폼 페이지로 이동하지 않고 그 자리에서 텍스트를 바로 편집하는 방식을 사용합니다.
* **일관성:** `shadcn/ui`에서 제공하는 스타일을 유지하며, 클래스 조합 시 `@/lib/utils.ts`의 `cn()` 함수를 사용합니다.

### 코딩 규칙
* **TypeScript:** 모든 코드는 엄격한 타입 검사를 통과해야 합니다.
* **컴포넌트:** 기본적으로 서버 컴포넌트(RSC)를 사용하며, 상태 관리가 필요한 경우에만 'use client'를 사용합니다.
* **아이콘:** `lucide-react`를 사용합니다.
* **경로 별칭 (Path Alias):** `@/` 접두사를 사용합니다 (예: `@/components/...`, `@/lib/...`).
* **문서 참조:** 문서를 참조할 때는 `@` 접두사를 사용합니다 (예: `@docs/PRD.md`).

### 데이터 관리
* **Firebase Firestore:** 사용자 데이터는 `users` 컬렉션에, 링크 데이터는 사용자 문서 하위의 `links` 서브 컬렉션에 저장합니다.
* **파비콘 (Favicons):** 링크를 추가할 때 Google 파비콘 API (`https://www.google.com/s2/favicons?domain=DOMAIN&sz=64`)를 사용하여 자동으로 아이콘을 추출합니다.

## 5. 주요 명령어
* `npm run dev`: 개발 서버 시작
* `npm run build`: 프로덕션 빌드
* `npm run start`: 빌드된 앱 실행
* `npm run lint`: 린트 검사
* `npm run format`: 코드 포매팅 (Prettier)
* `npm run typecheck`: TypeScript 타입 검사

## 6. 참고 문서
* [제품 요구사항 정의서 (PRD)](@docs/PRD.md)
* [사용자 시나리오](@docs/USER_SCENARIO.md)
* [와이어프레임](@docs/Wireframe.md)