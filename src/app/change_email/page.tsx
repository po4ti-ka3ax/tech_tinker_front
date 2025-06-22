'use client'

import { useForm } from "react-hook-form";
import instanceAxios from "../components/axios/instanceAxios";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import "@/lib/i18n";

const ChangeEmail = () => {
    const { t } = useTranslation('common');
    const Cookies = require('js-cookie')
    const email = Cookies.get('email_user')
    const id = Cookies.get('user_id')
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [show, setShow] = useState(true);
    const onSubmit = data => instanceAxios.post('/login', {
        "email":email,
        "password": watch('password'),
    }).then(res => {
        if (res.status === 200) {
            Cookies.set('has_email_change', true)
            redirect(`/profile/${id}`)
        }
        console.log(res);
    });
    return (
        <div className="">
            <div className="bg-[#3E3E3E] opacity-[90%] rounded-[10px] py-[30px] px-[30px] max-w-[500px] m-auto">
                <h2 className="text-center text-[30px]">{t('Change Email')}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-[17px]">
                        <p className="px-[12px] text-[15px] font-regular text-white">{t('password')}</p>
                        <div className="flex opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] px-[12px] mt-[7px] py-[10px]">
                            <input className="w-[100%] text-[15px] placeholder:text-[#DCDCDC]  autofill:bg-[#434343] focus:outline-none focus:border-none" type={show ? "password" : "text"} {...register("password", { required: t('passwordRequired'), minLength: 8, })} placeholder={t('Enter your password')} />                            
                            <Image onClick={() => setShow(!show)} className="" alt="eye" width={30} height={20} src={show ? '/img/hide.png' : '/img/eye.png'} />
                        </div>
                        {errors.Password && <p className="mt-[10px] text-center text-[#940014]">{errors.Password.message as string}</p>}
                    </div>
                    <div className="">
                        <button className="rounded-[15px] cursor-pointer text-[17px] font-black px-[90px] w-[100%] py-[10px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">{t('submit')}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangeEmail;