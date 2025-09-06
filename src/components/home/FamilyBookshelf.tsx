import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import { BookIcon } from "../../assets/icons/home";
import type { Book } from "../../types";
import { useNavigate } from "react-router-dom";

interface FamilyBookshelfProps {
    books: Book[];
}

const FamilyBookshelf: React.FC<FamilyBookshelfProps> = ({ books }) => {
    const navigate = useNavigate();
    return (
        <Card className="h-[556px] gap-6">
            <SectionHeader icon={BookIcon} title="가족 책장" />
            <div className="grid grid-cols-3 gap-y-8 gap-x-4 relative">
                {books.map((book) => (
                    <button
                        key={book.id}
                        type="button"
                        onClick={() => navigate(`/home/books/${book.id}`)}
                        className="flex flex-col items-center gap-1 focus:outline-none"
                        aria-label={`${book.ownerName}의 책 열기`}
                    >
                        <img src={book.icon} alt="" className="size-[100px]" />
                        <p className="font-kccganpan text-[#567D57]">{book.ownerName}의 책</p>
                    </button>
                ))}
                <div className="w-full h-2 bg-[#AD7849] rounded-xs absolute bottom-1/2" />
            </div>
            <div className="w-full h-2 bg-[#AD7849] rounded-xs" />
        </Card>
    );
};

export default FamilyBookshelf;
