'use client'
import { useForm } from "react-hook-form";
import Image from "next/image";
const Auth = () => {

    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = data => console.log(data);
    console.log(watch("example"));

    return (
        <>
            <div className="flex justify-between ">
                <div className="">
                    <div className="bg-[#3E3E3E] opacity-[90%] px-[54px] py-[30px] rounded-[20px] mb-[20px]">
                        <h2 className="text-center font-bold text-[30px] text-[#FFCC70]">Sign in</h2>
                        <div className="">
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mt-[20px]">
                                <p className="px-[12px] text-[15px]">Email</p>
                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] opacity-[100%] bg-[#434343] rounded-[10px]" type="text" {...register("Email")} placeholder="Enter your email" />
                            </div>
                            <div className="my-[17px]">
                                <p className="px-[12px] text-[15px]">Password</p>
                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] opacity-[100%] bg-[#434343] rounded-[10px]" type="text" {...register("Email")} placeholder="Enter your password" />
                            </div>
                            <div className="">
                                <button className="rounded-[15px] text-[17px] font-black px-[90px] w-[100%] py-[10px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">Log in</button>
                            </div>
                            </form>
                        </div>
                    </div>
                    <div className="bg-[#3E3E3E] opacity-[90%] px-[54px] py-[30px] rounded-[20px] font-bold">
                        <div className="">
                            <button className="flex justify-center border-1 border-[#FFCC70] py-[10px] w-[100%] text-[17px] rounded-[15px]">Log in with Google <Image className="ml-[7px]" alt="google" width={23} height={23} src="img/google.svg"/></button>  
                        </div>
                        <div className="mt-[20px]">
                            <button className="flex justify-center border-1 border-[#FFCC70] py-[10px] w-[100%] text-[17px] rounded-[15px]">Log in with Discord <Image className="ml-[7px]" alt="discord" width={23} height={23} src="img/discord.svg"/></button>  
                        </div>
                    </div>
                </div>

                <div className="">
                    <p>pc</p>
                </div>
            </div>
        </>
    );
};

export default Auth