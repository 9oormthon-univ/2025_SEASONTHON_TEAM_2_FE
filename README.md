<h2> <p align="center"> ☁️ [2025 kakao X 9oorm 시즌톤] 2팀 Everflow ☁️ </p> </h2>
<p align="center">$\huge{\rm{\color{#B1CEB1}세대를\ 잇는\ 소통의\ 흐름}}$</p>
<h3> <p align="center">🌊 Everflow 와 함께해보세요.</p> </h3>

<img width="7680" height="4320" alt="Image" src="https://github.com/user-attachments/assets/5a03afa9-36c2-433c-ae41-59e6e6c06761" />

## 🚀 핵심 기술 스택

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand, TanStack Query
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **UI Components**: React Toastify
- **Animation**: Lottie Files
- **Authentication**: Kakao OAuth 2.0

## ✨ 주요 기능

### 📚 가족 책장 (Family Bookshelf)

- 각 가족 구성원의 개인 책장을 시각적으로 표현
- 질문과 답변을 책장 형태로 정리하여 보관
- 가족 구성원들의 책장을 한눈에 조회 가능
- 답변 수정 및 삭제 기능 지원

### 💭 오늘의 질문 (Topic Questions)

- 3일 간격으로 새로운 질문이 제공되어 가족 간 대화 유도
- 질문별 답변 기간 표시 (예: "3일 남음")
- 가족 구성원들의 답변을 실시간으로 확인
- 답변 수정 및 지난 질문 히스토리 조회 기능

### 👨‍👩‍👧‍👦 가족 관리 (Family Management)

- 가족 구성원 초대 및 관리
- 가족 코드를 통한 초대 시스템
- 가족 구성원 프로필 정보 관리
- 가족 참여도 진행률 시각화

### 📝 가족 메모장 (Family Memo)

- 가족만의 특별한 메모를 공유
- 중요한 일정이나 추억을 함께 기록
- 가족 구성원 모두가 접근 가능한 공유 메모 공간

### 📱 반응형 디자인

- 데스크톱과 모바일 환경 모두 지원
- 모바일 전용 큰 글씨 모드 제공
- 터치 친화적인 인터페이스 설계

### 🔐 인증 및 보안

- 카카오 소셜 로그인을 통한 간편 인증
- JWT 토큰 기반 인증 시스템
- 가족별 데이터 격리 및 보안

## 🛠️ 설치 및 실행 방법

### 사전 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn
- 카카오 개발자 계정 (OAuth 설정용)

### 1. 프로젝트 클론

```bash
git clone https://github.com/your-username/EverFlow_FE.git
cd EverFlow_FE
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
VITE_API_URL=your_backend_api_url
VITE_DEPLOY_URL=your_deploy_url
VITE_KAKAO_REDIRECT_URI=your_kakao_auth_redirect_uri
VITE_KAKAO_AUTH_CLIENT_ID=your_kakao_client_id
```

### 4. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 실행되면 `http://localhost:5173`에서 애플리케이션을 확인할 수 있습니다.

### 5. 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 📖 사용 방법

### 초기 설정

1. **카카오 로그인**: 메인 페이지에서 카카오 계정으로 로그인
2. **가족 생성**: 새로운 가족 그룹을 생성하거나 초대 코드로 기존 가족에 참여
3. **프로필 설정**: 닉네임과 기본 정보를 입력하여 프로필 완성

### 주요 기능 사용법

#### 오늘의 질문 답변하기

1. 홈 화면에서 "오늘의 질문" 섹션 확인
2. "답변하기" 버튼을 클릭하여 답변 작성
3. 답변 제출 후 가족 구성원들의 답변 확인 가능
4. "지난 질문 보기"로 이전 질문들과 답변 히스토리 조회

#### 가족 책장 관리

1. "가족 책장" 섹션에서 각 가족 구성원의 책장 확인
2. 개인 책장 클릭 시 자신의 질문과 답변 목록 조회
3. 답변 수정 및 커스텀 질문 추가 가능
4. 가족 구성원의 책장을 클릭하여 서로의 답변 확인

#### 가족 관리

1. "가족 관리" 메뉴에서 가족 구성원 초대
2. 가족 코드를 생성하여 새로운 구성원 초대
3. 가족 구성원 목록 확인 및 관리

### 모바일 사용법

- 모바일에서는 터치 친화적인 인터페이스 제공
- "큰 글씨 화면" 토글을 통해 가독성 향상
- 하단 네비게이션을 통한 쉬운 메뉴 접근

## 🏗️ 프로젝트 구조

```
EverFlow_FE/
├── public/                     # 정적 자산 (Lottie 애니메이션, 이미지)
│   ├── EVF.png
│   ├── firework.lottie
│   ├── main.lottie
│   ├── send.lottie
│   ├── vite.svg
│   └── xmark.lottie
├── src/
│   ├── api/                    # API 통신 관련 파일
│   │   ├── auth/              # 인증 관련 API
│   │   │   └── family.ts      # 가족 관련 API
│   │   ├── home/              # 홈 화면 관련 API
│   │   │   └── topics.ts      # 질문/답변 관련 API
│   │   ├── appointments.ts     # 약속/일정 관련 API
│   │   ├── authKakao.ts       # 카카오 OAuth API
│   │   ├── axiosInstance.ts   # Axios 인스턴스 설정
│   │   ├── bookshelf.ts       # 책장 관련 API
│   │   ├── family.ts          # 가족 관리 API
│   │   ├── notifications.ts  # 알림 관련 API
│   │   └── user.ts            # 사용자 관련 API
│   ├── assets/                # 정적 자산
│   │   ├── fonts/             # 폰트 파일
│   │   │   ├── GangwonEduSaeeum.woff
│   │   │   ├── KCCGanpan.woff
│   │   │   └── Pretendard.woff
│   │   └── icons/             # 아이콘 파일
│   │       ├── home/          # 홈 화면 아이콘
│   │       │   ├── Bell_Active.svg
│   │       │   ├── Bell.svg
│   │       │   ├── Book_Blue.svg
│   │       │   ├── Book_Green.svg
│   │       │   ├── Book_Orange.svg
│   │       │   ├── Book_Pink.svg
│   │       │   ├── Book_Yellow.svg
│   │       │   ├── BookIcon.svg
│   │       │   ├── Heart.svg
│   │       │   ├── LinkIcon.svg
│   │       │   ├── Note.svg
│   │       │   ├── OptionIcon_Green.svg
│   │       │   ├── PeoplesIcon.svg
│   │       │   ├── Q_mark.svg
│   │       │   ├── Xmark.svg
│   │       │   └── index.ts
│   │       ├── mobile/        # 모바일 아이콘
│   │       │   ├── BookIcon.svg
│   │       │   ├── HomeIcon.svg
│   │       │   ├── MemoIcon.svg
│   │       │   ├── MobileIcon.svg
│   │       │   ├── ProfileIcon.svg
│   │       │   └── index.ts
│   │       ├── Bookshelf_bg.svg
│   │       ├── CheckIcon.svg
│   │       ├── EFL.svg
│   │       ├── EverFlowChar.svg
│   │       ├── EverflowHeaderLogo.svg
│   │       ├── EverFlowLogo.svg
│   │       ├── HeaderLogo.svg
│   │       ├── kakao_chatbubble.svg
│   │       ├── MagicWand.svg
│   │       ├── NoteBG.svg
│   │       ├── OptionIcon.svg
│   │       ├── photo.svg
│   │       ├── react.svg
│   │       ├── Tooltip.svg
│   │       ├── WarningIcon.svg
│   │       └── index.ts
│   ├── components/            # 재사용 가능한 컴포넌트
│   │   ├── bookshelf/        # 책장 관련 컴포넌트
│   │   │   └── FamilyBookshelfDetail.tsx
│   │   ├── common/           # 공통 컴포넌트
│   │   │   ├── Card.tsx
│   │   │   └── SectionHeader.tsx
│   │   ├── home/             # 홈 화면 컴포넌트
│   │   │   ├── FamilyBookshelf.tsx
│   │   │   ├── FamilyManage.tsx
│   │   │   ├── FamilyMembersCard.tsx
│   │   │   ├── PastQuestion.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── TodaysQuestion.tsx
│   │   ├── mobile/           # 모바일 전용 컴포넌트
│   │   │   ├── LargeBackButton.tsx
│   │   │   ├── LargeMobileFamilyBookshelf.tsx
│   │   │   ├── LargeMobileFamilyBookshelfDetail.tsx
│   │   │   ├── LargeMobileTodaysQuestion.tsx
│   │   │   ├── MobileAppiontmentModal.tsx
│   │   │   ├── MobileFamilyBookshelfDetail.tsx
│   │   │   ├── MobileFamilyMembersCard.tsx
│   │   │   ├── MobileHeader.tsx
│   │   │   ├── MobileMemo.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── MobileProfile.tsx
│   │   │   └── MobileTodaysQuestion.tsx
│   │   ├── modal/            # 모달 컴포넌트
│   │   │   ├── AppointmentDayDetailModal.tsx
│   │   │   ├── AppointmentModal.tsx
│   │   │   ├── MemberRequestModal.tsx
│   │   │   └── UserProfileModal.tsx
│   │   ├── notifications/    # 알림 관련 컴포넌트
│   │   │   ├── NotificationPopover.tsx
│   │   │   └── type.tsx
│   │   ├── onboarding/      # 온보딩 컴포넌트
│   │   │   ├── CreateSuccessPage.tsx
│   │   │   ├── InputUserInfo.tsx
│   │   │   ├── Intro.tsx
│   │   │   ├── JoinPending.tsx
│   │   │   ├── JoinQuestion.tsx
│   │   │   ├── TermsAndConfitions.tsx
│   │   │   └── index.ts
│   │   ├── toast/           # 토스트 알림 컴포넌트
│   │   │   ├── FailToast.tsx
│   │   │   └── SuccessToast.tsx
│   │   ├── CustomCalendar.tsx
│   │   ├── FamilyMemo.tsx
│   │   ├── FamilyMemoDetail.tsx
│   │   ├── Header.tsx
│   │   ├── KakaoSocialBtn.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── MainHeader.tsx
│   ├── data/                # 목업 데이터
│   │   └── homeMockData.ts
│   ├── hooks/               # 커스텀 훅 (현재 비어있음)
│   ├── lib/                 # 유틸리티 함수
│   │   └── util.ts
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── mobile/          # 모바일 페이지
│   │   │   ├── BookPage.tsx
│   │   │   ├── LargeTodaysQuestionPage.tsx
│   │   │   ├── MemoPage.tsx
│   │   │   ├── MobileNotificationsPage.tsx
│   │   │   └── ProfilePage.tsx
│   │   ├── onboarding/     # 온보딩 페이지
│   │   │   ├── CreateCompletePage.tsx
│   │   │   ├── IntroPage.tsx
│   │   │   ├── JoinPendingPage.tsx
│   │   │   ├── JoinQuestionPage.tsx
│   │   │   ├── MobileFamilyInvitePage.tsx
│   │   │   ├── MobileJoinPending.tsx
│   │   │   ├── MobileOnboarding.tsx
│   │   │   ├── MobileUserInfoPage.tsx
│   │   │   ├── TermsPage.tsx
│   │   │   └── UserInfoPage.tsx
│   │   ├── FamilyInvitePage.tsx
│   │   ├── Home.tsx
│   │   ├── HomeIndex.tsx
│   │   ├── KakaoCallback.tsx
│   │   ├── MainPage.tsx
│   │   └── NotificationsPage.tsx
│   ├── router/              # 라우팅 설정
│   │   ├── PrivateLayout.tsx
│   │   ├── PublicLayout.tsx
│   │   └── RootLayout.tsx
│   ├── store/               # 상태 관리 (Zustand)
│   │   └── auth.ts
│   ├── style/               # 스타일 파일
│   │   ├── CustomeCalendar.css
│   │   └── CustomToast.css
│   ├── types/               # TypeScript 타입 정의
│   │   ├── index.ts
│   │   └── onboarding.types.ts
│   ├── index.css            # 글로벌 스타일
│   ├── main.tsx             # 애플리케이션 진입점
│   ├── router.tsx            # 라우터 설정
│   └── vite-env.d.ts         # Vite 타입 정의
├── dist/                     # 빌드 결과물
├── node_modules/             # 의존성 패키지
├── eslint.config.js          # ESLint 설정
├── index.html                # HTML 템플릿
├── package.json              # 프로젝트 설정 및 의존성
├── package-lock.json         # 의존성 잠금 파일
├── README.md                 # 프로젝트 문서
├── tsconfig.app.json         # TypeScript 앱 설정
├── tsconfig.json             # TypeScript 설정
├── tsconfig.node.json        # TypeScript 노드 설정
├── vercel.json               # Vercel 배포 설정
└── vite.config.ts            # Vite 빌드 도구 설정
```

### 📁 주요 디렉토리 설명

#### `/src/api/`

- **목적**: 백엔드 API와의 통신을 담당하는 파일들
- **구조**: 기능별로 분리된 API 함수들
- **주요 파일**:
  - `axiosInstance.ts`: Axios 인스턴스 설정 및 인터셉터
  - `authKakao.ts`: 카카오 OAuth 인증
  - `bookshelf.ts`: 가족 책장 관련 API
  - `home/topics.ts`: 오늘의 질문 및 답변 API

#### `/src/components/`

- **목적**: 재사용 가능한 UI 컴포넌트들
- **구조**: 기능별 디렉토리로 분류
- **주요 디렉토리**:
  - `common/`: 공통 컴포넌트 (Card, SectionHeader)
  - `home/`: 홈 화면 전용 컴포넌트
  - `mobile/`: 모바일 전용 컴포넌트
  - `modal/`: 모달 관련 컴포넌트
  - `onboarding/`: 온보딩 플로우 컴포넌트

#### `/src/pages/`

- **목적**: 라우팅에 연결되는 페이지 컴포넌트들
- **구조**: 데스크톱/모바일, 온보딩 페이지로 분류
- **주요 페이지**:
  - `Home.tsx`: 메인 홈 레이아웃
  - `MainPage.tsx`: 랜딩 페이지
  - `mobile/`: 모바일 전용 페이지들
  - `onboarding/`: 사용자 온보딩 페이지들

#### `/src/store/`

- **목적**: 전역 상태 관리 (Zustand)
- **주요 파일**: `auth.ts` - 인증 관련 상태 관리

#### `/src/types/`

- **목적**: TypeScript 타입 정의
- **주요 파일**:
  - `index.ts`: 공통 타입 정의
  - `onboarding.types.ts`: 온보딩 관련 타입

#### `/src/assets/`

- **목적**: 정적 자산 관리
- **구조**: 폰트, 아이콘으로 분류
- **특징**: SVG 아이콘을 컴포넌트로 관리

---

**EverFlow**와 함께 가족의 소중한 순간들을 기록하고 공유해보세요! 💙
