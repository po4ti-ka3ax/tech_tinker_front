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
                <div className="bg-[#3E3E3E] max-w-[500px] mt-[100px] m-auto px-[20px] py-[40px] rounded-[10px] flex">
                    <div className="">
                        <p>Username: {userInfo.username}</p>
                        <p>Email: {userInfo.email}</p>
                        <p>Role: {userInfo.role?.slug}</p>
                    </div>
                    <div className="">
                        <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>{userInfo.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="">
                        <button onClick={() => setEdit(!edit)}>Edit profile info</button>
                    </div>
                </div>
                <button onClick={() => handleSignOut()}>Sign out</button>
            </ProtectedMiddleware>
        </>
    );
}

export default Profile