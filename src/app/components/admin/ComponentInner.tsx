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

const ComponentInner = ({ componentKeys, componentValues, name, editOpen, setEditOpen, deleteOpen, setDeleteOpen, addOpen, setAddOpen }: ComponentInnerInterface) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: "onSubmit"
    });
    console.log(componentKeys)

    // componentKeys.forEach((key,index) => {
    //     console.log(componentValues[index])
    // })
    const onSubmitEdit = () => {

    }

    componentValues.map(item => {
        componentKeys.forEach(key => {
            const value = item[key]
            console.log(`${key}:`, value)
        })
    })
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
                            componentValues?.map((item, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {
                                        componentKeys?.map((key, colIndex) => {
                                            const value = item[key];
                                            const displayValue = typeof value === "object" && value !== null
                                                ? JSON.stringify(value) : value;
                                            return (
                                                <TableCell key={colIndex} className="text-white">
                                                    {displayValue}
                                                </TableCell>
                                            )
                                        })
                                    }
                                    <TableCell>
                                        <Dialog open={editOpen} onOpenChange={setEditOpen}>
                                            <DialogTrigger className="cursor-pointer bg-[#FFCC70] text-[18px] text-black px-[4px] py-[4px] rounded-[5px]">Edit</DialogTrigger>
                                            <DialogContent className="bg-[#242424] text-white border-0 ">
                                                <DialogHeader>
                                                    <DialogTitle>Edit {name}</DialogTitle>
                                                </DialogHeader>
                                                <div className="max-h-[700px] overflow-y-auto">
                                                    <form onSubmit={onSubmitEdit}>

                                                        {
                                                            componentKeys?.map((key, colIndex) => {
                                                                const value = item[key];
                                                                const displayValue = typeof value === "object" && value !== null
                                                                    ? JSON.stringify(value) : value;
                                                                return (
                                                                    <div className="mt-[20px]">
                                                                        <p className="px-[12px] text-[15px] font-regular text-white">{key}</p>
                                                                        <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name={key} type="text" placeholder={key} defaultValue={displayValue} />
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                        {/* <div className="mt-[20px]">
                                                        <p className="px-[12px] text-[15px] font-regular text-white">Role id</p>
                                                        <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="role_id" type="text" placeholder="User role Id" />
                                                    </div> */}
                                                        <button className="rounded-[15px] mt-[20px] cursor-pointer text-[15px] font-black px-[90px] w-[100%] py-[10px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">Edit {name}</button>
                                                    </form>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        <div >
                            <Dialog open={addOpen} onOpenChange={setAddOpen}>
                                <DialogTrigger className="mt-[30px] cursor-pointer bg-[#FFCC70] text-[18px] text-black px-[4px] py-[4px] rounded-[5px]">Add {name}</DialogTrigger>
                                <DialogContent className="bg-[#242424] text-white border-0">
                                    <DialogHeader>
                                        <DialogTitle>Add {name}</DialogTitle>
                                    </DialogHeader>
                                    {/* onSubmit={handleSubmit(onSubmit)} */}
                                        <form autoComplete="off" className="space-y-[20px] max-h-[70vh] overflow-y-auto px-4 py-4">
                                            {componentKeys?.map((key, index) => (
                                                <div key={index} className="mt-[20px]">
                                                    <p className="px-[12px] text-[15px] font-regular text-white">{key}</p>
                                                    <input
                                                        name={key}
                                                        placeholder={key}
                                                        type="text"
                                                        className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-full bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none"
                                                    />
                                                </div>
                                            ))}

                                            <div className="pt-4">
                                                <button
                                                    type="submit"
                                                    className="rounded-[15px] cursor-pointer text-[15px] font-black px-[90px] w-full py-[10px] bg-[#FFCC70] text-[#1A1A1A]"
                                                >
                                                    Add
                                                </button>
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