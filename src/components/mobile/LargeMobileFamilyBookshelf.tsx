import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

type BookshelfMember = {
    userId: number;
    nickname: string;
};

type BookshelvesDTO = {
    members: BookshelfMember[];
};

const fetchBookshelves = async (): Promise<BookshelfMember[]> => {
    const { data } = await axiosInstance.get<{ data: BookshelvesDTO }>(
        "/api/home/bookshelves"
    );
    return data?.data?.members ?? [];
};

export default function LargeMobileFamilyBookshelf({
                                                       selectedBookId,
                                                       onSelect,
                                                   }: {
    selectedBookId: string | null;
    onSelect: (id: string) => void;
}) {
    const { data: books = [], isLoading } = useQuery({
        queryKey: ["bookshelves"],
        queryFn: fetchBookshelves,
    });

    const truncateName = (name: string) =>
        name.length > 3 ? name.slice(0, 3) + "…" : name;

    return (
        <div>
            <p className="text-[25px] mb-3 font-semibold text-[#577297]">가족 책장</p>
            <div className="flex gap-3">
                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={`skeleton-${i}`}
                            className="w-[80px] h-[60px] rounded-2xl bg-white animate-pulse"
                        />
                    ))
                    : books.map((book, index) => {
                        const isSelected = selectedBookId === String(book.userId);
                        return (
                            <button
                                key={`book-${book.userId}-${index}`}
                                type="button"
                                onClick={() => onSelect(String(book.userId))}
                                className={`h-[60px] w-[80px] rounded-2xl text-[22px] 
                    ${isSelected ? "bg-[#BAD7FF] text-[#577297]" : "bg-white text-light-gray"}
                  `}
                            >
                                {truncateName(book.nickname)}
                            </button>
                        );
                    })}
            </div>
        </div>
    );
}
