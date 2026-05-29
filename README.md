# MyLink

나만의 멀티 링크 프로필 서비스. GitHub, 블로그, 포트폴리오, SNS 등 흩어진 링크를 단 하나의 깔끔한 페이지로 모아 공유하세요.

## 🚀 주요 특징

- **직관적인 인라인 편집**: 별도의 설정 페이지 없이 텍스트를 클릭해 그 자리에서 즉시 프로필과 링크를 수정합니다.
- **아름답고 미니멀한 UI**: 어떤 기기에서든 완벽하게 어우러지는 모던한 다크/라이트 모드 테마를 지원합니다.
- **간편한 소셜 로그인**: Google 계정 하나로 복잡한 가입 절차 없이 3초 만에 시작할 수 있습니다.
- **맞춤형 동적 오픈 그래프 (OG)**: 공유되는 링크 카드에 사용자의 프로필 상태가 아름답게 표시됩니다.

## 🛠 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Backend & Auth**: Firebase Authentication, Firestore
- **Icons**: Lucide React

## 💻 로컬 개발 환경 설정

### 1. 환경 변수 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 아래 Firebase 설정값을 입력하세요.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하여 확인합니다.

## 📁 주요 디렉토리 구조
- `/app`: 라우팅(App Router) 및 메인 페이지 구성 요소
- `/components`: 전역에서 재사용 가능한 UI 컴포넌트 (shadcn/ui 등)
- `/lib`: Firebase 연동 및 공통 유틸리티 함수
- `/hooks`: 상태 관리를 위한 커스텀 훅 모음
