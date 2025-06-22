'use client'

import { LinkInterface } from "@/app/interfaces/interface";
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import instanceAxios from "../axios/instanceAxios";
import useUserData from "@/app/state/useDataStore";
import { useTranslation } from 'react-i18next';
import "@/lib/i18n";
import { Globe } from "lucide-react";

interface UserData {
    id?: number;
    username?: string;
    role_id?: number;
    profile_img?: string;
}

const Header = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        if (typeof window !== 'undefined') {
            const Cookie = require('js-cookie');
            Cookie.set('i18next', lng);
        }
    };

    const { t } = useTranslation('common');
    const [userData, setUserData] = useState<UserData>({});
    const pathname = usePathname();
    const [image, setImage] = useState("");
    const [screenWidth, setScreenWidth] = useState(0);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const Cookie = require('js-cookie');
            const user_id = Cookie.get('user_id');
            
            if (user_id) {
                instanceAxios.get(`/users/${user_id}`).then((res: any) => {
                    setUserData(res.data.data);
                    setImage(`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${res.data.data.profile_img}`);
                });
            }
            
            // Set initial width
            setScreenWidth(window.innerWidth);
            
            // Add resize listener
            const handleResize = () => setScreenWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    if (!pathname) return null;
    
    const isProfileWithId = /^\/profile\/\d+$/.test(pathname);
    const isPC = /^\/computer\/\d+$/.test(pathname);
    const isAdmin = userData?.role_id === 2;
    
    const NavLink = ({ textLink, path }: LinkInterface) => {
        return (
            <>
                <Link className={`${pathname.includes(path) ? "bg-[#FFCC70] px-[25px] py-[10] lg:px-[45px] lg:py-[10px] text-[#1A1A1A] rounded-[15px] mx-[25px]" : "mx-[25px]"}`} href={path}>
                    {textLink}
                </Link>
            </>
        )
    };
    
    const NavSmallLink = ({ textLink, path }: LinkInterface) => {
        return (
            <>
                <Link className={`${pathname.includes(path) ? "bg-[#FFCC70] px-[25px] py-[7px] lg:px-[45px] lg:py-[10px] text-[#1A1A1A]  rounded-[15px]" : "text-[17px]"}`} href={path}>
                    {textLink}
                </Link>
            </>
        )
    };

    return (
        <div className="bg-[#2D2D2D] mx-[20px] px-[40px] py-[24px] rounded-[20px] flex justify-between items-center mb-[80px]">
            <div className="">
                <Link className="flex text-[25px] lg:text-[40px] fw-[700] " href="/content">Tech<Image width={70} height={65} className="px-[5px] w-[40px] lg:w-[70px] lg:h-[65px]" src="/img/logo.svg" alt="" />Tinker</Link>
            </div>

            {screenWidth <= 600 ? (
                <>
                    <DropdownMenu >
                        <DropdownMenuTrigger className="outline-none ">
                            <Image width={35} height={35} src="/img/menu.svg" alt="" />
                        </DropdownMenuTrigger>
                        {pathname === "/content" || pathname === "/configure" || pathname === "/profile" || isProfileWithId || isPC ? (
                            <DropdownMenuContent className="bg-[#1A1A1A] mt-[10px] text-[17px] border-0 ring-0 outline-none shadow-none flex flex-col text-white items-center" style={{ border: 'none' }}>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className=" outline-none">
                                        <Globe className="w-5 h-5 text-white" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-[#1A1A1A] text-white text-sm">
                                        <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => changeLanguage('ru')}>Русский</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => changeLanguage('kk')}>Қазақша</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <DropdownMenuItem>
                                    <NavSmallLink path="/content" textLink={t('home')} />
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <NavSmallLink path="/configure" textLink={t('configure')} />
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    {typeof window !== 'undefined' && (() => {
                                        const Cookie = require('js-cookie');
                                        const user_id = Cookie.get('user_id');
                                        return user_id ? (
                                            <>
                                                <Link href={`/profile/${user_id}`}>
                                                    <Avatar className="w-[50px] cursor-pointer h-[50px]">
                                                        <AvatarImage className="object-cover" src={image} />
                                                        <AvatarFallback className="text-[#000000] text-[30px] uppercase">{userData.username?.slice(0, 2)}</AvatarFallback>
                                                    </Avatar>
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <NavSmallLink path={`/auth/signin`} textLink={t('profile')} />
                                            </>
                                        );
                                    })()}
                                </DropdownMenuItem>
                                {isAdmin && (
                                    <DropdownMenuItem>
                                        <NavSmallLink path="/admin" textLink={t('admin')} />
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        ) : (
                            <DropdownMenuContent className="bg-[#1A1A1A] mt-[10px] border-0 flex flex-col text-white items-center">
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <NavSmallLink path="/auth/signin" textLink={t('signIn')} />
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <NavSmallLink path="/auth/signup" textLink={t('signUp')} />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        )}
                    </DropdownMenu>
                </>
            ) : (
                <>
                    {pathname === "/content" || pathname === "/configure" || pathname === "/profile" || isProfileWithId || isAdmin || isPC ? (
                        <div className="text-[15px] items-center flex lg:text-[18px] font-bold">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="ml-4 outline-none">
                                    <Globe className="w-5 h-5 text-white" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-[#1A1A1A] text-white text-sm">
                                    <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => changeLanguage('ru')}>Русский</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => changeLanguage('kk')}>Қазақша</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <NavLink path={"/content"} textLink={t('home')} />
                            <NavLink path={"/configure"} textLink={t('configure')} />
                            {typeof window !== 'undefined' && (() => {
                                const Cookie = require('js-cookie');
                                const user_id = Cookie.get('user_id');
                                return user_id ? (
                                    <>
                                        <Link href={`/profile/${user_id}`}>
                                            <Avatar className="w-[50px] cursor-pointer h-[50px] ">
                                                <AvatarImage className="object-cover" src={image} />
                                                <AvatarFallback className="text-[#000000] text-[20px] uppercase">{userData.username?.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <NavLink path={`/auth/signin`} textLink={t('profile')} />
                                    </>
                                );
                            })()}
                            {isAdmin && (
                                <NavLink path={"/admin"} textLink={t('admin')} />
                            )}
                        </div>
                    ) : (
                        <div className="text-[15px] lg:text-[18px] font-bold">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="ml-4 outline-none">
                                    <Globe className="w-5 h-5 text-white" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-[#1A1A1A] text-white text-sm">
                                    <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => changeLanguage('ru')}>Русский</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => changeLanguage('kk')}>Қазақша</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <NavLink path="/auth/signin" textLink={t('signIn')} />
                            <NavLink path="/auth/signup" textLink={t('signUp')} />
                            
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Header