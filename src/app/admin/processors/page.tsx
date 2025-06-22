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
import { useTranslation } from 'react-i18next';
import "@/lib/i18n";
// import Image from "next/image";

const ProcessorPage = () => {
    const { t } = useTranslation('common');
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
                        <TableCaption>{t('Processors lists')}</TableCaption>
                        <TableHeader>
                            <TableRow >
                                <TableHead className="text-white">{t('Id:')}</TableHead>
                                <TableHead className="text-white">{t('Processor model:')}</TableHead>
                                <TableHead className="text-white">{t('Category id:')}</TableHead>
                                <TableHead className="text-white">{t('Brand id:')}</TableHead>
                                <TableHead className="text-white">{t('Price:')}</TableHead>
                                <TableHead className="text-white">{t('Link image:')}</TableHead>
                                <TableHead className="text-white">{t('Frequency:')}</TableHead>
                                <TableHead className="text-white">{t('Power wattage:')}</TableHead>
                                <TableHead className="text-white">{t('Category:')}</TableHead>
                                <TableHead className="text-white">{t('Brand:')}</TableHead>
                                <TableHead className="text-white">{t('Socket:')}</TableHead>
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
                                                <DialogTrigger className="cursor-pointer bg-[#FFCC70] text-[18px] text-black px-[4px] py-[4px] rounded-[5px] " onClick={() => setCurrentUser(el)}>{t('Edit')}</DialogTrigger>
                                                <DialogContent className="bg-[#242424] text-white border-0">
                                                    <DialogHeader>
                                                        <DialogTitle>{t('Edit')}</DialogTitle>
                                                    </DialogHeader>

                                                    <div className="">
                                                        <form className="max-h-[70vh] overflow-y-auto" onSubmit={onSubmitEdit}>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">{t('Processor Id')}</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="processor_id" type="text" placeholder={t('Processor Id')} defaultValue={el.id || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">{t('Processor model')}</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="processor_model" type="text" placeholder={t('Processor model')} defaultValue={el.processor_model || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">{t('Category id')}</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="category_id" type="text" placeholder={t('Category id')} defaultValue={el.category_id || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">{t('Processor brand')}</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="brand_id" type="text" placeholder={t('Processor brand')} defaultValue={el.brand_id || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">{t('price')}</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="price" type="text" placeholder={t('Processor price')} defaultValue={el.price || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">{t('Processor image')}</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="link_img" type="text" placeholder={t('Processor image')} defaultValue={el.link_img || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">{t('frequency')}</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="frequency" type="text" placeholder={t('Processor frequency')} defaultValue={el.frequency || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">{t('Processor power wattage')}</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="power_wattage" type="text" placeholder={t('Processor power wattage')} defaultValue={el.power_wattage || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">{t('Category')}</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="category" type="text" placeholder={t('Category')} defaultValue={el.category.titl || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">{t('brand')}</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="brand" type="text" placeholder={t('Processor brand')} defaultValue={el.brand.title || ''} />
                                                            </div>
                                                            <div className="mt-[20px]">
                                                                <p className="px-[12px] text-[15px] font-regular text-white">{t('Processor power wattage')}</p>
                                                                <input className="px-[12px] mt-[7px] py-[10px] text-[15px] placeholder:text-[#DCDCDC] opacity-[100%] w-[100%] bg-[#434343] rounded-[10px] autofill:bg-[#434343] focus:outline-none focus:border-none" name="power_wattage" type="text" placeholder={t('Processor power wattage')} defaultValue={typeof el.socket === "object" && el.socket !== null
                                                                    ? JSON.stringify(el.socket) : el.socket} />
                                                            </div>
                                                            <button className="rounded-[15px] mt-[20px] cursor-pointer text-[15px] font-black px-[90px] w-[100%] py-[10px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">{t('Edit user')}</button>

                                                        </form>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                        </TableCell>
                                        <TableCell>

                                            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                                                <DialogTrigger className="cursor-pointer bg-[#FF5252] text-[18px] text-white px-[4px] py-[4px] rounded-[5px]">{t('delete')}</DialogTrigger>
                                                <DialogContent className="bg-[#242424] text-white border-0">
                                                    <DialogHeader>
                                                        <DialogTitle>{t('Delete profile')}</DialogTitle>
                                                    </DialogHeader>
                                                    <p>{t('You want delete this user ?')}</p>
                                                    <button onClick={() => onSubmitDelete(el.id)} className="cursor-pointer bg-[#FF5252] duration-300 hover:bg-[#C03838] text-[18px] text-white px-[4px] py-[4px] rounded-[5px]">{t('Delete user -')} {el.processor_model}</button>
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