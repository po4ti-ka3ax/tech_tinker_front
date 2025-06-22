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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form";
// import Image from "next/image";

const ProcessorPage = () => {
    const [processor, setProcessor] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [keys, setKeys] = useState([]);
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [addOpen, setAddOpen] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: "onSubmit"
    });

    const onSubmitDelete = (id: number) => {
        try {
            setDeleteOpen(!deleteOpen)
            instanceAxios.delete(`/processors/${id}`)
        } catch (err) {
            console.error(err)
        }
    }

    const onSubmit = () => {
        const payload = Object.fromEntries(
            keys.map(key => [key, watch(key)])
        );

        instanceAxios.post('/processors', payload)
            .then(() => {
                setAddOpen(!addOpen);
            });
    };



    const onSubmitEdit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const changes = {
            // id: formData.get('id'),
            // username: formData.get('username'),
            // email: formData.get('email'),
            // profile_img: formData.get('profile_img'),
            role_id: formData.get('role_id'),
        }
        // console.log(changes)
        try {
            if (changes?.role_id === 2) {
                instanceAxios.post(`/users/${currentUser?.id}`, {
                    changes
                })
            }
        } catch (err) {
            console.error(err)
        }
    }
    // const validatePassword = () => {
    //     if (watch("password").length < 8) {
    //         return 'Password must be at least 8 characters long'
    //     }
    // }
    useEffect(() => {
        try {
            instanceAxios.get('/processors').then(res => {
                setProcessor(res.data.data)
                setKeys(Object.keys(res.data.data[0]));

            })
        } catch (err) {
            console.error(err)
        }
    }, [editOpen, deleteOpen, addOpen])
    return (
        <>
            <div className="">

                <div className="relative bg-[#2D2D2D] rounded-[10px]  px-[20px] py-[20px]">
                    <Table>
                        <TableCaption>Processors lists</TableCaption>
                        <TableHeader>
                            <TableRow >
                                <TableHead className="text-white">Id:</TableHead>
                                <TableHead className="text-white">Processor model:</TableHead>
                                <TableHead className="text-white">Category id:</TableHead>
                                <TableHead className="text-white">Brand id:</TableHead>
                                <TableHead className="text-white">Price:</TableHead>
                                <TableHead className="text-white">Link image:</TableHead>
                                <TableHead className="text-white">Frequency:</TableHead>
                                <TableHead className="text-white">Power wattage:</TableHead>
                                <TableHead className="text-white">Category:</TableHead>
                                <TableHead className="text-white">Brand:</TableHead>
                                <TableHead className="text-white">Socket:</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                processor?.map(el => (
                                    <TableRow key={el.id}>
                                        <TableCell>{el.id}</TableCell>
                                        <TableCell>{el.processor_model}</TableCell>
                                        <TableCell>{el.category_id}</TableCell>
                                        <TableCell>{el.brand_id}</TableCell>
                                        <TableCell>{el.price}</TableCell>
                                        <TableCell>{el.link_img}</TableCell>
                                        <TableCell>{el.frequency}</TableCell>
                                        <TableCell>{el.power_wattage}</TableCell>
                                        <TableCell>{el.category.title}</TableCell>
                                        <TableCell>{el.brand.title}</TableCell>
                                        <TableCell>{typeof el.socket === "object" && el.socket !== null
                                            ? JSON.stringify(el.socket) : el.socket}</TableCell>
                                        <TableCell>

                                            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                                                <DialogTrigger className="cursor-pointer bg-[#FFCC70] text-[18px] text-black px-[4px] py-[4px] rounded-[5px] " onClick={() => setCurrentUser(el)}>Edit</DialogTrigger>
                                                <DialogContent className="bg-[#242424] text-white border-0">
                                                    <DialogHeader>
                                                        <DialogTitle>Edit</DialogTitle>
                                                    </DialogHeader>

                                                    <div className="">
                                                        <form className="max-h-[70vh] overflow-y-auto" onSubmit={onSubmitEdit}>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">Processor id</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="processor_id" type="text" placeholder="Processor Id" defaultValue={el.id || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">Processor model</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="processor_model" type="text" placeholder="Processor model" defaultValue={el.processor_model || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">Category id</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="category_id" type="text" placeholder="Category id" defaultValue={el.category_id || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">Brand id</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="brand_id" type="text" placeholder="Processor brand" defaultValue={el.brand_id || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">Price</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="price" type="text" placeholder="Processor price" defaultValue={el.price || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">Link image</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="link_img" type="text" placeholder="Processor image" defaultValue={el.link_img || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">Frequency</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="frequency" type="text" placeholder="Processor frequency" defaultValue={el.frequency || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">Power wattage</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="power_wattage" type="text" placeholder="Processor power wattage" defaultValue={el.power_wattage || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">Category</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="category" type="text" placeholder="Category" defaultValue={el.category.titl || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">Brand</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="brand" type="text" placeholder="Processor brand" defaultValue={el.brand.title || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">Power wattage</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="power_wattage" type="text" placeholder="Processor power wattage" defaultValue={typeof el.socket === "object" && el.socket !== null
                                                                    ? JSON.stringify(el.socket) : el.socket} />
                                                            </div>
                                                            <button className="rounded-[15px] mt-[20px] cursor-pointer text-[15px] font-black px-[90px] w-[100%] py-[10px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">Edit user</button>

                                                        </form>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                        </TableCell>
                                        <TableCell>

                                            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                                                <DialogTrigger className="cursor-pointer bg-[#FF5252] text-[18px] text-white px-[4px] py-[4px] rounded-[5px]">Delete</DialogTrigger>
                                                <DialogContent className="bg-[#242424] text-white border-0">
                                                    <DialogHeader>
                                                        <DialogTitle>Delete profile</DialogTitle>
                                                    </DialogHeader>
                                                    <p>You want delete this user ?</p>
                                                    <button onClick={() => onSubmitDelete(el.id)} className="cursor-pointer bg-[#FF5252] duration-300 hover:bg-[#C03838] text-[18px] text-white px-[4px] py-[4px] rounded-[5px]">Delete user - {el.username}</button>
                                                </DialogContent>
                                            </Dialog>

                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                            <div className="overflow-y-auto">
                                <Dialog open={addOpen} onOpenChange={setAddOpen}>
                                    <DialogTrigger className="mt-[30px] cursor-pointer bg-[#FFCC70] text-[18px] text-black px-[4px] py-[4px] rounded-[5px]">Add processor</DialogTrigger>
                                    <DialogContent className="bg-[#242424] text-white border-0 ">
                                        <DialogHeader>
                                            <DialogTitle>Add processor</DialogTitle>
                                        </DialogHeader>
                                        <form className="max-h-[70vh] overflow-y-auto" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                                            {
                                                keys?.map(el => (
                                                    <div key={el.id} className="mt-[20px]">
                                                        <p className="px-[12px] text-[15px] font-regular text-white">{el}</p>
                                                        <input
                                                            className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none"
                                                            type="text"
                                                            {...register(el, )}
                                                            // { required: `${el} is required` }
                                                            placeholder={`Enter your ${el}`}
                                                        />
                                                        {errors.el && <p className="text-[#FF5252]">{errors.el.message}</p>}
                                                    </div>
                                                ))
                                            }

                                            <div className="mt-[20px]">
                                                <button className="rounded-[15px] cursor-pointer text-[15px] font-black px-[90px] w-[100%] py-[10px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">Add processor</button>
                                            </div>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </TableBody>
                    </Table>
                </div>
            </div>

        </>
    )
}

export default ProcessorPage;