import { useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationModal = ({ isOpen, onClose }: NotificationModalProps) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // 3초 후에 자동으로 모달 닫기

            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        // 최상위 div는 화면 전체를 덮도록 설정하여 클릭 이벤트를 처리합니다.
        <div
            className="fixed inset-0 flex justify-center items-center z-50"
            onClick={onClose}
        >
            {/* 요청하신 UI 구조를 여기에 적용합니다.
        바깥쪽 div는 색상 배경과 패딩을, 안쪽 div는 흰색 배경과 컨텐츠를 가집니다.
        임의의 배경색(bg-blue-100)을 지정했으며, 원하시는 색상으로 변경 가능합니다.
      */}
            <div
                className="w-fit flex items-center justify-center p-3 z-[101] rounded-lg"
                style={{ backgroundColor: '#CDECCB' }}
                onClick={e => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록 이벤트 전파 차단
            >
                <div className="bg-white flex flex-col items-center justify-center p-5 rounded-md">
                    <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px]">
                        <DotLottieReact
                            src="https://lottie.host/939f9b84-6cc5-40ea-bce9-7708d096d0be/a9MoEAwXZm.lottie"
                            loop
                            autoplay
                        />
                    </div>
                    {/* 알림에 맞는 텍스트를 추가했습니다. */}
                    <p className="font-bold text-2xl md:text-4xl font-gangwon mt-4">
                        누군가의 마음이 실린 비행기가 도착했어요.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;