'use client'

import { LinkInterface } from "@/app/interfaces/interface";
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname();

    if (!pathname) return null;

    const NavLink = ({ textLink, path}: LinkInterface) => {
        return (
            <>
                <Link className={`${pathname === path ? "bg-[#FFCC70] px-[25px] py-[10] lg:px-[45px] lg:py-[10px] text-[#1A1A1A] rounded-[15px] ml-[50px]" : "ml-[50px]"}`} href={path}>
                    {textLink}
                </Link>
            </>
        )
    };

    return (
        <div className="bg-[#2D2D2D] mx-[20px] px-[50px] py-[24px] rounded-[20px] flex justify-between items-center mb-[80px]">
            <div className="">
                <Link className="flex text-[30px] lg:text-[40px] fw-[700] " href="/">Tech <Image width={70} height={65} className="px-[5px] w-[50px] lg:w-[70px] lg:h-[65px]" src="/img/logo.svg" alt="" />Tinker</Link>
            </div>

            {
                pathname === "/content" || pathname === "/configure" || pathname === "/profile" ?
                    (
                        <div className="text-[15px] lg:text-[18px] font-bold">
                            <NavLink path="/content" textLink="Home"/>
                            <NavLink path="/configure" textLink="Configure"/>
                            <NavLink path="/profile" textLink="Profile"/>
                        </div>
                    )
                    :
                    (
                        <div className="text-[15px] lg:text-[18px] font-bold">
                            <NavLink path="/auth/signin" textLink="Sign In"/>
                            <NavLink path="/auth/signup" textLink="Sign Up"/>
                        </div>
                    )
            }



        </div>
    )
}

export default Header