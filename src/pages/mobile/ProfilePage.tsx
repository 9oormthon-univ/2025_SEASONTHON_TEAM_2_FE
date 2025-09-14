import MobileNav from "../../components/mobile/MobileNav";

type Props = {
    isLarge: boolean;
};

export default function ProfilePage({ isLarge }: Props) {
    return (
        <div className="min-h-screen bg-back-color pb-20">
            <div className="p-4">Profile Page</div>

            {!isLarge && <MobileNav />}
        </div>
    );
}
