'use client'
import Link from "next/link";
import LinkComponent from "../components/admin/LinkComponent";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <h1 className="text-center text-[30px] lg:text-[50px] mb-[50px]">Admin panel</h1>

            <div className="grid grid-cols-[2fr_1fr] ">
                <div className="flex flex-col">
                    <LinkComponent path="users" namePath="Users"/>
                    <LinkComponent path="processors" namePath="Processors"/>
                </div>
                <div className="ml-[20px] ">{children}</div>
            </div>
        </>
    )
}