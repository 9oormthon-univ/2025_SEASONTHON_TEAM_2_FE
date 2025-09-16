import type { AuthUser } from "../../store/auth";

type MobileProfileProps = {
    userInfo: AuthUser;
    familyName?: string;
    isLarge?: boolean;
};

export default function MobileProfile({ userInfo, familyName, isLarge = false }: MobileProfileProps) {
    return (
        <>
        <div className={`w-full max-w-[430px] mx-auto bg-white rounded-2xl rounded-tl-none shadow p-6 flex flex-col items-center
        ${isLarge ? "border-[8px] border-[#CAE5CA]" : ""}`}>
            <div className="size-30 rounded-full bg-gray-200 bg-cover bg-center mb-4"
                style={{ backgroundImage: userInfo?.profileUrl ? `url(${userInfo.profileUrl})` : "none" }}/>

            <p className={`${isLarge ? "text-[25px]" : "text-[22px]"} font-semibold text-dark-gray`}>
                {userInfo?.nickname}
            </p>

            {familyName && (
                <p className={`mt-4 text-primary-300 ${isLarge ? "text-[23px]" : "text-[18px]"}`}>
                    {familyName} 가족과 함께하고 있어요.
                </p>
            )}
        </div>
        </>
    );
}
