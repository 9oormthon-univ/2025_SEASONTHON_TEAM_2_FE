import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/auth'; // 경로는 실제 프로젝트에 맞게 확인해주세요.
import BellIcon from '../assets/icons/home/Bell.svg'; // 경로는 실제 프로젝트에 맞게 확인해주세요.

const useSSE = (onAppointmentNotification: () => void) => {
    const accessToken = useAuthStore((state) => state.accessToken);

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        let eventSource: EventSource | null = null;

        const connect = () => {
            if (eventSource) {
                eventSource.close();
            }

            eventSource = new EventSource(
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

                    if (notificationData.contentText && notificationData.contentText.includes('약속을 신청')) {
                        onAppointmentNotification();
                    } else {
                        const message = notificationData.contentText || '새로운 알림이 도착했습니다!';
                        console.log('🔔 Toast message content:', message);
                        toast(
                            () => (
                                <div className="flex items-center gap-3 font-pretendard">
                                    <img src={BellIcon} alt="알림" className="w-6 h-6" />
                                    <p className="text-sm text-black">{message}</p>
                                </div>
                            )
                        );
                    }

                } catch (error) {
                    if (event.data.includes('EventStream Created')) {
                        return;
                    }
                    console.error('Could not parse SSE data or other error:', error);
                }
            };

            eventSource.addEventListener('sse', handleSseMessage);

            eventSource.onerror = (error) => {
                console.error('SSE Error:', error);
                eventSource?.close();
                // 잠시 후 재연결 시도 (선택적)
                // setTimeout(connect, 5000);
            };
        };

        connect();

        // 컴포넌트가 언마운트될 때 연결을 정리합니다.
        return () => {
            if (eventSource) {
                eventSource.close();
                console.log('SSE connection closed.');
            }
        };
    }, [accessToken, onAppointmentNotification]);
};

export default useSSE;