import MobileNav from "../../components/mobile/MobileNav";

type Props = {
    isLarge: boolean;
};

export default function BookPage({ isLarge }: Props) {
    return (
        <div className="min-h-screen bg-[#EBEDF0] pb-20">
            <div className="p-4">Book Page</div>

            {!isLarge && <MobileNav />}
        </div>
    );
}
