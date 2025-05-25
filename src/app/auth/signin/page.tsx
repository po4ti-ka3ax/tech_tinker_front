'use client'
import { useForm } from "react-hook-form";
import Image from "next/image";
import Slider from "../../components/slider/Slider";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import instanceAxios from "@/app/components/axios/instanceAxios";
import { redirect } from "next/navigation";
// or
const Auth = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode:"onSubmit"
    });
    const Cookies = require('js-cookie')

    const onSubmit = data => instanceAxios.post('/login', {
        "email": watch('email'),
        "password": watch('password')
    }).then(res => {
        let index = res.data.token.indexOf('|')
        Cookies.set('access_token',res.data.token.substr(index + 1, 49))
        Cookies.set('user_id',res.data.data.id)
         if(Cookies.get('access_token')) {
        redirect('/content')
    }
        // console.log()
    });

    const [show, setShow] = useState(true);

    return (
        <>
            <div className="flex justify-around ">
                <div className="">
                    <div className="bg-[#3E3E3E] opacity-[90%] px-[20px] md:px-[54px] py-[30px] rounded-[20px] mb-[20px]">
                        <h2 className="text-center  text-[30px] text-[#FFCC70]">Sign in</h2>
                        <div className="">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mt-[20px]">
                                    <p className="px-[12px] text-[15px] font-regular text-white">Email</p>
                                    <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" type="email" {...register("email")} placeholder="Enter your email" />
                                </div>
                                <div className="my-[17px]">
                                    <p className="px-[12px] text-[15px] font-regular text-white">Password</p>
                                    <div className="flex opacity-[100%] mb-[10px] w-[100%] bg-[#434343] rounded-[10px] px-[12px] mt-[7px] py-[10px]">
                                        <input className=" text-[15px] placeholder:text-[#DCDCDC]  autofill:bg-[#434343] focus:outline-none focus:border-none" type={show ? "password" : "text"} {...register("password")} placeholder="Enter your password" />
                                        <Image onClick={() => setShow(!show)} className="" alt="eye" width={30} height={20} src={show ? '/img/hide.png' : '/img/eye.png'} />
                                    </div>
                                    <Link href='/forgot' className="text-[#DCDCDC]  px-[12px] underline">Forgot password</Link>
                                </div>
                                <div className="">
                                    <button className="rounded-[15px] cursor-pointer text-[17px] font-black px-[90px] w-[100%] py-[10px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">Log in</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="bg-[#3E3E3E] opacity-[90%] px-[54px] py-[30px] rounded-[20px] ">
                        <div className="">
                            <button onClick={() => signIn('google')} className="flex whitespace-nowrap cursor-pointer justify-center border-1 border-[#FFCC70] px-[18px] py-[10px] w-[100%] text-[17px] rounded-[15px]">Log in with Google <Image className="ml-[7px]" alt="google" width={23} height={23} src="/img/google.svg" /></button>
                        </div>
                        <div className="mt-[20px]">
                            <button onClick={() => signIn('discord')} className="flex whitespace-nowrap cursor-pointer justify-center border-1 border-[#FFCC70] px-[18px] py-[10px] w-[100%] text-[17px] rounded-[15px]">Log in with Discord <Image className="ml-[7px]" alt="discord" width={23} height={23} src="/img/discord.svg" /></button>
                        </div>
                    </div>
                    <div className="text-center mt-[20px]">
                        <Link className="underline text-[#DCDCDC]" href={'/auth/signup'}>
                            Not account? Sign up!
                        </Link>
                    </div>
                </div>

                <div className="hidden lg:block">
                    <Slider />
                </div>
            </div>
        </>
    );
};

export default Auth