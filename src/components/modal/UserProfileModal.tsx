

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { AuthUser } from "../../store/auth";
import { Photo } from "../../assets/icons";
import { modifyProfileImg } from "../../api/user";

export type ColorKey = "green" | "pink" | "orange" | "blue" | "yellow";

export type AppointmentForm = {
    nickname?: string;
    profileImg?: string;
};

type ProfileEditModalProps = {
    isOpen: boolean;
    userInfo: AuthUser;
    onClose: () => void;
    onLogout: () => void;
    // onSubmit?: (data: AppointmentPayload) => void;
    // familyCandidates?: string[];
};

function ProfileEditModalBody({
    isOpen,
    userInfo,
    onClose,
    onLogout
}: ProfileEditModalProps) {
    const [edit, setEdit] = useState(false);
    const [nickname, setNickname] = useState(userInfo?.nickname || "");
    const [preview, setPreview] = useState<string | null>(userInfo?.profileUrl || null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = e;
        if (!files || files.length === 0) return;
        const file = files[0];

        const allowedFileTypes = ["image/png", "image/jpeg", "image/webp", "image/heic"];
        if (!allowedFileTypes.includes(file.type)) {
            alert("업로드 가능한 파일 형식은 PNG, JPG, JPEG, WEBP, HEIC 입니다.");
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert("파일 크기는 10MB를 초과할 수 없습니다.");
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            return;
        }

        setSelectedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const onSubmit = async () => {
        // console.log(preview);
        // console.log(nickname);
        if (selectedFile) {
            modifyProfileImg(selectedFile);
        }
        // onClose();
    };

    if (!open) return null;
    const handleEditProfile = () => {
        setEdit(true);
    };
    const handleLogout = () => (onLogout ? onLogout() : console.log("로그아웃"));

    return (
        <div className="fixed inset-0 z-[999]">
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />
            <div className="absolute left-1/2 top-1/2 w-[560px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-semibold">마이페이지</h2>
                    <button onClick={onClose} className="h-9 px-4 rounded-xl bg-[#EFF2EF] text-[#2A2F2A]" type="button">
                        닫기
                    </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <input
                        ref={fileInputRef}
                        type="file"
                        id="profile_img"
                        name="profile_img"
                        accept="image/png, image/jpeg, image/webp, image/heic"
                        onChange={onImageChange}
                        className="hidden"
                    />
                    <label style={{ backgroundImage: preview ? `url(${preview})` : "none", opacity: edit ? "0.6" : "1" }} className="size-20 bg-no-repeat bg-center flex items-center justify-center cursor-pointer bg-cover rounded-full" htmlFor="profile_img" title="프로필 사진 변경" />


                    <div className="flex flex-col gap-2">
                        {edit ? (
                            <input name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder={userInfo?.nickname} className=" text-2xl font-kccganpan focus:outline-none" maxLength={5} />
                        ) : (
                            <p className="text-2xl font-kccganpan">{userInfo?.nickname}</p>
                        )}
                        <p className="text-sm text-[#7A7A7A]">계정 정보를 관리할 수 있어요.</p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                    {edit ? (
                        <button onClick={onSubmit} className="h-9 px-3 rounded-lg bg-[#EFF2EF] text-[#2A2F2A] text-sm" type="button">
                            저장하기
                        </button>
                    ) : (
                        <button onClick={handleEditProfile} className="h-9 px-3 rounded-lg bg-[#EFF2EF] text-[#2A2F2A] text-sm" type="button">
                            프로필 수정
                        </button>
                    )}
                    <button onClick={handleLogout} className="h-9 px-3 rounded-lg bg-[#F3D7D7] text-[#D06666] text-sm" type="button">
                        로그아웃
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function UserProfileModal(props: ProfileEditModalProps) {
    if (typeof window === "undefined") return null;
    return createPortal(<ProfileEditModalBody {...props} />, document.body);
}