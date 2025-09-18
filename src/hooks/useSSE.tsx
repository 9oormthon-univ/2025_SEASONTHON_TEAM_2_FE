import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/auth';
import BellIcon from '../assets/icons/home/Bell.svg';

const useSSE = (onAppointmentNotification: () => void) => {
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
            eventSource.close();
        };

        return () => {
            eventSource.removeEventListener('sse', handleSseMessage);
            eventSource.close();
            console.log('SSE connection closed.');
        };
    }, [accessToken, onAppointmentNotification]);
};

export default useSSE;