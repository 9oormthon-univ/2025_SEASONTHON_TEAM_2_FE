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

export default function FamilyBookshelf() {
    const navigate = useNavigate();

    const { data: books = [], isLoading } = useQuery({
        queryKey: ['bookshelves'],
        queryFn: fetchBookshelves
    });

    return (
        <Card className="h-[556px] gap-6">
            <SectionHeader icon={BookIcon} title="가족 책장" />

            <div className="relative pb-40">
                {/* 콘텐츠 */}
                <div className="grid grid-cols-3 grid-rows-2 gap-y-10 gap-x-4">
                    {isLoading ? (
                        // 로딩 스켈레톤(간단)
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className="size-[100px] rounded-lg bg-[#E9ECEB] animate-pulse" />
                                <div className="h-5 w-24 rounded bg-[#E9ECEB] animate-pulse" />
                            </div>
                        ))
                    ) : books.length === 0 ? (
                        <div className="col-span-3 text-center text-[#7A7A7A]">
                            표시할 책장이 없어요.
                        </div>
                    ) : (
                        books.map((book) => (
                            <button
                                key={book.id}
                                type="button"
                                onClick={() => navigate(`/home/books/${book.id}`)}
                                className="flex flex-col items-center gap-1 focus:outline-none"
                                aria-label={`${book.nickname}의 책 열기`}
                            >
                                <img src={book.icon} alt="" className="block size-[100px]" />
                                <p className="font-kccganpan text-[#567D57]">{book.nickname}의 책</p>
                            </button>
                        ))
                    )}
                    <div className="absolute inset-x-0 top-1/3 h-2 bg-[#AD7849] rounded" />
                </div>
                {books.length > 3 && <div className="absolute inset-x-0 top-2/3 h-2 bg-[#AD7849] rounded" />}
            </div>
        </Card>
    );
}
