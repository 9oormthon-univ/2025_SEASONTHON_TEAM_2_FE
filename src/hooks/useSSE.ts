import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/auth';

const useSSE = () => {
    const { accessToken } = useAuthStore.getState();

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        const eventSource = new EventSource(
            `${import.meta.env.VITE_API_URL}/api/notifications/subscribe?token=${accessToken}`,
            { withCredentials: true }
        );

        eventSource.onopen = () => {
            console.log('✅ SSE connection established.');
        };

        const handleSseMessage = (event: MessageEvent) => {
            console.log('✅ SSE event received:', event.data);

            try {
                const notificationData = JSON.parse(event.data);

                if (typeof notificationData === 'string' && notificationData.includes('EventStream Created')) {
                    console.log('Initial connection event received.');
                    return;
                }

                if (notificationData.contentText && notificationData.contentText.includes('EventStream Created')) {
                    return;
                }

                const message = notificationData.contentText || '새로운 알림이 도착했습니다!';
                console.log('🔔 Toast message content:', message);
                toast.info(message);

            } catch (error) {
                // JSON 파싱에 실패한 경우 (최초 연결 메시지 등)
                if (event.data.includes('EventStream Created')) {
                    return;
                }
                console.error('Could not parse SSE data or other error:', error);
            }
        };

        // "sse"라는 이름으로 오는 이벤트를 수신하도록 설정합니다.
        eventSource.addEventListener('sse', handleSseMessage);

        eventSource.onerror = (error) => {
            console.error('SSE Error:', error);
            eventSource.close();
        };

        // 컴포넌트 정리 시 이벤트 리스너도 함께 제거해줍니다.
        return () => {
            eventSource.removeEventListener('sse', handleSseMessage);
            eventSource.close();
            console.log('SSE connection closed.');
        };
    }, [accessToken]);
};

export default useSSE;