'use client'

import { signOut } from "next-auth/react";
import ProtectedMiddleware from "../../components/middleware/middleware";
import { useEffect, useState } from "react";
import instanceAxios from "../../components/axios/instanceAxios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { ProfilePageProps } from "@/app/interfaces/interface";
import Link from "next/link";
import useUserData from "@/app/state/useDataStore";
const Profile = ({ params }: ProfilePageProps) => {
    const { setUserData, userData } = useUserData();
    const Cookies = require('js-cookie')
    const token = Cookies.get('access_token');
    const userId = Cookies.get('user_id')
    const urlUserId = params.id;
    const [userInfo, setUserInfo] = useState({});
    const [image, setImage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editData, setEditData] = useState({
        username: '',
        email: ''
    })
    const hasEmailChange = Cookies.get('has_email_change');
    const axios = require("axios");
    const [edit, setEdit] = useState(false);
    const [emailChange, setEmailChange] = useState(false);

    useEffect(() => {
        const fetchUser = () => {
            // setLoading(true)
            // const interval = setInterval(() => {
            //     if (hasEmailChange) {
            //         setEmailChange(true)
            //     } else {
            //         setEmailChange(false)
            //     }
            // }, 1000)
            try {

                instanceAxios.get(`/users/${urlUserId}`).then(res => {
                    Cookies.set('email_user', res.data.data.email)
                    setUserData(res.data.data)
                    setImage(`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${res.data.data.profile_img}`)
                })
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
                // clearInterval(interval)
            }
        }

        if (!userData.hasOwnProperty('id')) {
            fetchUser()
        }
        if (userData) {
            setUserInfo(userData)
            setImage(`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${userData.profile_img}`)
        }

    }, [userId, userData])

    useEffect(() => {
        if (userInfo) {
            setEditData({
                username: userInfo?.username || "",
                email: userInfo?.email || "",
            })
        }
    }, [userInfo])

    const handleSignOut = async () => {
        Cookies.remove("has_email_change");
        Cookies.remove("email_user");
        instanceAxios.post('/logout', {}).then(res => {
            if (res.status === 200) {
                Cookies.remove('access_token')
                Cookies.remove('user_id')
            }
        })
    }

    const handleChange = async () => {
        const formData = new FormData();
        let hasChanges = false;
        let changes = {};

        if (hasEmailChange) {
            Cookies.set('email_user', editData.email)
        }

        if (editData.username !== userInfo?.username) {
            formData.append("username", editData.username)
            changes.username = editData.username;
            hasChanges = true;
        }
        if (editData.email !== userInfo?.email) {
            formData.append("email", editData.email)
            changes.email = editData.email;
            hasChanges = true;
        }
        if (selectedImage) {
            formData.append("upload", selectedImage)
            // changes.username = editData.username;
            hasChanges = true;
        }
        // Cookies.remove("user_id");
        Cookies.remove("has_email_change");
        try {
            instanceAxios.post('/users/edit', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(
                res => {
                    if (res.status === 200) {
                        console.log(res.data.data)
                        setUserInfo(res.data.data)
                        setImage(`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${res.data.data.profile_img}`)
                        setEdit(false);
                    }
                }
            )
        }
        catch (err) {
            console.error(err)
        }
    }


    return (
        <>
            <ProtectedMiddleware>
                <h1 className="text-center text-[24px]">Profile</h1>
                {
                    edit ? (
                        <div className="bg-[#3E3E3E] max-w-[900px] mt-[60px] m-auto px-[20px] py-[80px] rounded-[10px] md:flex md:justify-around md:items-center">
                            <div className="flex justify-center gap-[20px]">
                                <div className=" flex flex-col text-[17px] md:text-[25px] text-right gap-[10px]">
                                    <p className="bg-[#434343] px-[5px] py-[5px] rounded-[10px]">Username: </p>
                                    <p className="bg-[#434343] px-[5px] py-[5px] rounded-[10px]">Email: </p>

                                    {/* <p className="text-[25px]">Role: </p> */}
                                </div>
                                <div className="flex flex-col text-[17px] md:text-[25px] text-right gap-[10px]">
                                    <input className="px-[10px] bg-[#434343] py-[5px] rounded-[10px]" onChange={(e) => setEditData({ ...editData, username: e.target.value })} value={editData.username} placeholder="Unknown" type="text" />
                                    <input className="px-[10px] bg-[#434343] py-[5px] rounded-[10px]" readOnly={hasEmailChange ? false : true} onChange={(e) => setEditData({ ...editData, email: e.target.value })} value={editData.email} placeholder="Unknown" type="email" />
                                    <Link
                                        href="/change_email"
                                        className={`md:w-[40%] text-left px-[10px] mt-[10px] py-[10px] text-[17px] rounded-[10px] ${hasEmailChange
                                                ? "bg-[#E5CA98] text-[#3E3E3E] cursor-not-allowed pointer-events-none"
                                                : "bg-[#FFCC70] text-black cursor-pointer"
                                            }`}
                                    >
                                        Change Email
                                    </Link>

                                    {/* <input className="px-[10px] py-[5px] rounded-[10px]" readonly="readonly" value={userInfo?.role?.slug} placeholder="Unknown" type="text" /> */}
                                </div>

                            </div>

                            <div className="flex flex-col mt-[20px] justify-center items-center">
                                <input type="file" id="real-input" onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        setSelectedImage(e.target.files[0]);
                                    }
                                }} hidden />
                                <label htmlFor="real-input">
                                    <Avatar className="w-[190px] cursor-pointer h-[190px] mb-[10px]">
                                        <AvatarImage className="object-cover" src={image} />
                                        <AvatarFallback className="text-[#000000] text-[40px] uppercase">{userInfo.username?.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <p className="my-[20px] text-center cursor-pointer">Upload photo</p>

                                </label>
                                {/* <input type="file" onChange={(e) => {
                                    if(e.target.files?.[0]) {
                                        setSelectedImage(e.target.files[0]);
                                    }
                                }}/> */}

                                <div className="">
                                    <button className="px-[10px] mr-[30px] mb-[10px] py-[10px] bg-[#FFCC70] text-[17px] text-black cursor-pointer rounded-[10px]" onClick={() => {
                                        setEdit(!edit)
                                        Cookies.remove('has_email_change')
                                        }}>Cancel</button>
                                    <button className="px-[10px] mb-[10px] py-[10px] bg-[#FFCC70] text-black cursor-pointer rounded-[10px]" onClick={handleChange}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    )
                        :
                        <div className="bg-[#3E3E3E] max-w-[900px] mt-[60px] m-auto px-[20px] py-[80px] rounded-[10px] md:flex md:justify-around md:items-center">
                            <div className="flex justify-center gap-[20px] mb-[20px]">
                                <div className="flex flex-col text-[17px] md:text-[25px] text-right gap-[10px]">
                                    <p className="bg-[#434343] px-[5px] py-[5px] rounded-[10px]">Username: </p>
                                    {
                                        urlUserId === userId ? (
                                            <p className="bg-[#434343] px-[5px] py-[5px] rounded-[10px]">Email: </p>
                                        ) : ""
                                    }
                                    {/* <p className="text-[25px]">Role: </p> */}
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    {/* {loading ? (
                                        <>
                                            <Skeleton className="h-[30px] w-[130px]" />
                                            <Skeleton className="h-[30px] w-[200px]" />

                                        </>
                                    ) : (
                                        ""
                                    )} */}
                                    <div className="flex flex-col text-[17px] md:text-[25px] text-left gap-[10px]">
                                        <p className="bg-[#434343] px-[5px] py-[5px] rounded-[10px]">{userInfo.username}</p>

                                        {
                                            urlUserId === userId ? (
                                                <p className="bg-[#434343] px-[5px] py-[5px] rounded-[10px]">{userInfo.email}</p>
                                            ) : ""
                                        }
                                    </div>
                                </div>


                            </div>

                            <div className="flex flex-col justify-center items-center">
                                <Avatar className="w-[190px] h-[190px] mb-[30px]">
                                    <AvatarImage className="object-cover" src={image} />
                                    <AvatarFallback className="text-[#000000] text-[40px] uppercase">{userInfo.username?.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                {
                                    urlUserId === userId ? (
                                        <button className="px-[10px] py-[10px] bg-[#FFCC70] text-black cursor-pointer rounded-[10px]" onClick={() => setEdit(!edit)}>Edit profile info</button>
                                    ) : ""
                                }
                            </div>

                        </div>
                }

                {
                    userInfo.role_id === 2 ? (
                        <>
                            <div className="text-center mt-[20px]">
                                <Link href={'/admin'}>
                                    <button className="px-[10px] py-[10px] bg-[#FFCC70] text-black cursor-pointer rounded-[10px]">Go to admin panel</button>
                                </Link>
                            </div>
                        </>
                    ) : ""
                }




                <div className="text-center mt-[30px]">
                    <button className="text-center cursor-pointer text-[#C82323] border-[#C82323] hover:bg-[#C82323] hover:text-[#ffffff] duration-300 border-1 rounded-[10px] px-[10px] py-[10px]" onClick={() => handleSignOut()}>Sign out</button>
                </div>

            </ProtectedMiddleware>
        </>
    );
}

export default Profile