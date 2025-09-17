import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import BookshelfBg from "../../assets/icons/Bookshelf_bg.svg";
import { BookIcon } from "../../assets/icons/home";
import { getBookshelfByUserId, getMyBookshelf, saveAnswersToServer, createCustomQuestions, deleteCustomQuestions, type UpdateAnswersDTO } from "../../api/bookshelf";
import { FailToast } from "../toast/FailToast";
import { SuccessToast } from "../toast/SuccessToast";

// 데이터 타입 정의
type Entry = { id: number; question: string; answer?: string };

// 날짜 포맷 함수
const fmt = (iso?: string) => {
    if (!iso) return "-";
    return moment(new Date(iso)).format("YYYY-MM-DD HH:MM:SS");
};

const useCreateCustomQuestion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCustomQuestions,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookshelf"] });
            SuccessToast("새로운 질문을 생성했어요!");
        },
        onError: (error) => {
            console.error("질문 생성 중 에러 발생:", error);
            FailToast("질문을 추가하는 데 실패했어요. 잠시 후 다시 시도해 주세요.");
        },
    });
};

// React Query 훅: 커스텀 질문 삭제
const useDeleteCustomQuestion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCustomQuestions,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookshelf"] });
            SuccessToast("질문 삭제를 성공했어요!");
        },
        onError: (error) => {
            console.error("질문 삭제 중 에러 발생:", error);
            FailToast("질문을 삭제하는 데 실패했어요. 잠시 후 다시 시도해 주세요.");
        },
    });
};

