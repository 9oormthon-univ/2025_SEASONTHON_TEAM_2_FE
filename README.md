# 2025_SEASONTHON_TEAM_2_FE

[2025 kakao X groom 시즌톤] 2팀 [ Everflow ] 프론트 레포지토리

## Everflow FE
가족과 함께 쓰는 세대 토픽 / 책장 웹앱의 프론트엔드 프로젝트입니다.
<br>
React + Vite 기반으로 서버 상태는 TanStack Query,
<br>
클라이언트 상태는 Zustand, 스타일은 Tailwind CSS v4를 사용합니다.
<br>
## Tech Stack
App: React 19, TypeScript, Vite 7 (+ @vitejs/plugin-react-swc)
<br>
State: @tanstack/react-query v5, Zustand v5
<br>
Forms: react-hook-form
<br>
Routing: react-router-dom v7
<br>
Styling: Tailwind CSS v4 (@tailwindcss/vite)
<br>
CSS: Tailwind CSS, HTTP: axios 
<br>
Date/Calendar: moment, react-calendar
<br>
Lint: ESLint 9 + typescript-eslint 8
<br>
Node 버전: ≥ 20.19 (Vite 7 / plugin-react-swc)
<br>

서버 상태: TanStack Query
날짜/캘린더가 필요한 화면은 react-calendar + moment 조합 사용 하였습니다.

## FE 디렉터리 가이드
```
├─ public/
├─ src/
│  ├─ api/
│  │  ├─ auth/
│  │  │  └─ family.ts
│  │  ├─ home/
│  │  │  ├─ appointments.ts
│  │  │  └─ topics.ts
│  │  ├─ authKakao.ts
│  │  ├─ axiosInstance.ts
│  │  ├─ notifications.tsx
│  │  └─ user.ts
│  │
│  ├─ assets/
│  ├─ fonts/
│  ├─ icons/
│  │  ├─ home/
│  │  ├─ Bookshelf_bg.svg
│  │  ├─ CheckIcon.svg
│  │  ├─ EFL.svg
│  │  ├─ EverFlowChar.svg
│  │  ├─ EverFlowLogo.svg
│  │  ├─ EverflowHeaderLogo.svg
│  │  ├─ HeaderLogo.svg
│  │  ├─ MagicWand.svg
│  │  ├─ OptionIcon.svg
│  │  ├─ Tooltip.svg
│  │  ├─ WarningIcon.svg
│  │  ├─ index.ts
│  │  ├─ kakao_chatbubble.svg
│  │  └─ react.svg
│  │
│  ├─ components/
│  │  ├─ bookshelf/
│  │  ├─ common/
│  │  ├─ home/
│  │  ├─ modal/
│  │  ├─ notifications/
│  │  ├─ onboarding/
│  │  ├─ CustomCalendar.tsx
│  │  ├─ Header.tsx
│  │  ├─ KakaoSocialBtn.tsx
│  │  ├─ LoadingSpinner.tsx
│  │  └─ MainHeader.tsx
│  │
│  ├─ data/
│  │  └─ homeMockData.ts
│  │
│  ├─ lib/
│  │  └─ util.ts
│  │
│  ├─ pages/
│  │  ├─ onboarding/
│  │  ├─ Home.tsx
│  │  ├─ HomeIndex.tsx
│  │  ├─ KakaoCallback.tsx
│  │  ├─ MainPage.tsx
│  │  └─ MobileNotificationsPage.tsx
│  │
│  ├─ style/
│  │  └─ CustomeCalendar.css
│  │
│  ├─ types/
│  │  ├─ index.ts
│  │  └─ onboarding.types.ts
│  │
│  ├─ index.css
│  ├─ main.tsx
│  ├─ router.tsx
│  └─ vite-env.d.ts
│
├─ .gitignore
├─ LICENSE
├─ README.md
├─ eslint.config.js
├─ index.html
└─ package-lock.json


```
