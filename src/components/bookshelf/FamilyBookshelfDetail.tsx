import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { familyBooks } from "../../data/homeMockData.ts";
import BookshelfBg from "../../assets/icons/Bookshelf_bg.svg";
import { BookIcon } from "../../assets/icons/home";

type Book = typeof familyBooks[number];

type Entry = { id: number; question: string; answer?: string };

export default function FamilyBookshelfDetailPage() {
    const { bookId } = useParams();
    const navigate = useNavigate();

    const book: Book | undefined = useMemo(
        () => familyBooks.find((b) => String(b.id) === String(bookId)),
        [bookId]
    );

    const entries: Entry[] = [
        { id: 1, question: "나의 이름에 담겨진 뜻은 무엇인가요?", answer: "잘먹고잘자고" },
        { id: 2, question: "나의 이름에 담겨진 뜻은 무엇인가요?", answer: "앙고요거트스무디" },
        { id: 3, question: "나의 이름에 담겨진 뜻은 무엇인가요?", answer: "" },
        { id: 4, question: "나의 이름에 담겨진 뜻은 무엇인가요?", answer: "잘먹고잘자고" },
        { id: 5, question: "나의 이름에 담겨진 뜻은 무엇인가요?", answer: "앙고요거트스무디" },
        { id: 6, question: "나의 이름에 담겨진 뜻은 무엇인가요?", answer: "" },
    ];
    const owner = book?.ownerName ?? "가족";
    const savedAt = "2025-08-23 13:31:28";

    if (!book) {
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

    return (
        <div className="w-full h-[740px]">
            <div className="relative w-full h-full bg-transparent overflow-hidden">
                <img src={BookshelfBg} alt="" className="absolute w-full h-full object-cover z-10 pointer-events-none" />
                <div className="absolute inset-6 bg-[#EFF1F0] m-2 rounded-2xl overflow-hidden flex flex-col z-9999">
                    <div className="px-6 pt-6 pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <img src={BookIcon} alt="" className="w-7 h-7" />
                                <h2 className="font-kccganpan text-[24px] text-[#49684A]">
                                    {owner}의 책
                                </h2>
                                <span className="font-pretendard ml-2 text-sm text-light-gray">
                                    저장 시간 : {savedAt}
                                </span>
                            </div>
                            <button
                                onClick={() => navigate(-1)}
                                className="h-8 px-4 rounded-lg bg-primary-200 text-white font-pretendard hover:opacity-90"
                            >
                                닫기
                            </button>
                        </div>
                    </div>

                    <div className="px-6 pb-6 flex-1 overflow-y-auto">
                        {entries.map((it) => (
                            <div key={it.id} className="mb-5 rounded-2xl bg-white p-5">
                                <p className="font-kccganpan text-[22px] text-[#49684A] mb-3">
                                    {it.id}. {it.question}
                                </p>
                                <div className="rounded-2xl bg-[#EFF1F0] min-h-[64px] flex items-center px-4 text-[#4C505C] font-gangwon text-[26px]">
                                    {it.answer && it.answer.trim() ? it.answer : "아직 답변하지 않았어요"}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
