'use client'

import { signOut } from "next-auth/react";
import ProtectedMiddleware from "../../components/middleware/middleware";
import { useEffect, useState } from "react";
import instanceAxios from "../../components/axios/instanceAxios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link";
import useUserData from "@/app/state/useDataStore";
import ComputerCard from "@/app/components/ComputerCard/ComputerCard";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

interface UserData {
    id?: number;
    username?: string;
    email?: string;
    profile_img?: string;
    role_id?: number;
    role?: {
        slug?: string;
    };
}

interface PC {
    id?: number;
    title?: string;
    description?: string;
    total_price?: number;
    link_img?: string;
    user_id?: number;
}

const Profile = () => {
    const { t } = useTranslation('common');
    const { setUserData, userData } = useUserData();
    const Cookies = require('js-cookie');
    const token = Cookies.get('access_token');
    const userId = Cookies.get('user_id');
    const paramsUrl = useParams();
    const [imageProfile, setProfile] = useState("");
    const urlUserId = paramsUrl.id;
    const [userInfo, setUserInfo] = useState<UserData>({});
    const [image, setImage] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [editData, setEditData] = useState({
        username: '',
        email: ''
    });
    const [pcFavorites, setPcFavorites] = useState<PC[]>([]);
    const [pcUser, setPcUser] = useState<PC[]>([]);
    const hasEmailChange = Cookies.get('has_email_change');
    const [edit, setEdit] = useState(false);
    const [emailChange, setEmailChange] = useState(false);

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await instanceAxios.get(`/users/${urlUserId}`);
                Cookies.set('email_user', res.data.data.email);
                setUserData(res.data.data);
                setImage(`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${res.data.data.profile_img}`);
                setUserInfo(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (urlUserId) {
            fetchUser();
        }
    }, [urlUserId, setUserData]);

    // Fetch favorites
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await instanceAxios.get(`/builds/favorites/list`);
                setPcFavorites(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        if (urlUserId === userId) {
            fetchFavorites();
        }
    }, [urlUserId, userId]);

    // Fetch user PCs
    useEffect(() => {
        const fetchUserPCs = async () => {
            try {
                const res = await instanceAxios.get(`/builds?user_id=${urlUserId}`);
                setPcUser(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        if (urlUserId) {
            fetchUserPCs();
        }
    }, [urlUserId]);

    // Update edit data when userInfo changes
    useEffect(() => {
        if (userInfo) {
            setEditData({
                username: userInfo?.username || "",
                email: userInfo?.email || "",
            });
        }
    }, [userInfo]);

    const handleSignOut = async () => {
        Cookies.remove("has_email_change");
        Cookies.remove("email_user");
        try {
            const res = await instanceAxios.post('/logout', {});
            if (res.status === 200) {
                Cookies.remove('access_token');
                Cookies.remove('user_id');
                Cookies.remove('user_role');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = async () => {
        const formData = new FormData();
        let hasChanges = false;

        if (hasEmailChange) {
            Cookies.set('email_user', editData.email);
        }

        if (editData.username !== userInfo?.username) {
            formData.append("username", editData.username);
            hasChanges = true;
        }
        if (editData.email !== userInfo?.email) {
            formData.append("email", editData.email);
            hasChanges = true;
        }
        if (selectedImage) {
            formData.append("upload", selectedImage);
            hasChanges = true;
        }

        Cookies.remove("has_email_change");

        if (!hasChanges) {
            setEdit(false);
            return;
        }

        try {
            const res = await instanceAxios.post('/users/edit', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            if (res.status === 200) {
                console.log(res.data.data);
                setUserInfo(res.data.data);
                setImage(`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${res.data.data.profile_img}`);
                setEdit(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <ProtectedMiddleware>
                <h1 className="text-center text-[36px]">{t('profile')}</h1>
                <div className="bg-[#3E3E3E] max-w-[900px] mt-[60px] m-auto py-[40px] rounded-[10px] ">
                    <p className="text-[30px] text-center">{t('userInfo')}</p>
                    <div className="w-full border-b border-[#FFCC70] my-6" />
                    {edit ? (
                        <div className="bg-[#3E3E3E] max-w-[900px] mt-[60px] m-auto px-[20px] py-[80px] rounded-[10px] md:flex md:justify-around md:items-center">
                            <div className="flex justify-center gap-[20px]">
                                <div className=" flex flex-col text-[17px] md:text-[25px] text-right gap-[10px]">
                                    <p className="bg-[#434343] px-[5px] py-[5px] rounded-[10px]">{t('username')}: </p>
                                    <p className="bg-[#434343] px-[5px] py-[5px] rounded-[10px]">{t('email')}: </p>
                                </div>
                                <div className="flex flex-col text-[17px] md:text-[25px] text-right gap-[10px]">
                                    <input 
                                        className="px-[10px] bg-[#434343] py-[5px] rounded-[10px]" 
                                        onChange={(e) => setEditData({ ...editData, username: e.target.value })} 
                                        value={editData.username} 
                                        placeholder={t('unknown')} 
                                        type="text" 
                                    />
                                    <input 
                                        className="px-[10px] bg-[#434343] py-[5px] rounded-[10px]" 
                                        readOnly={hasEmailChange ? false : true} 
                                        onChange={(e) => setEditData({ ...editData, email: e.target.value })} 
                                        value={editData.email} 
                                        placeholder={t('unknown')} 
                                        type="email" 
                                    />
                                    <Link
                                        href="/change_email"
                                        className={`md:w-[40%] text-left px-[10px] mt-[10px] py-[10px] text-[17px] rounded-[10px] ${hasEmailChange
                                            ? "bg-[#E5CA98] text-[#3E3E3E] cursor-not-allowed pointer-events-none"
                                            : "bg-[#FFCC70] text-black cursor-pointer"
                                            }`}
                                    >
                                        {t('changeEmail')}
                                    </Link>
                                </div>
                            </div>

                            <div className="flex flex-col mt-[20px] justify-center items-center">
                                <input 
                                    type="file" 
                                    id="real-input" 
                                    onChange={(e) => {
                                        if (e.target.files?.[0]) {
                                            setSelectedImage(e.target.files[0]);
                                            const src = URL.createObjectURL(e.target.files[0]);
                                            setProfile(src);
                                        }
                                    }} 
                                    hidden 
                                />
                                <label htmlFor="real-input">
                                    <Avatar className="w-[190px] cursor-pointer h-[190px] mb-[10px]">
                                        <AvatarImage className="object-cover" src={imageProfile ? imageProfile : image} />
                                        <AvatarFallback className="text-[#000000] text-[40px] uppercase">{userInfo.username?.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <p className="my-[20px] text-center cursor-pointer">{t('uploadPhoto')}</p>
                                </label>

                                <div className="">
                                    <button 
                                        className="px-[10px] mr-[30px] mb-[10px] py-[10px] bg-[#FFCC70] text-[17px] text-black cursor-pointer rounded-[10px]" 
                                        onClick={() => {
                                            setEdit(!edit);
                                            Cookies.remove('has_email_change');
                                            setProfile("");
                                        }}
                                    >
                                        {t('cancel')}
                                    </button>
                                    <button 
                                        className="px-[10px] mb-[10px] py-[10px] bg-[#FFCC70] text-black cursor-pointer rounded-[10px]" 
                                        onClick={handleChange}
                                    >
                                        {t('saveChanges')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="md:flex md:justify-around md:items-center">
                            <div className="flex justify-center gap-[20px] mb-[20px]">
                                <div className="flex flex-col text-[17px] md:text-[25px] text-right gap-[10px]">
                                    <p className="bg-[#434343] px-[5px] py-[5px] rounded-[10px]">{t('username')}: </p>
                                    {urlUserId === userId && (
                                        <p className="bg-[#434343] px-[5px] py-[5px] rounded-[10px]">{t('email')}: </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <div className="flex flex-col text-[17px] md:text-[25px] text-left gap-[10px]">
                                        <p className="bg-[#434343] px-[5px] py-[5px] rounded-[10px]">{userInfo.username}</p>
                                        {urlUserId === userId && (
                                            <p className="bg-[#434343] px-[5px] py-[5px] rounded-[10px]">{userInfo.email}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-center">
                                <Avatar className="w-[190px] h-[190px] mb-[30px]">
                                    <AvatarImage className="object-cover" src={imageProfile ? imageProfile : image} />
                                    <AvatarFallback className="text-[#000000] text-[40px] uppercase">{userInfo.username?.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                {urlUserId === userId && (
                                    <button 
                                        className="px-[10px] py-[10px] bg-[#FFCC70] text-black cursor-pointer rounded-[10px]" 
                                        onClick={() => setEdit(!edit)}
                                    >
                                        {t('editProfileInfo')}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="">
                    {urlUserId === userId && (
                        <div className="bg-[#3E3E3E] max-w-[900px] mt-[60px] m-auto py-[40px] rounded-[10px]">
                            <p className="text-[30px] text-center">{t('pcsFavorites')} - {userInfo.username}</p>
                            <div className="w-full border-b border-[#FFCC70] my-2" />
                            {pcFavorites.length >= 1 ? (
                                <div className=" grid grid-cols-4 mt-[30px] justify-center">
                                    {pcFavorites.map((el, index) => (
                                        <ComputerCard key={el.id || index} computer={el} />
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    <p className="text-center">{t('noFavorites')}</p>
                                </div>
                            )}
                        </div>
                    )}
                    
                    <div className="bg-[#3E3E3E] max-w-[900px] mt-[60px] m-auto py-[40px] rounded-[10px]">
                        <p className="text-[30px] text-center">{t('pcsUser')} - {userInfo.username}</p>
                        <div className="w-full border-b border-[#FFCC70] my-2" />
                        {pcUser.length >= 1 ? (
                            <div className=" grid grid-cols-4 mt-[30px] justify-center">
                                {pcUser.map((el, index) => (
                                    <ComputerCard key={el.id || index} computer={el} />
                                ))}
                            </div>
                        ) : (
                            <div>
                                <p className="text-center">{t('noUserPCs')}</p>
                            </div>
                        )}
                    </div>
                </div>
                
                {userInfo.role_id === 2 && (
                    <div className="text-center mt-[20px]">
                        <Link href={'/admin'}>
                            <button className="px-[10px] py-[10px] bg-[#FFCC70] text-black cursor-pointer rounded-[10px]">{t('goToAdminPanel')}</button>
                        </Link>
                    </div>
                )}

                {urlUserId === userId && (
                    <div className="text-center mt-[30px]">
                        <button 
                            className="text-center cursor-pointer text-[#C82323] border-[#C82323] hover:bg-[#C82323] hover:text-[#ffffff] duration-300 border-1 rounded-[10px] px-[10px] py-[10px]" 
                            onClick={() => handleSignOut()}
                        >
                            {t('signOut')}
                        </button>
                    </div>
                )}
            </ProtectedMiddleware>
        </>
    );
};

export default Profile;