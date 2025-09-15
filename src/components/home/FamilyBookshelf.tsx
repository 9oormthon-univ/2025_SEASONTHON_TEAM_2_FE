import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import { useNavigate } from "react-router-dom";
import {
    BookPink,
    BookBlue,
    BookGreen,
    BookOrange,
    BookYellow,
    BookIcon,
} from "../../assets/icons/home";
import axiosInstance from "../../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

type BookshelfMember = {
    userId: number;
    nickname: string;
    shelfColor: "PINK" | "BLUE" | "GREEN" | "ORANGE" | "YELLOW";
};

type BookshelvesDTO = {
    members: BookshelfMember[];
};

type Tile = { id: number; nickname: string; icon: string };

// 색상 → 아이콘 매핑
const COLOR_ICON_MAP: Record<BookshelfMember["shelfColor"], string> = {
    PINK: BookPink,
    BLUE: BookBlue,
    GREEN: BookGreen,
    ORANGE: BookOrange,
    YELLOW: BookYellow,
};

const fetchBookshelves = async (): Promise<Tile[]> => {
    try {
        const { data } = await axiosInstance.get<{ data: BookshelvesDTO }>('/api/home/bookshelves');
        const rows = data?.data?.members ?? [];
        return rows.map((m) => ({
            id: m.userId,
            nickname: m.nickname,
            icon: COLOR_ICON_MAP[m.shelfColor] ?? BookYellow, // 혹시 모르는 기본값
        }));
    } catch (err) {
        console.error("[bookshelves] fetch error:", err);
        return [];
    }
};

export default function FamilyBookshelf({
    onSelect,
    compact = false,
    selectedBookId,
}: {
    onSelect?: (id: string) => void;
    compact?: boolean;
    selectedBookId?: string | null;
}) {
    const navigate = useNavigate();

    const { data: books = [], isLoading } = useQuery({
        queryKey: ["bookshelves"],
        queryFn: fetchBookshelves,
    });

    if (compact) {
        return (
            <div className="rounded-2xl rounded-tl-none bg-white w-full px-4 py-4">
                <div className="flex gap-4 overflow-x-auto pb-3">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-14 h-14 rounded-lg bg-[#E9ECEB] animate-pulse" />
                                <div className="h-4 w-16 rounded bg-[#E9ECEB] animate-pulse" />
                            </div>
                        ))
                    ) : books.length === 0 ? (
                        <div className="text-center text-[#7A7A7A] w-full">
                            표시할 책장이 없어요.
                        </div>
                    ) : (
                        books.map((book) => {
                            const isSelected = selectedBookId === String(book.id);
                            return (
                                <button
                                    key={`book-${book.id}`}
                                    type="button"
                                    onClick={() =>
                                        onSelect
                                            ? onSelect(String(book.id)) // 모바일
                                            : navigate(`/home/books/${book.id}`) // 웹
                                    }
                                    className="focus:outline-none transition">
                                    <div
                                        className={`flex flex-col items-center gap-2 py-2 rounded-xl 
                                        ${isSelected ? "bg-gray-200" : ""}`}>
                                        <img
                                            src={book.icon}
                                            alt=""
                                            className="size-[80px] object-contain"
                                        />
                                        <p className="text-sm text-primary-300 text-[15px]">
                                            {book.nickname}의 책
                                        </p>
                                    </div>
                                </button>
                            );
                        })
                    )}

                </div>
                <div className="w-full h-2 bg-[#AD7849] rounded" />
            </div>
        );
    }


    //웹
    return (
        <Card className="h-[484px] gap-6">
            <SectionHeader icon={BookIcon} title="가족 책장" />
            <div className="relative pb-40">
                <div className="grid grid-cols-3 grid-rows-2 gap-4 gap-y-8">
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={`skeleton-${i}`}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="size-[100px] rounded-lg bg-[#E9ECEB] animate-pulse" />
                                <div className="h-5 w-24 rounded bg-[#E9ECEB] animate-pulse" />
                            </div>
                        ))
                    ) : books.length === 0 ? (
                        <div className="col-span-3 text-center text-[#7A7A7A]">
                            표시할 책장이 없어요.
                        </div>
                    ) : (
                        books.map((book, index) => (
                            <button
                                key={`book-${book.id}-${index}`}
                                type="button"
                                onClick={() => navigate(`/home/books/${book.id}`)}
                                className="flex flex-col items-center gap-1 focus:outline-none"
                                aria-label={`${book.nickname}의 책 열기`}
                            >
                                <img
                                    src={book.icon}
                                    alt=""
                                    className="block size-[100px]"
                                />
                                <p className="font-kccganpan text-[#567D57]">
                                    {book.nickname}의 책
                                </p>
                            </button>
                        ))
                    )}
                </div>
                <div className="absolute inset-x-0 top-1/3 h-2 bg-[#AD7849] rounded" />
                {books.length > 3 && (
                    <div className="absolute inset-x-0 top-2/3 h-2 bg-[#AD7849] rounded" />
                )}
            </div>
        </Card>
    );
}

