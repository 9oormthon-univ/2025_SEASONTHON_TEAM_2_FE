import { useEffect, useState } from "react";
import { getPendingJoins, approvePendingJoin, rejectPendingJoin} from "../../api/family";
import type { PendingJoin } from "../../api/family";

interface Props {
    isOpen: boolean;
    requestId: number;
    onClose: () => void;
    onHandled: () => void; // 처리 후 리스트 갱신
}

export default function MemberRequestModal({ isOpen, requestId, onClose, onHandled }: Props) {
    const [member, setMember] = useState<PendingJoin | null>(null);

    useEffect(() => {
        if (isOpen) {
            getPendingJoins()
                .then((list) => {
                    const found = list.find((m) => m.requestId === requestId);
                    setMember(found ?? null);
                })
                .catch(console.error);
        }
    }, [isOpen, requestId]);

    if (!isOpen || !member) return null;

    const handleApprove = async () => {
        await approvePendingJoin(member.requestId);
        onHandled();
        onClose();
    };

    const handleReject = async () => {
        await rejectPendingJoin(member.requestId);
        onHandled();
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg">
                <h2 className="text-xl font-semibold mb-4">가입 요청 상세</h2>
                <p><strong>닉네임:</strong> {member.nickname}</p>
                <p><strong>시도 횟수:</strong> {member.attempts}회</p>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={handleReject}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:opacity-80"
                    >
                        거절
                    </button>
                    <button
                        onClick={handleApprove}
                        className="px-4 py-2 rounded-lg bg-green-600 text-white hover:opacity-80"
                    >
                        승인
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-300 hover:opacity-80"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}
