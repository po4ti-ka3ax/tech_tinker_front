'use client'

import { LinkComponentInterface } from "@/app/interfaces/interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"

const LinkComponent = ({path, namePath}:LinkComponentInterface) => {
    const [isActive, setIsActive] = useState(false)
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname) return;
        setIsActive(pathname.includes(path));
    },[pathname,path])

    return (
        <>
            <Link href={`/admin/${path}`}><button className={`px-[10px] mt-[10px] py-[10px]  ${isActive ? "bg-[#FFCC70] text-black border-0" : "border-[#FFCC70] border-1 text-white"} text-[24px] cursor-pointer rounded-[10px]`}>{namePath}</button></Link>
        </>
    )
}

export default LinkComponent