"use client"
import { useForm } from "react-hook-form";


const ForgotPassword = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <>
            <div className="bg-[#3E3E3E] opacity-[90%] rounded-[10px] py-[30px] px-[30px] max-w-[500px] m-auto">
                <h2 className="text-center text-[30px]">Forgot password</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-[20px]">
                        <p className="px-[12px] text-[15px] font-regular text-white">Email</p>
                        <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" type="email" {...register("email")} placeholder="Enter your email" />
                    </div>
                    <div className="">
                        <button className="rounded-[15px] cursor-pointer text-[17px] font-black px-[90px] w-[100%] py-[10px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ForgotPassword;