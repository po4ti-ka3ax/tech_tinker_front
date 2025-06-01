'use client'

import { LinkInterface } from "@/app/interfaces/interface";
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";

const Header = () => {
    const pathname = usePathname();
    const Cookie = require('js-cookie')
    const user_id = Cookie.get('user_id')
    if (!pathname) return null;

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
                <Link className={`${pathname === path ? "bg-[#FFCC70] px-[25px] py-[10] lg:px-[45px] lg:py-[10px] text-[#1A1A1A] rounded-[15px] ml-[50px]" : "ml-[50px]"}`} href={path}>
                    {textLink}
                </Link>
            </>
        )
    };
    const NavSmallLink = ({ textLink, path }: LinkInterface) => {
        return (
            <>
                <Link className={`${pathname === path ? "bg-[#FFCC70] px-[25px] py-[7px] lg:px-[45px] lg:py-[10px] text-[#1A1A1A]  rounded-[15px]" : "text-[17px]"}`} href={path}>
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
                                pathname === "/content" || pathname === "/configure" || pathname === "/profile" ?
                                    (
                                        <DropdownMenuContent className="bg-[#1A1A1A] mt-[10px] text-[17px] border-0 ring-0 outline-none shadow-none flex flex-col text-white items-center" style={{ border: 'none' }}>
                                            <DropdownMenuItem>
                                                <NavSmallLink path="/content" textLink="Home" />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <NavSmallLink path="/configure" textLink="Configure" />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <NavSmallLink path={`/profile`} textLink="Profile" />
                                            </DropdownMenuItem>
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
                                pathname === "/content" || pathname === "/configure" || pathname === "/profile" ?
                                    (
                                        <div className="text-[15px] lg:text-[18px] font-bold">
                                            <NavLink path={"/content"} textLink="Home" />
                                            <NavLink path={"/configure"} textLink="Configure" />
                                            <NavLink path={`/profile/${user_id}`} textLink="Profile" />
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