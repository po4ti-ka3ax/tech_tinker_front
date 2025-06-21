'use client'
import { useForm } from "react-hook-form";
import Image from "next/image";
import Slider from "../../components/slider/Slider";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import instanceAxios from "@/app/components/axios/instanceAxios";
import { redirect } from "next/navigation";
import { useTranslation } from 'react-i18next';
import "@/lib/i18n";
import { useRouter } from "next/navigation";
import useUserData from "@/app/state/useDataStore";

// or
const Auth = () => {
    const router = useRouter();
    const { t } = useTranslation('common');
    const { setUserData, userData } = useUserData();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: "onSubmit"
    });
    const Cookies = require('js-cookie')
    const [error, setError] = useState("");
    const access_token = Cookies.get('access_token')
    const onSubmit = () => instanceAxios.post('/login', {
        "email": watch('email'),
        "password": watch('password')
    }).then(res => {
        console.log(res.data)
        let index = res.data.access_token.indexOf('|')
        setError("")
        // .substr(index + 1, 49)
        setUserData(res.data.data)
        Cookies.set('access_token', res.data.access_token)
        Cookies.set('user_id', res.data.data.id)
        Cookies.set('email_user', res.data.data.email)
        Cookies.set('user_role', res.data.data.role.id)
       
        // console.log()
    })
    useEffect(() => {
        if (access_token) {
            redirect('/content')
        }
    }, [access_token])

    const signGoogle = async () => {
        try {
            await instanceAxios.get(`/auth/google/redirect`).then(res => {
                window.location.href = res?.data?.url
            }) 
        } catch(err) {
            console.error(err)
        }
    }
    const signDiscord = async () => {
        try {
            await instanceAxios.get(`/auth/discord/redirect`).then(res => {
                if(res.status === 200) {
                    window.location.href = res?.data?.url
                }
            }) 
        } catch(err) {
            console.error(err)
        }
    }
    const [show, setShow] = useState(true);

    return (
        <>
            <div className="flex justify-around ">
                <div className="">
                    <div className="bg-[#3E3E3E] opacity-[90%] px-[20px] md:px-[54px] py-[30px] rounded-[20px] mb-[20px]">
                        <h2 className="text-center  text-[30px] text-[#FFCC70]">{t('signIn')}</h2>
                        <div className="">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mt-[20px]">
                                    <p className="px-[12px] text-[15px] font-regular text-white">{t('email')}</p>
                                    <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" type="email" {...register("email", { required: t('emailIsRequired') })} placeholder={t('emailEnter')} />
                                </div>
                                {
                                    errors.email && (
                                        <p className="text-[#FF5252] break-normal">{errors.email.message}</p>
                                    )
                                }
                                <div className="my-[17px]">
                                    <p className="px-[12px] text-[15px] font-regular text-white">{t('password')}</p>
                                    <div className="flex opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] px-[12px] mt-[7px] py-[10px]">
                                        <input className="w-[100%] text-[15px] placeholder:text-[#DCDCDC]  autofill:bg-[#434343] focus:outline-none focus:border-none" type={show ? "password" : "text"} {...register("password", { required: 'Password is required', minLength: { value: 8, message: t('passwordRequired') }, })} placeholder={t('passwordEnter')} />
                                        <Image onClick={() => setShow(!show)} className="" alt="eye" width={30} height={20} src={show ? '/img/hide.png' : '/img/eye.png'} />
                                    </div>
                                    <Link href='/forgot' className="text-[#DCDCDC]  px-[12px] underline">{t('passwordForgot')}</Link>

                                    {
                                        errors.password && (
                                            <p className="text-[#FF5252] break-normal">{errors.password.message}</p>
                                        )
                                    }
                                    {/* {
                                        error ? (
                                            <p className="mt-[20px] text-[#FF5252] text-center">{error}</p>
                                        ) : ""
                                    } */}
                                </div>
                                <div className="">
                                    <button className="rounded-[15px] cursor-pointer text-[17px] font-black px-[90px] w-[100%] py-[10px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">{t('logIn')}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="bg-[#3E3E3E] opacity-[90%] px-[54px] py-[30px] rounded-[20px] ">
                        <div className="">
                            <button onClick={() => signGoogle()} className="flex whitespace-nowrap cursor-pointer justify-center border-1 border-[#FFCC70] px-[18px] py-[10px] w-[100%] text-[17px] rounded-[15px]">{t('logIn')} with Google <Image className="ml-[7px]" alt="google" width={23} height={23} src="/img/google.svg" /></button>
                        </div>
                        <div className="mt-[20px]">
                            <button onClick={() => signDiscord()} className="flex whitespace-nowrap cursor-pointer justify-center border-1 border-[#FFCC70] px-[18px] py-[10px] w-[100%] text-[17px] rounded-[15px]">{t('logIn')} with Discord <Image className="ml-[7px]" alt="discord" width={23} height={23} src="/img/discord.svg" /></button>
                        </div>
                    </div>
                    <div className="text-center mt-[20px]">
                        <Link className="underline text-[#DCDCDC]" href={'/auth/signup'}>
                            {t('notAccount')}
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