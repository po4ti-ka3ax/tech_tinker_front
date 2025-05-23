"use client"
import { useForm } from "react-hook-form";
import instanceAxios from "../components/axios/instanceAxios";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useState } from "react";


const Reset = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const Cookies = require('js-cookie')
    const [show, setShow] = useState(true);
    const [showRepeat, setShowRepeat] = useState(true);
    const onSubmit = data => instanceAxios.post('/reset-password', {
        "token": Cookies.get('reset_token'),
        "password": watch('newPassword'),
        "password_confirmation": watch('repeatNewPassword'),
    }).then(res => {
        if (res.status === 200) {
            redirect('/auth/signin')
        }
        console.log(res);

        // console.log()
    });
    return (
        <>
            <div className="bg-[#3E3E3E] opacity-[90%] rounded-[10px] py-[30px] px-[30px] max-w-[500px] m-auto">
                <h2 className="text-center text-[30px]">Reset password</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-[17px]">
                        <p className="px-[12px] text-[15px] font-regular text-white">Password</p>
                        <div className="flex opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] px-[12px] mt-[7px] py-[10px]">
                            <input className="w-[100%] text-[15px] placeholder:text-[#DCDCDC]  autofill:bg-[#434343] focus:outline-none focus:border-none" type={show ? "password" : "text"} {...register("newPassword", { required: 'Password must be at least 8 characters long', minLength: 8, })} placeholder="Enter your password" />
                            <Image onClick={() => setShow(!show)} className="" alt="eye" width={30} height={20} src={show ? '/img/hide.png' : '/img/eye.png'} />
                        </div>
                        {errors.Password && <p className="mt-[10px] text-center text-[#940014]">{errors.Password.message as string}</p>}

                    </div>
                    <div className="my-[17px]">
                        <p className="px-[12px] text-[15px] font-regular text-white">Repeat password</p>
                        <div className="flex opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] px-[12px] mt-[7px] py-[10px]">
                            <input className="w-[100%] text-[15px] placeholder:text-[#DCDCDC]  autofill:bg-[#434343] focus:outline-none focus:border-none" type={showRepeat ? "password" : "text"} {...register("repeatNewPassword", { required: 'Password must be at least 8 characters long', minLength: 8, })} placeholder="Repeat your password" />
                            <Image onClick={() => setShowRepeat(!showRepeat)} className="" alt="eye" width={30} height={20} src={showRepeat ? '/img/hide.png' : '/img/eye.png'} />
                        </div>
                        {errors.Password && <p className="mt-[10px] text-center text-[#940014]">{errors.Password.message as string}</p>}

                    </div>
                    <div className="">
                        <button className="rounded-[15px] cursor-pointer text-[17px] font-black px-[90px] w-[100%] py-[10px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Reset;