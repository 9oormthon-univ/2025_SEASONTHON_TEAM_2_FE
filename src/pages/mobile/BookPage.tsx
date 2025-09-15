import { useEffect, useState } from "react";
import MobileNav from "../../components/mobile/MobileNav";
import MobileHeader from "../../components/mobile/MobileHeader.tsx";
import { useLocation } from "react-router-dom";
import LargeBackButton from "../../components/mobile/LargeBackButton.tsx";
import FamilyBookshelf from "../../components/home/FamilyBookshelf.tsx";
import MobileFamilyBookshelfDetail from "../../components/mobile/MobileFamilyBookshelfDetail.tsx";
import { getMyBookshelf } from "../../api/bookshelf";
import LargeMobileFamilyBookshelf from "../../components/mobile/LargeMobileFamilyBookshelf.tsx";
import LargeMobileFamilyBookshelfDetail from "../../components/mobile/LargeMobileFamilyBookshelfDetail.tsx";


export default function BookPage() {
    const location = useLocation();
    const isLarge = location.state?.isLarge ?? false;
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

    useEffect(() => {
        const init = async () => {
            const me = await getMyBookshelf();
            setSelectedBookId(String(me.userId));
        };
        init();
    }, []);

    if (!selectedBookId) {
        return <div className="flex justify-center items-center h-screen">로딩중...</div>;
    }


    return (
        <div className="min-h-screen bg-back-color">

            {!isLarge &&
                (
                    <div>
                        <MobileHeader />
                        <div className="flex flex-col mx-auto w-full max-w-[430px]">
                            <div className="px-4 pt-20">
                                <h2 className="font-semibold text-[20px] py-3">가족책자</h2>

                                <FamilyBookshelf onSelect={setSelectedBookId} compact selectedBookId={selectedBookId}/>
                            </div>

                            <div className="flex-1 overflow-y-auto px-4 py-8 pb-40">
                                <MobileFamilyBookshelfDetail bookId={selectedBookId} />
                            </div>
                        </div>
                        <MobileNav />
                    </div>
                )}
            {isLarge &&
                (
                    <div className="px-4 py-6">
                        <MobileHeader isLarge={true} />
                        <div className="mt-15 mx-auto w-full max-w-[430px]">
                            <LargeBackButton/>
                            <div className="mt-10">
                                <LargeMobileFamilyBookshelf onSelect={setSelectedBookId} selectedBookId={selectedBookId}/>
                                <LargeMobileFamilyBookshelfDetail bookId={selectedBookId}/>
                            </div>
                        </div>

                    </div>
                )}
        </div>
    );
}
