'use client'
import instanceAxios from "@/app/components/axios/instanceAxios";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form";
import { ComponentInnerInterface } from "@/app/interfaces/interface";

const ComponentInner = ({componentKeys, componentValues, name, editOpen, setEditOpen, deleteOpen, setDeleteOpen, addOpen, setAddOpen}: ComponentInnerInterface) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: "onSubmit"
    });
    return (
        <>
            <div className=" bg-[#2D2D2D] rounded-[10px] px-[20px] py-[20px]">
                    <Table>
                        <TableCaption>{name} lists</TableCaption>
                        <TableHeader>
                            <TableRow >
                                {
                                    componentKeys?.map(el => (
                                        <TableHead className="text-white">{el}</TableHead>
                                    ))
                                }
                                {/* <TableHead className="text-white">Id:</TableHead>
                                <TableHead className="text-white">Username:</TableHead>
                                <TableHead className="text-white">Email:</TableHead>
                                <TableHead className="text-white">Profile image:</TableHead>
                                <TableHead className="text-white">Role id:</TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                componentValues?.map(el => (
                                    
                                ))
                            }
                            <div >
                                <Dialog open={addOpen} onOpenChange={setAddOpen}>
                                    <DialogTrigger className="mt-[30px] cursor-pointer bg-[#FFCC70] text-[18px] text-black px-[4px] py-[4px] rounded-[5px]">Add user</DialogTrigger>
                                    <DialogContent className="bg-[#242424] text-white border-0">
                                        <DialogHeader>
                                            <DialogTitle>Add {name}</DialogTitle>
                                        </DialogHeader>
                                        {/* onSubmit={handleSubmit(onSubmit)} */}
                                        <form autoComplete="off" >
                                            <div className="mt-[20px]">
                                                <p className="px-[12px] text-[15px] font-regular text-white">Username</p>
                                                <input
                                                    autoComplete="username"
                                                    className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none"
                                                    type="text"
                                                    {...register("username", { required: "Username is required" })}
                                                    placeholder="Enter your username"
                                                />
                                                {/* {errors.username && <p className="text-[#FF5252]">{errors.username.message}</p>} */}
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
                                                {/* {errors.email && <p className="text-[#FF5252]">{errors.email.message}</p>} */}
                                            </div>
                                            <div className="my-[17px]">
                                                <p className="px-[12px] text-[15px] font-regular text-white">Password</p>
                                                <div className="flex opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] px-[12px] mt-[7px] py-[10px]">
                                                    {/* validate: validatePassword */}
                                                    <input className=" text-[15px] placeholder:text-[#DCDCDC]  autofill:bg-[#434343] focus:outline-none focus:border-none" type={"text"} {...register("password", { required: 'Password must be at least 8 characters long', minLength: 8,  })} placeholder="Enter your password" />
                                                    {/* <Image onClick={() => setShow(!show)} className="" alt="eye" width={30} height={20} src={show ? '/img/hide.png' : '/img/eye.png'} /> */}
                                                </div>
                                                {errors.Password && <p className="mt-[10px] text-center text-[#940014]">{errors.Password.message as string}</p>}

                                            </div>
                                            <div className="my-[17px]">
                                                <p className="px-[12px] text-[15px] font-regular text-white">Repeat password</p>
                                                <div className="flex opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] px-[12px] mt-[7px] py-[10px]">
                                                    {/* validate: validatePassword */}
                                                    <input className=" text-[15px] placeholder:text-[#DCDCDC]  autofill:bg-[#434343] focus:outline-none focus:border-none" type={"text"} {...register("repeatPassword", { required: 'Password must be at least 8 characters long', minLength: 8,  })} placeholder="Repeat your password" />
                                                    {/* <Image onClick={() => setShowRepeat(!showRepeat)} className="mr-[30px] sm:mr-[0px]" alt="eye" width={30} height={20} src={showRepeat ? '/img/hide.png' : '/img/eye.png'} /> */}
                                                </div>
                                                {errors.Password && <p className="mt-[10px] text-center text-[#940014]">{errors.Password.message as string}</p>}

                                            </div>
                                            <div className="">
                                                <button className="rounded-[15px] cursor-pointer text-[15px] font-black px-[90px] w-[100%] py-[10px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">Add user</button>
                                            </div>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </TableBody>
                    </Table>
                </div>
        </>
    )
}

export default ComponentInner;