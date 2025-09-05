import React from "react";
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import { BookIcon } from "../../assets/icons/home";
import type { Book } from "../../types";

interface FamilyBookshelfProps {
    books: Book[];
}

const FamilyBookshelf: React.FC<FamilyBookshelfProps> = ({ books }) => {
    return (
        <Card className="h-[556px] gap-6">
            <SectionHeader icon={BookIcon} title="가족 책장" />
            <div className="grid grid-cols-3 gap-y-8 gap-x-4">
                {books.map((book) => (
                    <div key={book.id} className="flex flex-col items-center gap-1">
                        <img src={book.icon} alt={`${book.ownerName}의 책`} className="size-[100px]" />
                        <p className="font-kccganpan text-[#567D57]">{book.ownerName}의 책</p>
                    </div>
                ))}
            </div>
            {/* 선반 디자인은 Tailwind CSS로 유연하게 조정 가능 */}
            <div className="w-full h-2 bg-[#AD7849] rounded-xs mt-auto" />
        </Card>
    );
};

export default FamilyBookshelf;