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
const Header = () => {

    const {userData, setUserData} = useUserData();
    const pathname = usePathname();
    const Cookie = require('js-cookie')
    // const [userData, setUserData] = useState([])
    const [image, setImage] = useState("");
    const user_id = Cookie.get('user_id')
    const isAdmin = userData?.role_id === 2;
    useEffect(() => {
        if (user_id) {
            instanceAxios.get(`/users/${user_id}`).then((res) => {
                setUserData(res.data.data)
                setImage(`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${res.data.data.profile_img}`)
                // console.log(userData)
            });
        }
        console.log(userData)
    }, [user_id])
    if (!pathname) return null;
    const isProfileWithId = /^\/profile\/\d+$/.test(pathname);
    const widthResize = () => {
        const [width, setWidth] = useState(window.innerWidth);
        useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth)
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }, [])

        return width
    }
    const screenWidth = widthResize();

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
                <Link className="flex text-[25px] lg:text-[40px] fw-[700] " href="/">Tech <Image width={70} height={65} className="px-[5px] w-[40px] lg:w-[70px] lg:h-[65px]" src="/img/logo.svg" alt="" />Tinker</Link>
            </div>

            {
                screenWidth <= 600 ? (
                    <>
                        <DropdownMenu >
                            <DropdownMenuTrigger className="outline-none ">
                                <Image width={35} height={35} src="/img/menu.svg" alt="" />
                            </DropdownMenuTrigger>
                            {
                                pathname === "/content" || pathname === "/configure" || pathname === "/profile" || isProfileWithId ?
                                    (
                                        <DropdownMenuContent className="bg-[#1A1A1A] mt-[10px] text-[17px] border-0 ring-0 outline-none shadow-none flex flex-col text-white items-center" style={{ border: 'none' }}>
                                            <DropdownMenuItem>
                                                <NavSmallLink path="/content" textLink="Home" />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <NavSmallLink path="/configure" textLink="Configure" />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                {
                                                    user_id ? (
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
                                                            <NavSmallLink path={`/auth/signin`} textLink="Profile" />

                                                        </>
                                                    )
                                                }
                                            </DropdownMenuItem>
                                            {
                                                isAdmin ? (
                                                    <DropdownMenuItem>
                                                        <NavSmallLink path="/admin" textLink="Admin" />
                                                    </DropdownMenuItem>
                                                ) : ""
                                            }
                                        </DropdownMenuContent>
                                    )
                                    :
                                    (
                                        <DropdownMenuContent className="bg-[#1A1A1A] mt-[10px] border-0 flex flex-col text-white items-center">
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <NavSmallLink path="/auth/signin" textLink="Sign In" />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <NavSmallLink path="/auth/signup" textLink="Sign Up" />
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    )
                            }

                        </DropdownMenu>

                    </>
                ) :
                    (
                        <>
                            {
                                pathname === "/content" || pathname === "/configure" || pathname === "/profile" || isProfileWithId || isAdmin ?
                                    (
                                        <div className="text-[15px] items-center flex lg:text-[18px] font-bold">
                                            <NavLink path={"/content"} textLink="Home" />
                                            <NavLink path={"/configure"} textLink="Configure" />
                                            {
                                                user_id ? (
                                                    <>
                                                        <Link href={`/profile/${user_id}`}>

                                                            <Avatar className="w-[50px] cursor-pointer h-[50px] ">
                                                                <AvatarImage className="object-cover" src={image} />
                                                                <AvatarFallback className="text-[#000000] text-[20px] uppercase">{userData.username?.slice(0, 2)}</AvatarFallback>
                                                                {/* {userInfo.username?.slice(0, 2)} */}
                                                            </Avatar>

                                                        </Link>
                                                    </>
                                                ) : (
                                                    <>
                                                        <NavLink path={`/auth/signin`} textLink="Profile" />
                                                    </>
                                                )
                                            }
                                            {
                                                isAdmin ? (
                                                        <NavLink path={"/admin"} textLink="Admin" />
                                                ) : ""
                                            }
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="text-[15px] lg:text-[18px] font-bold">
                                            <NavLink path="/auth/signin" textLink="Sign In" />
                                            <NavLink path="/auth/signup" textLink="Sign Up" />
                                        </div>
                                    )
                            }
                        </>
                    )
            }



        </div>
    )
}

export default Header