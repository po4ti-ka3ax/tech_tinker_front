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


const userPage = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
            mode: "onSubmit"
        });

    const onSubmitEdit = async () => {
        const changes = {};

        instanceAxios.post(`/users/${currentUser?.id}`,{

        })
    } 
    useEffect(() => {
        try {
            instanceAxios.get('users').then(res => {
                setUsers(res.data.data)
            })
        } catch (err) {
            console.error(err)
        }
    }, [])
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

                                        <Dialog>
                                            <DialogTrigger className="cursor-pointer bg-[#FFCC70] text-[18px] text-black px-[4px] py-[4px] rounded-[5px]" onClick={() => setCurrentUser(el)}>Edit</DialogTrigger>
                                            <DialogContent className="bg-[#242424] text-white border-0">
                                                <DialogHeader>
                                                    <DialogTitle>Edit profile</DialogTitle>
                                                </DialogHeader>

                                                <form action="">

                                                </form>
                                            </DialogContent>
                                        </Dialog>

                                    </TableCell>
                                    <TableCell>

                                        <Dialog>
                                            <DialogTrigger className="cursor-pointer bg-[#FF5252] text-[18px] text-white px-[4px] py-[4px] rounded-[5px]" onClick={() => setCurrentUser(el)}>Delete</DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Delete profile</DialogTitle>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>

                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>

        </>
    )
}

export default userPage;