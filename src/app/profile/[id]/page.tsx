'use client'

import { signOut } from "next-auth/react";
import ProtectedMiddleware from "../../components/middleware/middleware";
import { useEffect, useState } from "react";
import instanceAxios from "../../components/axios/instanceAxios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { ProfilePageProps } from "@/app/interfaces/interface";
const Profile = ({ params }: ProfilePageProps) => {
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
    const axios = require("axios");
    const [edit, setEdit] = useState(false);
    // const handleImageChange = async (e) => {
    //     const file = e.target.files[0];
    //     if (!file) return;
    //     formData.append('upload', file)
    // }
    useEffect(() => {
        const fetchUser = () => {
            setLoading(true)
            try {
                instanceAxios.get(`/users/${urlUserId}`).then(res => {
                    setUserInfo(res.data.data)
                    setImage(`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${res.data.data.profile_img}`)
                })
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }


        fetchUser()
    }, [userId])

    useEffect(() => {

        if (userInfo) {
            setEditData({
                username: userInfo?.username || "",
                email: userInfo?.email || "",
            })
        }
    }, [userInfo])

    const handleSignOut = async () => {
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
                                    <p className="">Username: </p>
                                    <p className="">Email: </p>

                                    {/* <p className="text-[25px]">Role: </p> */}
                                </div>
                                <div className="flex flex-col text-[17px] md:text-[25px] text-right gap-[10px]">
                                    <input className="px-[10px] py-[5px] rounded-[10px]" onChange={(e) => setEditData({ ...editData, username: e.target.value })} value={editData.username} placeholder="Unknown" type="text" />
                                    <input className="px-[10px] py-[5px] rounded-[10px]" onChange={(e) => setEditData({ ...editData, email: e.target.value })} value={editData.email} placeholder="Unknown" type="email" />
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
                                    <button className="px-[10px] mr-[30px] mb-[10px] py-[10px] bg-[#FFCC70] text-[17px] text-black cursor-pointer rounded-[10px]" onClick={() => setEdit(!edit)}>Cancel</button>
                                    <button className="px-[10px] mb-[10px] py-[10px] bg-[#FFCC70] text-black cursor-pointer rounded-[10px]" onClick={handleChange}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    )
                        :
                        <div className="bg-[#3E3E3E] max-w-[900px] mt-[60px] m-auto px-[20px] py-[80px] rounded-[10px] md:flex md:justify-around md:items-center">
                            <div className="flex justify-center gap-[20px] mb-[20px]">
                                <div className="flex flex-col text-[17px] md:text-[25px] text-right gap-[10px]">
                                    <p className="">Username: </p>
                                    {
                                        urlUserId === userId ? (
                                            <p className="">Email: </p>
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
                                        <p className="">{userInfo.username}</p>

                                        {
                                            urlUserId === userId ? (
                                                <p className="">{userInfo.email}</p>
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

                <div className="text-center mt-[30px]">
                    <button className="text-center cursor-pointer text-[#C82323] border-[#C82323] hover:bg-[#C82323] hover:text-[#ffffff] duration-300 border-1 rounded-[10px] px-[10px] py-[10px]" onClick={() => handleSignOut()}>Sign out</button>
                </div>

            </ProtectedMiddleware>
        </>
    );
}

export default Profile