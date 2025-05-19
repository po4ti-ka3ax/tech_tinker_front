'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname();
    
    if(!pathname) return null;

    return (
        <div className="bg-[#2D2D2D] mx-[20px] px-[50px] py-[24px] rounded-[20px] flex justify-between items-center mb-[80px]">
            <div className="">
                <Link className="flex text-[40px] fw-[700] " href="/">Tech <Image width={70} height={65} className="px-[5px]" src="/img/logo.svg" alt="" />Tinker</Link>
            </div>

            {
                pathname === "/content" || pathname === "/configure" || pathname === "/profile" ?
                    (
                        <div className="text-[18px] font-bold">
                            <Link className={`${pathname === "/content" ? "bg-[#FFCC70] px-[45px] py-[10px] text-[#1A1A1A] rounded-[15px]" : "ml-[50px]"}`} href="/content">
                                Home
                            </Link>
                            <Link className={`${pathname === "/configure" ? "bg-[#FFCC70] px-[45px] py-[10px] text-[#1A1A1A] rounded-[15px] ml-[50px]" : "ml-[50px]"}`} href="/configure">
                                Configure
                            </Link>
                            <Link className={`${pathname === "/profile" ? "bg-[#FFCC70] px-[45px] py-[10px] text-[#1A1A1A] rounded-[15px] ml-[50px]" : "ml-[50px]"}`} href="/profile">
                                Profile
                            </Link>
                        </div>
                    )
                    :
                    (
                        <div className="text-[18px] font-bold">
                            <Link className={`${pathname === "/auth/signin" ? "bg-[#FFCC70] px-[45px] py-[10px] text-[#1A1A1A] rounded-[15px] ml-[50px]" : "ml-[50px]"}`} href="/auth/signin">
                                Sign In
                            </Link>
                            <Link className={`${pathname === "/auth/signup" ? "bg-[#FFCC70] px-[45px] py-[10px] text-[#1A1A1A] rounded-[15px] ml-[50px]" : "ml-[50px]"}`} href="/auth/signup">
                                Sign Up
                            </Link>
                        </div>
                    )
            }



        </div>
    )
}

export default Header