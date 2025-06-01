'use client'
import Slider from "@/app/components/slider/Slider";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import instanceAxios from "@/app/components/axios/instanceAxios";
import { redirect } from "next/navigation";

const Signup = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: "onSubmit"
    });
    const [show, setShow] = useState(true);
    const [showRepeat, setShowRepeat] = useState(true);

    const Cookies = require('js-cookie')

    const onSubmit = data => instanceAxios.post('/register', {
        "username": watch('username'),
        "email": watch('email'),
        "password": watch('password'),
        "password_confirmation": watch('repeatPassword'),
    }).then(res => {
        let index = res.data.token.indexOf('|')
        Cookies.set('access_token', res.data.token.substr(index + 1, 49))
        Cookies.set('user_id', res.data.data.id)
        if (Cookies.get('access_token')) {
            redirect('/content')
        }
        // console.log()
    });

    const validatePassword = () => {
        if (watch("password").length < 8) {
            return 'Password must be at least 8 characters long'
        }
    }
    const validateRepeatPassword = () => {
        if (watch("password_confirmation") != watch("Repeat_password")) {
            return 'Password must be equal'
        }
    }



    return (
        <>
            <div className="flex justify-around ">
                <div className="">
                    <div className="bg-[#3E3E3E] opacity-[90%] px-[20px] md:px-[54px] py-[30px] rounded-[20px] mb-[20px]">
                        <h2 className="text-center text-[30px] text-[#FFCC70]">Sign up</h2>
                        <div className="">
                            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                                <div className="mt-[20px]">
                                    <p className="px-[12px] text-[15px] font-regular text-white">Username</p>
                                    <input
                                        autoComplete="username"
                                        className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none"
                                        type="text"
                                        {...register("username", { required: "Username is required" })}
                                        placeholder="Enter your username"
                                    />
                                    {errors.username && <p>{errors.username.message}</p>}
                                </div>

                                <div className="mt-[20px]">
                                    <p className="px-[12px] text-[15px] font-regular text-white">Email</p>
                                    <input
                                        autoComplete="email"
                                        className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none"
                                        type="email"
                                        {...register("email", { required: "Email is required" })}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && <p>{errors.email.message}</p>}
                                </div>
                                <div className="my-[17px]">
                                    <p className="px-[12px] text-[15px] font-regular text-white">Password</p>
                                    <div className="flex opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] px-[12px] mt-[7px] py-[10px]">
                                        <input className=" text-[15px] placeholder:text-[#DCDCDC]  autofill:bg-[#434343] focus:outline-none focus:border-none" type={show ? "password" : "text"} {...register("password", { required: 'Password must be at least 8 characters long', minLength: 8, validate: validatePassword })} placeholder="Enter your password" />
                                        <Image onClick={() => setShow(!show)} className="" alt="eye" width={30} height={20} src={show ? '/img/hide.png' : '/img/eye.png'} />
                                    </div>
                                    {errors.Password && <p className="mt-[10px] text-center text-[#940014]">{errors.Password.message as string}</p>}

                                </div>
                                <div className="my-[17px]">
                                    <p className="px-[12px] text-[15px] font-regular text-white">Repeat password</p>
                                    <div className="flex opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] px-[12px] mt-[7px] py-[10px]">
                                        <input className=" text-[15px] placeholder:text-[#DCDCDC]  autofill:bg-[#434343] focus:outline-none focus:border-none" type={showRepeat ? "password" : "text"} {...register("repeatPassword", { required: 'Password must be at least 8 characters long', minLength: 8, validate: validatePassword })} placeholder="Repeat your password" />
                                        <Image onClick={() => setShowRepeat(!showRepeat)} className="mr-[30px] sm:mr-[0px]" alt="eye" width={30} height={20} src={showRepeat ? '/img/hide.png' : '/img/eye.png'} />
                                    </div>
                                    {errors.Password && <p className="mt-[10px] text-center text-[#940014]">{errors.Password.message as string}</p>}

                                </div>
                                <div className="">
                                    <button className="rounded-[15px] cursor-pointer text-[15px] font-black px-[90px] w-[100%] py-[10px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">Log in</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="bg-[#3E3E3E] opacity-[90%] px-[54px] py-[30px] rounded-[20px] font-bold">
                        <div className="">
                            <button onClick={() => signIn('google')} className="flex cursor-pointer justify-center border-1 border-[#FFCC70] py-[10px] w-[100%] text-[17px] rounded-[15px]">Sign up with Google <Image className="ml-[7px]" alt="google" width={23} height={23} src="/img/google.svg" /></button>
                        </div>
                        <div className="mt-[20px]">
                            <button onClick={() => signIn('discord')} className="flex cursor-pointer justify-center border-1 border-[#FFCC70] py-[10px] w-[100%] text-[17px] rounded-[15px]">Sign up with Discord <Image className="ml-[7px]" alt="discord" width={23} height={23} src="/img/discord.svg" /></button>
                        </div>
                    </div>
                    {/* <div className="text-center mt-[20px]">
                        <Link className="underline text-[#DCDCDC]" href={'/auth/signup'}>
                            Not account? Sign up!
                        </Link>
                    </div> */}
                </div>

                <div className="hidden lg:block">
                    <Slider />
                </div>
            </div>
        </>
    )
}

export default Signup;