export default function FamilyBookshelfDetailPage() {
    const { bookId } = useParams();
    const navigate = useNavigate();

    const [isEditable, setIsEditable] = useState(false);
    const [newQuestion, setNewQuestion] = useState("");
    const [saveError, setSaveError] = useState<string | null>(null);
    const dirtyRef = useRef(false);
    const savingRef = useRef(false);

    // useQuery로 책장 데이터 가져오기
    const { data, isLoading, isError } = useQuery({
        queryKey: ["bookshelf", bookId],
        queryFn: async () => {
            if (!bookId) throw new Error("책장 ID가 없습니다.");
            const me = await getMyBookshelf();
            let targetId: number;
            let isMyBookshelf: boolean;
            if (bookId === "me") {
                targetId = me.userId;
                isMyBookshelf = true;
            } else {
                targetId = Number(bookId);
                if (Number.isNaN(targetId)) throw new Error("유효하지 않은 책장 ID입니다.");
                isMyBookshelf = targetId === me.userId;
            }
            setIsEditable(isMyBookshelf);
            return isMyBookshelf ? getMyBookshelf() : getBookshelfByUserId(targetId);
        },
        enabled: !!bookId,
    });

    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        if (data) {
            setEntries((data.items ?? []).map((it) => ({
                id: it.questionId,
                question: it.questionText,
                answer: it.answer ?? "",
            })));
        }
    }, [data]);

    // 답변 자동 저장 로직
    const doServerSave = useCallback(async () => {
        if (!isEditable || !dirtyRef.current || savingRef.current) {
            return;
        }
        try {
            savingRef.current = true;
            setSaveError(null);
            const payload: UpdateAnswersDTO = {
                items: entries.map(e => ({
                    questionId: e.id,
                    answer: (e.answer ?? "").trim(),
                })),
            };
            await saveAnswersToServer(payload);
            dirtyRef.current = false;
        } catch {
            setSaveError("자동 저장에 실패했어요. 네트워크를 확인해 주세요.");
        } finally {
            savingRef.current = false;
        }
    }, [entries, isEditable]);

    // 3초마다 자동 저장 실행
    useEffect(() => {
        if (!isEditable) return;
        const iv = setInterval(() => {
            void doServerSave();
        }, 3000);
        return () => clearInterval(iv);
    }, [isEditable, entries, doServerSave]);

    const updateAnswer = (id: number, val: string) => {
        setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, answer: val } : e)));
        dirtyRef.current = true;
        setSaveError(null);
    };

    // useMutation으로 새로운 질문 생성 기능 사용
    const { mutate: createQuestion, isPending: isCreating } = useCreateCustomQuestion();

    // useMutation으로 질문 삭제 기능 사용
    const { mutate: deleteQuestion, isPending: isDeleting } = useDeleteCustomQuestion();

    const handleAddNewQuestion = () => {
        if (newQuestion.trim()) {
            createQuestion(newQuestion.trim(), {
                onSuccess: () => {
                    setNewQuestion("");
                },
            });
        }
    };

    // 질문 삭제 핸들러
    const handleDeleteQuestion = (questionId: number) => {
        // 사용자에게 삭제 확인을 받는 UI/로직을 추가할 수 있습니다.
        if (window.confirm("정말 이 질문을 삭제하시겠어요?")) {
            deleteQuestion(questionId);
        }
    };

    const handleClose = async () => {
        if (isEditable && dirtyRef.current) {
            await doServerSave();
        }
        navigate("/home", { replace: true });
    };

    // 로딩 및 에러 상태 처리
    if (isLoading) {
        return (
            <div className="w-full p-6 rounded-2xl bg-white border border-light-gray">
                책장 데이터를 불러오는 중...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-full p-6 rounded-2xl bg-white border border-light-gray">
                해당 책장을 찾을 수 없어요.
                <button
                    onClick={() => navigate(-1)}
                    className="ml-3 h-8 px-3 rounded-lg bg-primary-200 text-white hover:opacity-90"
                >
                    돌아가기
                </button>
            </div>
        );
    }

    const owner = data?.nickname || (isEditable ? "나" : "가족");
    const savedAt = data?.lastUpdatedAt ? fmt(data.lastUpdatedAt) : "-";

    return (
        <div className="w-full h-[740px]">
            <div className="relative w-full h-full bg-transparent overflow-hidden">
                <img src={BookshelfBg} alt="" className="absolute w-full h-full object-cover z-10 pointer-events-none" />
                <div className="absolute inset-6 bg-back-color m-2 rounded-2xl overflow-hidden flex flex-col z-11">
                    <div className="px-6 pt-6 pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <img src={BookIcon} alt="" className="w-7 h-7" />
                                <h2 className="font-kccganpan text-[24px] text-[#49684A]">{owner}의 책</h2>
                                <span className="font-pretendard ml-2 text-sm text-light-gray">저장 시간 : {savedAt}</span>
                                {isEditable && (
                                    <span
                                        className={`ml-3 text-xs font-pretendard ${savingRef.current ? "text-[#4C505C]" : saveError ? "text-red-500" : "text-[#7A7A7A]"
                                            }`}
                                    >
                                        {savingRef.current
                                            ? "자동 저장 중..."
                                            : saveError
                                                ? saveError
                                                : dirtyRef.current
                                                    ? "변경 사항 있음 (자동 저장 대기)"
                                                    : "모든 변경 사항이 저장됨"}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={handleClose}
                                className="h-8 px-4 rounded-lg bg-primary-200 text-white font-pretendard hover:opacity-90"
                            >
                                닫기
                            </button>
                        </div>
                    </div>

                    <div className="px-6 pb-6 flex-1 overflow-y-auto">
                        {entries.length === 0 && (
                            <div className="rounded-2xl bg-white p-5 text-[#7A7A7A]">
                                {isEditable ? "아직 질문이 없거나 데이터를 불러오지 못했어요." : "아직 답변이 없습니다."}
                            </div>
                        )}
                        {entries.map((it, idx) => (
                            <div key={it.id} className="mb-5 rounded-2xl bg-white p-5">
                                <p className="font-kccganpan text-[22px] text-[#49684A] mb-3 flex justify-between items-center">
                                    <span>{idx + 1}. {it.question}</span>
                                    {isEditable && it.id > 15 && (
                                        <button
                                            onClick={() => handleDeleteQuestion(it.id)}
                                            className="ml-4 px-2 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                            disabled={isDeleting}
                                        >
                                            {isDeleting ? "삭제 중..." : "삭제"}
                                        </button>
                                    )}
                                </p>
                                {isEditable ? (
                                    <input
                                        value={it.answer ?? ""}
                                        onChange={(e) => updateAnswer(it.id, e.target.value)}
                                        placeholder="여기에 답변을 입력해 보세요"
                                        className="w-full h-[64px] rounded-2xl bg-[#EFF1F0] p-4 text-[#4C505C] font-gangwon text-[26px] focus:outline-none"
                                    />
                                ) : (
                                    <div className="rounded-2xl bg-[#EFF1F0] min-h-[64px] flex items-center px-4 text-[#4C505C] font-gangwon text-[26px]">
                                        {it.answer && it.answer.trim() ? it.answer : "아직 답변하지 않았어요"}
                                    </div>
                                )}
                            </div>
                        ))}
                        {isEditable && (
                            <div className="mb-5 rounded-2xl bg-white p-5">
                                <p className="font-kccganpan text-[22px] text-[#49684A] mb-3">
                                    새로운 질문 작성하기
                                </p>
                                <div className="flex flex-col gap-3">
                                    <input
                                        value={newQuestion}
                                        onChange={(e) => setNewQuestion(e.target.value)}
                                        placeholder="여기에 새로운 질문을 입력해 보세요"
                                        className="w-full h-[96px] rounded-2xl bg-[#EFF1F0] p-4 text-[#4C505C] font-kccganpan text-[18px] focus:outline-none resize-none"
                                    />
                                    <button
                                        onClick={handleAddNewQuestion}
                                        disabled={!newQuestion.trim() || isCreating}
                                        className="h-10 px-4 rounded-lg bg-primary-200 text-white font-pretendard hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {isCreating ? "저장 중..." : "질문 저장"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}