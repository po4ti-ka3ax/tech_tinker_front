'use client'

import LongCharacteristicComponent from "@/app/components/computer/LongCharacteristicComponent"
import ShortCharacteristic from "@/app/components/computer/ShortCharacteristic"
import useUserData from "@/app/state/useDataStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import Comment from "@/app/components/computer/Comment";
import { SetColorInterface } from "@/app/interfaces/interface";
import { useParams } from 'next/navigation'
import instanceAxios from "@/app/components/axios/instanceAxios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { BadgeInfo } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface UserData {
    id?: number;
    username?: string;
    role_id?: number;
    profile_img?: string;
}

interface PC {
    id?: number;
    title?: string;
    description?: string;
    total_price?: number;
    link_img?: string;
    user_id?: number;
    user?: {
        id?: number;
        username?: string;
        profile_img?: string;
    };
    processor?: any;
    motherboard?: any;
    graphic_cards?: any[];
    systemMemories?: any[];
    storages?: any[];
    power?: any;
    computer_case?: any;
    average_rating?: number;
}

const Computer = () => {
    const { t } = useTranslation('common');
    
    const Cookies = require('js-cookie');
    const userId = Cookies.get('user_id')
    const userRole = Cookies.get('user_role')
    const [userData, setUserData] = useState<UserData>({})
    const [image, setImage] = useState('');
    const [pc, setPc] = useState<PC>({})
    const [comments, setComments] = useState([])
    const params = useParams();
    const id = params.id;
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        mode: "onSubmit"
    });

    useEffect(() => {
        try {
            instanceAxios.get(`/users/${userId}`).then((res: any) => {
                if (res.status === 200) {
                    setUserData(res.data.data)
                }
            })
        } catch (err) {
            console.error(err)
        }
    }, [])
    
    const loadMoreHandle = () => {
        // Implementation for loading more comments
    }
    
    const [favorite, setFavorite] = useState(false)
    
    useEffect(() => {
        if (!pc?.id) return;
        try {
            instanceAxios.get(`/builds/favorites/list`).then((res: any) => {
                const favor = res.data.data;
                const isFavorite = favor.some((el: any) => el.id == pc.id);
                setFavorite(isFavorite);
            })
        } catch (err) {
            console.error(err)
        }
    }, [pc.id])
    
    const handleDeleteComment = (id: number) => {
        setComments(prev => prev.filter((c: any) => c.id !== id));
    };

    const saveFavorite = () => {
        try {
            instanceAxios.post(`/builds/favorites/${pc.id}`).then((res: any) => {
                if (res.status === 200) {
                    setFavorite(true)
                }
            })
        } catch (err) {
            console.error(err)
        }
    }
    
    const unsaveFavorite = () => {
        try {
            instanceAxios.delete(`/builds/favorites/${pc.id}`).then((res: any) => {
                if (res.status === 204) {
                    setFavorite(false)
                }
            })
        } catch (err) {
            console.error(err)
        }
    }

    const commentFunc = async (data: any) => {
        try {
            const res = await instanceAxios.post(`/reviews`, {
                content: data.textComment,
                build_id: id,
                reliability_rating: data.reliability,
                performance_rating: data.performance,
                compatibility_rating: data.compatibility,
            });

            if (res.status === 201) {
                const updated = await instanceAxios.get(`/reviews?build_id=${id}`);
                setComments(updated.data.data);
                reset();
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        try {
            instanceAxios.get(`/reviews?build_id=${id}`).then((res: any) => {
                setComments(res.data.data)
            })
        } catch (err) {
            console.error(err)
        }
    }, [pc])

    useEffect(() => {
        try {
            instanceAxios.get(`/builds/${id}`).then((res: any) => {
                setTotalGrade(res.data.data.average_rating)
                setPc(res.data.data)
            })
        } catch (err) {
            console.error(err)
        }
    }, [])
    
    const router = useRouter();

    const [reliability, setReliability] = useState(8);
    const [performance, setPerformance] = useState(5);
    const [compatibility, setCompatibility] = useState(0);
    const [totalGrade, setTotalGrade] = useState(0)
    const [reliabilityColor, setReliabilityColor] = useState("");
    const [performanceColor, setPerformanceColor] = useState("");
    const [compatibilityColor, setCompatibilityColor] = useState("");
    const [totalGradeColor, setTotalGradeColor] = useState("");
    const [open, setOpen] = useState(false)
    
    useEffect(() => {
        if (userData) {
            setImage(`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${userData?.profile_img}`)
        }

        const setColor = ({ setterColor, param }: SetColorInterface) => {
            if (param >= 7) {
                setterColor("text-white")
            }
            if (param <= 6.8) {
                setterColor("text-[#FFCC70]")
            }
            if (param <= 4.9) {
                setterColor("text-[#FF5252]")
            }
        }

        setColor({ setterColor: setReliabilityColor, param: reliability });
        setColor({ setterColor: setPerformanceColor, param: performance });
        setColor({ setterColor: setCompatibilityColor, param: compatibility });
        setColor({ setterColor: setTotalGradeColor, param: totalGrade });

    }, [userData, reliability, performance, compatibility, totalGrade])
    
    const handleDelete = (id: any) => {
        try {
            instanceAxios.delete(`/builds/${id}`).then((res: any) => {
                if (res.status === 204) {
                    router.push(`/content`);
                }
            });
        } catch (err) {
            console.error(err)
        }
    }
    
    return (
        <>
            <div className="">
                <div className="flex justify-around">
                    <div className="">
                        <div className="bg-[#2D2D2D] relative p-[10px] rounded-[10px] mb-[40px]">
                            <Image className="rounded-[10px] object-cover w-[400px] h-[600px]" src={`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${pc?.link_img}`} width={400} height={600} alt="Photo PC" />
                            <div className="bg-[#2D2D2D] opacity-[60%] py-[20px] absolute left-[10px] bottom-0 w-[96%] ">
                                <p className="text-[25px] text-center">{t("pcName")}: {pc.title}</p>
                            </div>
                        </div>
                        <div className="bg-[#2D2D2D] text-center m-auto w-[300px] p-[20px] rounded-[10px]">
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="flex mb-[10px] items-center justify-center gap-[10px]">
                                        <p className="text-[23px] ">{t('grades')}</p>
                                        <BadgeInfo />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className="text-[18px]">
                                    <p className="text-center">{t("colorGrades")}:</p>
                                    <br />
                                    <div className="flex">
                                        <p>{t('gradeMoreEqual7')} </p>
                                        <p className="text-white">&nbsp;{t('white')}</p>
                                    </div>
                                    <div className="flex">
                                        <p>{t('gradeLessEqual68')} </p>
                                        <p className="text-[#FFCC70]">&nbsp;{t('orange')}</p>
                                    </div>
                                    <div className="flex">
                                        <p>{t('gradeLessEqual49')} </p>
                                        <p className="text-[#FF5252]">&nbsp;{t('red')}</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                            <div className={`flex justify-around items-center px-[30px] my-[10px] bg-[#3E3E3E] p-[5px] rounded-[10px]`}>
                                <p className="text-[25px]">{t('totalGrade')}:</p>
                                <p className={`text-[20px] ${totalGradeColor}`}>{totalGrade}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#2D2D2D] w-[400px] py-[30px] flex flex-col items-center rounded-[10px]">
                        <p className="text-[25px]">{pc.title}</p>
                        <div className="w-full border-b  border-[#FFCC70]" />
                        <div className="py-[20px] px-[20px]">
                            <ShortCharacteristic nameComponent={t('CPU')} brandComponent={pc.processor?.brand?.title} modelComponent={pc.processor?.processor_model} />
                            {pc.graphic_cards?.map((el: any, index: number) => (
                                <ShortCharacteristic key={index} nameComponent={t('GPU')} brandComponent={el.brand?.title} modelComponent={el.gpu_model} />
                            ))}
                            <ShortCharacteristic nameComponent={t('Motherboard')} brandComponent={pc.motherboard?.brand?.title} modelComponent={pc.motherboard?.motherboard_model} />
                            {pc.systemMemories?.map((el: any, index: number) => (
                                <ShortCharacteristic key={index} nameComponent={t('RAM')} brandComponent={el?.brand?.title} modelComponent={el?.memory_model} />
                            ))}
                        </div>
                        <div className="">
                            <p className="text-[#DCDCDC] text-[25px]">{t('price')}: {pc.total_price}$</p>
                        </div>
                        {favorite ? (
                            <div className=" mt-[15px]">
                                <button onClick={() => {
                                    unsaveFavorite()
                                }} className="bg-[#FF5252] w-[100%] text-[25px] py-[7px] px-[70px] rounded-[20px] cursor-pointer">{t('deleteInFavorite')}</button>
                            </div>
                        ) : (
                            <div className=" mt-[15px]">
                                <button onClick={() => {
                                    saveFavorite()
                                }} className="bg-[#1A1A1A] w-[100%] text-[25px] py-[7px] px-[70px] rounded-[20px] cursor-pointer">{t('saveInFavorite')}</button>
                            </div>
                        )}
                        <div className="w-full border-b my-[40px] border-[#FFCC70]" />

                        <div className=" mt-[10px] ">
                            <Link href={`/profile/${pc.user?.id}`}>
                                <p className="text-center text-[20px]">{t('author')}:</p>
                                <div className="flex justify-center gap-[10px] items-center bg-[#3E3E3E] py-[10px] px-[20px] rounded-[10px]">
                                    <div className="">
                                        <Avatar className="w-[60px] cursor-pointer h-[60px]">
                                            <AvatarImage className="object-cover" src={`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}/${pc.user?.profile_img}`} />
                                            <AvatarFallback className="text-[#000000] text-[40px] uppercase">{pc.user?.username?.slice(0, 2)}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="">
                                        <p className="text-[20px]">{pc.user?.username}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bg-[#2D2D2D] w-[85%] m-auto py-[5px] mt-[30px] rounded-[10px]">
                    <p className="text-[30px] text-center">{t('description')}</p>
                    <div className="w-full border-b  border-[#FFCC70]" />
                    <div className="px-[20px] my-[10px] mb-[70px]">
                        <p className="text-[22px] ">
                            {pc.description}
                        </p>
                    </div>
                </div>

                <div className="bg-[#2D2D2D] w-[85%] m-auto py-[5px] mt-[30px] rounded-[10px]">
                    <p className="text-[30px] text-center text-white">{t('components')}</p>
                    <div className="w-full border-b border-[#FFCC70] my-2" />
                    <div className="px-[20px] py-[20px]">
                        <div className="grid grid-cols-3 w-full  text-white">
                            <p className="text-[22px]">{t('listComponents')}:</p>
                            <p className="text-[22px] text-center">{t('modelComponents')}:</p>
                            <p className="text-[22px] text-right">{t('price')}:</p>
                        </div>
                        <LongCharacteristicComponent nameComponent={t('Processor')} brandComponent={pc.processor?.brand?.title} modelComponent={pc.processor?.processor_model} price={pc.processor?.price} />
                        {pc.graphic_cards?.map((el: any, index: number) => (
                            <LongCharacteristicComponent key={index} nameComponent={t('Videocard')} brandComponent={el.brand?.title} modelComponent={el.gpu_model} price={el.price} />
                        ))}
                        <LongCharacteristicComponent nameComponent={t('Motherboard')} brandComponent={pc.motherboard?.brand?.title} modelComponent={pc.motherboard?.motherboard_model} price={pc.motherboard?.price} />
                        {pc?.systemMemories?.map((el: any, index: number) => (
                            <LongCharacteristicComponent key={index} nameComponent={t('RAM')} brandComponent={el.brand?.title} modelComponent={el.memory_model} price={el.price} />
                        ))}
                        {pc?.storages?.map((el: any, index: number) => (
                            <LongCharacteristicComponent key={index} nameComponent={t('Storage')} brandComponent={el.brand?.title} modelComponent={el.storage_model} price={el.price} />
                        ))}
                        <LongCharacteristicComponent nameComponent={t('Power supply unit')} brandComponent={pc.power?.brand?.title} modelComponent={pc.power?.power_model} price={pc.power?.price} />
                        <LongCharacteristicComponent nameComponent={t('Case')} brandComponent={pc.computer_case?.brand?.title} modelComponent={pc.computer_case?.case_model} price={pc.computer_case?.price} />
                        <p className="text-center mt-[50px] text-[25px]">{t('total')}: {pc.total_price}₸</p>
                    </div>
                </div>

                <div className="bg-[#2D2D2D] w-[85%] m-auto py-[5px] mt-[30px] rounded-[10px]">
                    <p className="text-[30px] text-center text-white">{t('comments')}</p>
                    <div className="w-full border-b border-[#FFCC70] my-2" />
                    <div className="p-[20px]">
                        <div className="flex items-center">
                            <div className="mr-[20px]">
                                <Avatar className="w-[60px] cursor-pointer h-[60px] mb-[10px]">
                                    <AvatarImage className="object-cover" src={image} />
                                    <AvatarFallback className="text-[#000000] text-[40px] uppercase">{userData.username?.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="w-[100%] border-b-[2px] border-b-[#6D6C6C] pb-[10px] rounded-[2px]">
                                <form onSubmit={handleSubmit(commentFunc)}>
                                    <Textarea
                                        className="resize-none w-full bg-transparent outline-none border-none  text-white px-4 py-2 leading-[1.5rem] text-[16px] focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder={t('writeComment')}
                                        rows={1}
                                        {...register('textComment', { required: t('textRequired') })}
                                    />
                                    <div className="flex justify-between">
                                        <div className="flex  gap-[5px] px-4">
                                            <input aria-invalid={errors.reliability ? "true" : "false"} {...register("reliability", { required: t('isRequired'), min: 0, max: 10 })} className="inline bg-[#3E3E3E] p-[5px] rounded-[10px]" type="number" placeholder={t('reliability')} />
                                            <input aria-invalid={errors.performance ? "true" : "false"} {...register("performance", { required: t('isRequired'), min: 0, max: 10 })} className="inline bg-[#3E3E3E] p-[5px] rounded-[10px]" type="number" placeholder={t('performance')} />
                                            <input aria-invalid={errors.compatibility ? "true" : "false"} {...register("compatibility", { required: t('isRequired'), min: 0, max: 10 })} className="inline bg-[#3E3E3E] p-[5px] rounded-[10px]" type="number" placeholder={t('compatibility')} />
                                        </div>
                                        <div className="flex-end">
                                            <button className="rounded-[15px] cursor-pointer text-[15px] font-black px-[20px] py-[7px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">{t('send')}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="ml-[30px]">
                            {comments.length >= 1 && comments.map((el: any, index: number) => (
                                <Comment key={index} commentInfo={el} onDelete={handleDeleteComment}/>
                            ))}
                            {comments.length >= 10 && (
                                <div className="flex justify-center mr-[35px]">
                                    <button onClick={() => loadMoreHandle()} className="rounded-[15px] cursor-pointer text-[15px] font-black px-[20px] py-[7px] bg-[#FFCC70] text-[#1A1A1A] cursor-pointer">{t('loadMore')}</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {(pc?.user_id == userId) || (userRole == 2) ? (
                    <div className="text-center mt-[30px]">
                        <button className="text-center cursor-pointer text-[#C82323] border-[#C82323] hover:bg-[#C82323] hover:text-[#ffffff] duration-300 border-1 rounded-[10px] px-[10px] py-[10px]" onClick={() => handleDelete(id)}>{t('deletePC')}</button>
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default Computer