'use client'

import { signOut } from "next-auth/react";
import ProtectedMiddleware from "../components/middleware/middleware";
import { useEffect, useState } from "react";
import instanceAxios from "../components/axios/instanceAxios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Profile = () => {
    const Cookies = require('js-cookie')
    const userId = Cookies.get('user_id')
    const [userInfo, setUserInfo] = useState({});
    const [edit, setEdit] = useState(false);
    useEffect(() => {
        const fetchUser = () => {
            try {
                const res = instanceAxios.get(`/users/${userId}`)
                setUserInfo(res.data.data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchUser()
    }, [userId])
    const handleSignOut = async () => {
        instanceAxios.post('/logout', {}).then(res => {
            if (res.status === 200) {
                Cookies.remove('access_token')
                Cookies.remove('user_id')
            }
        })
    }
    return (
        <>
            <ProtectedMiddleware>
                <h1 className="text-center text-[24px]">Profile</h1>
                <div className="bg-[#3E3E3E] max-w-[500px] mt-[100px] m-auto px-[20px] py-[40px] rounded-[10px] flex justify-around items-center">
                    <div className="">
                        <p>Username: {userInfo.username}</p>
                        <p>Email: {userInfo.email}</p>
                        <p>Role: {userInfo.role?.slug}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                            <Avatar className="w-[90px] h-[90px] mb-[10px]">
                                <AvatarImage src="" />
                                <AvatarFallback>{userInfo.username?.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <button className="px-[10px] py-[10px] bg-[#FFCC70] text-black rounded-[10px]" onClick={() => setEdit(!edit)}>Edit profile info</button>
                    </div>
                </div>

                <div className="text-center mt-[30px]">
                    <button className="text-center cursor-pointer text-[#C82323] border-[#C82323] hover:bg-[#C82323] hover:text-[#ffffff] duration-300 border-1 rounded-[10px] px-[10px] py-[10px]" onClick={() => handleSignOut()}>Sign out</button>
                </div>

            </ProtectedMiddleware>
        </>
    );
}

export default Profile