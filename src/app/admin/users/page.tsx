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
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form";
// import Image from "next/image";

const userPage = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [addOpen, setAddOpen] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: "onSubmit"
    });

    const onSubmitDelete = (id: number) => {
        try {
            setDeleteOpen(!deleteOpen)
            instanceAxios.delete(`/users/${id}`)
        } catch (err) {
            console.error(err)
        }
    }
    const onSubmit = data => instanceAxios.post('/register', {
        "username": watch('username'),
        "email": watch('email'),
        "password": watch('password'),
        "password_confirmation": watch('repeatPassword'),
    }).then(res => {
        setAddOpen(!addOpen)
        // console.log()
    });
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
    const validatePassword = () => {
        if (watch("password").length < 8) {
            return 'Password must be at least 8 characters long'
        }
    }
    useEffect(() => {
        try {
            instanceAxios.get('/users').then(res => {
                setUsers(res.data.data)
            })

            instanceAxios.get('/processors').then(res => {
                console.log(Object.keys(res.data.data[0]))
            })
        } catch (err) {
            console.error(err)
        }
    }, [editOpen, deleteOpen, addOpen])
    return (
        <>
            <div className="m-auto">

                <div className=" bg-[#2D2D2D] rounded-[10px] px-[20px] py-[20px]">
                    <Table>
                        <TableCaption>Users lists</TableCaption>
                        <TableHeader>
                            <TableRow >
                                <TableHead className="text-white">Id:</TableHead>
                                <TableHead className="text-white">Username:</TableHead>
                                <TableHead className="text-white">Email:</TableHead>
                                <TableHead className="text-white">Profile image:</TableHead>
                                <TableHead className="text-white">Role id:</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                users?.map(el => (
                                    <TableRow>
                                        <TableCell>{el.id}</TableCell>
                                        <TableCell>{el.username}</TableCell>
                                        <TableCell>{el.email}</TableCell>
                                        <TableCell>{el.profile_img ? el.profile_img : <p className="text-[#626262]">Not set</p>}</TableCell>
                                        <TableCell>{el.role_id}</TableCell>
                                        <TableCell>

                                            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                                                <DialogTrigger className="cursor-pointer bg-[#FFCC70] text-[18px] text-black px-[4px] py-[4px] rounded-[5px]" onClick={() => setCurrentUser(el)}>Edit</DialogTrigger>
                                                <DialogContent className="bg-[#242424] text-white border-0">
                                                    <DialogHeader>
                                                        <DialogTitle>Edit profile</DialogTitle>
                                                    </DialogHeader>

                                                    <form onSubmit={onSubmitEdit}>
                                                        {/* <div className="mt-[20px]">
                                                            <p className="px-[12px] text-[15px] font-regular text-white">Id</p>
                                                            <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="id" type="text" placeholder="User Id" defaultValue={el.id || ''} />
                                                        </div>
                                                        <div className="mt-[20px]">
                                                            <p className="px-[12px] text-[15px] font-regular text-white">Username</p>
                                                            <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="username" type="text" placeholder="Username" defaultValue={el.username || ''} />
                                                        </div>
                                                        <div className="mt-[20px]">
                                                            <p className="px-[12px] text-[15px] font-regular text-white">Email</p>
                                                            <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="email" type="email" placeholder="User email" defaultValue={el.email || ''} />
                                                        </div>
                                                        <div className="mt-[20px]">
                                                            <p className="px-[12px] text-[15px] font-regular text-white">Profile image</p>
                                                            <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="profile_img" type="file" placeholder="User image" />
                                                        </div> */}
                                                        <div className="mt-[20px]">
                                                            <p className="px-[12px] text-[15px] font-regular text-white">Role id</p>
                                                            <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="role_id" type="text" placeholder="User role Id" defaultValue={el.role_id || ''} />
                                                        </div>
                                                        <button className="rounded-[15px] mt-[20px] cursor-pointer text-[15px] font-black px-[90px] w-[100%] py-[10px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">Edit user</button>

                                                    </form>
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
                            <div >
                                <Dialog open={addOpen} onOpenChange={setAddOpen}>
                                    <DialogTrigger className="mt-[30px] cursor-pointer bg-[#FFCC70] text-[18px] text-black px-[4px] py-[4px] rounded-[5px]">Add user</DialogTrigger>
                                    <DialogContent className="bg-[#242424] text-white border-0">
                                        <DialogHeader>
                                            <DialogTitle>Add user</DialogTitle>
                                        </DialogHeader>
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
                                                {errors.username && <p className="text-[#FF5252]">{errors.username.message}</p>}
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
                                                {errors.email && <p className="text-[#FF5252]">{errors.email.message}</p>}
                                            </div>
                                            <div className="my-[17px]">
                                                <p className="px-[12px] text-[15px] font-regular text-white">Password</p>
                                                <div className="flex opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] px-[12px] mt-[7px] py-[10px]">
                                                    <input className=" text-[15px] placeholder:text-[#DCDCDC]  autofill:bg-[#434343] focus:outline-none focus:border-none" type={"text"} {...register("password", { required: 'Password must be at least 8 characters long', minLength: 8, validate: validatePassword })} placeholder="Enter your password" />
                                                    {/* <Image onClick={() => setShow(!show)} className="" alt="eye" width={30} height={20} src={show ? '/img/hide.png' : '/img/eye.png'} /> */}
                                                </div>
                                                {errors.Password && <p className="mt-[10px] text-center text-[#940014]">{errors.Password.message as string}</p>}

                                            </div>
                                            <div className="my-[17px]">
                                                <p className="px-[12px] text-[15px] font-regular text-white">Repeat password</p>
                                                <div className="flex opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] px-[12px] mt-[7px] py-[10px]">
                                                    <input className=" text-[15px] placeholder:text-[#DCDCDC]  autofill:bg-[#434343] focus:outline-none focus:border-none" type={"text"} {...register("repeatPassword", { required: 'Password must be at least 8 characters long', minLength: 8, validate: validatePassword })} placeholder="Repeat your password" />
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
            </div>

        </>
    )
}

export default userPage;