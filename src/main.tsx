// 애플리케이션 엔트리 포인트 파일입니다.
// - React Query의 QueryClientProvider로 전역 데이터 페칭/캐싱을 구성합니다.
// - React Router의 RouterProvider로 라우팅을 구성합니다.
// - 글로벌 스타일과 Toast 스타일을 로드합니다.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// React Query 클라이언트를 생성합니다.
const queryClient = new QueryClient();

// 루트 DOM 노드에 React 애플리케이션을 마운트합니다.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
