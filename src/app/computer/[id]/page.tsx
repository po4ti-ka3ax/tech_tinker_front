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

const Computer = () => {
    const Cookies = require('js-cookie');
    const userId = Cookies.get('user_id')
    const userRole = Cookies.get('user_role')
    const { setUserData, userData } = useUserData();
    const [image, setImage] = useState('');
    const [pc, setPc] = useState({})
    const [comments, setComments] = useState([])
    const params = useParams();
    const id = params.id;
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        mode: "onSubmit"
    });

    const commentFunc = async (data) => {
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
            instanceAxios.get(`/reviews?build_id=${id}`).then(res => {
                setComments(res.data.data)
            })
        } catch (err) {
            console.error(err)
        }
    }, [pc])
    useEffect(() => {
        try {
            instanceAxios.get(`/builds/${id}`).then(res => {
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
    const [reliabilityColor, setReliabilityColor] = useState("");
    const [performanceColor, setPerformanceColor] = useState("");
    const [compatibilityColor, setCompatibilityColor] = useState("");
    // console.log(`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${userData?.profile_img}`)

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

    }, [userData, reliability, performance, compatibility])
    console.log(userData.id)
    console.log(userId)
    const handleDelete = (id) => {
        try {
            instanceAxios.delete(`/builds/${id}`).then(res => {
                if (res.status === 204) {
                    router.push(`/content`);
                }
            });

        } catch (err) {
            console.error(err)
        }
    }
    const text = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a computer. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a computer.";
    return (
        <>
            <div className="">

                <div className="flex justify-around">
                    <div className="">
                        <div className="bg-[#2D2D2D] relative p-[10px] rounded-[10px] mb-[40px]">
                            <Image className="rounded-[10px]" src={`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${pc?.link_img}`} width={400} height={400} alt="Photo PC" />
                            <div className="bg-[#2D2D2D] opacity-[60%] py-[20px] absolute left-[10px] bottom-0 w-[96%] ">
                                <p className="text-[25px] text-center">PC name: {pc.title}</p>
                            </div>
                        </div>
                        <div className="bg-[#2D2D2D] text-center m-auto w-[300px] p-[20px] rounded-[10px]">
                            <p className="text-[23px] mb-[10px]">Grades</p>
                            <div className={`flex justify-between px-[30px]  bg-[#3E3E3E] p-[5px] rounded-[10px]`}>
                                <p className="text-[19px]">Reliability:</p>
                                <p className={`text-[17px] ${reliabilityColor}`}>{reliability}</p>
                            </div>
                            <div className="flex  justify-between px-[30px]  my-[10px] bg-[#3E3E3E] p-[5px] rounded-[10px]">
                                <p className=" text-[19px]">Performance:</p>
                                <p className={`text-[17px] ${performanceColor}`}>{performance}</p>
                            </div>
                            <div className="flex justify-between px-[30px]  bg-[#3E3E3E] p-[5px] rounded-[10px]">
                                <p className=" text-[19px]">Compatibility:</p>
                                <p className={`text-[17px] ${compatibilityColor}`}>{compatibility}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#2D2D2D] w-[400px] py-[30px] flex flex-col items-center rounded-[10px]">
                        <p className="text-[25px]">{pc.title}</p>
                        <div className="w-full border-b  border-[#FFCC70]" />
                        <div className="py-[20px] px-[20px]">
                            <ShortCharacteristic nameComponent="CPU" brandComponent={pc.processor?.brand?.title} modelComponent={pc.processor?.processor_model} />
                            {
                                pc.graphic_cards?.map(el => (
                                    <>
                                        <ShortCharacteristic nameComponent="GPU" brandComponent={el.brand?.title} modelComponent={el.gpu_model} />
                                    </>
                                ))
                            }
                            <ShortCharacteristic nameComponent="Motherboard" brandComponent={pc.motherboard?.brand?.title} modelComponent="Z170 pro" />
                            <ShortCharacteristic nameComponent="RAM" brandComponent={pc?.systemMemories?.brand?.title} modelComponent="TridentZ 32GB" />
                        </div>
                        <div className="">
                            <p className="text-[#DCDCDC] text-[25px]">Price: {pc.total_price}$</p>
                        </div>
                        <div className=" mt-[15px]">
                            <button className="bg-[#1A1A1A] w-[100%] text-[25px] py-[7px] px-[70px] rounded-[20px] cursor-pointer">Save Configure</button>
                        </div>
                    </div>
                </div>
                <div className="bg-[#2D2D2D] w-[85%] m-auto py-[5px] mt-[30px] rounded-[10px]">
                    <p className="text-[30px] text-center">Description</p>
                    <div className="w-full border-b  border-[#FFCC70]" />
                    <div className="px-[20px] my-[10px] mb-[70px]">
                        <p className="text-[22px] ">
                            {pc.description}
                        </p>
                    </div>
                </div>

                <div className="bg-[#2D2D2D] w-[85%] m-auto py-[5px] mt-[30px] rounded-[10px]">
                    <p className="text-[30px] text-center text-white">Components</p>

                    <div className="w-full border-b border-[#FFCC70] my-2" />

                    <div className="px-[20px] py-[20px]">
                        <div className="grid grid-cols-3 w-full  text-white">
                            <p className="text-[22px]">List components:</p>
                            <p className="text-[22px] text-center">Model components:</p>
                            <p className="text-[22px] text-right">Price:</p>
                        </div>
                        <LongCharacteristicComponent nameComponent="Processor" brandComponent={pc.processor?.brand?.title} modelComponent={pc.processor?.processor_model} price={pc.processor?.price} />
                        {
                            pc.graphic_cards?.map(el => (
                                <>
                                    <LongCharacteristicComponent nameComponent="Videocard" brandComponent={el.brand?.title} modelComponent={el.gpu_model} price={el.price} />
                                </>
                            ))
                        }
                        <LongCharacteristicComponent nameComponent="Motherboard" brandComponent={pc.motherboard?.brand?.title} modelComponent={pc.motherboard?.motherboard_model} price={pc.motherboard?.price} />

                        {
                            pc?.systemMemories?.map(el => (
                                <>
                                    <LongCharacteristicComponent nameComponent="RAM" brandComponent={el.brand?.title} modelComponent={el.memory_model} price={el.price} />
                                </>
                            ))
                        }
                        {
                            pc?.storages?.map(el => (
                                <>
                                    <LongCharacteristicComponent nameComponent="Storage" brandComponent={el.brand?.title} modelComponent={el.storage_model} price={el.price} />
                                </>
                            ))
                        }

                        <LongCharacteristicComponent nameComponent="Power supply unit" brandComponent={pc.power?.brand?.title} modelComponent={pc.power?.power_model} price={pc.power?.price} />
                        <LongCharacteristicComponent nameComponent="Case" brandComponent={pc.computer_case?.brand?.title} modelComponent={pc.computer_case?.case_model} price={pc.computer_case?.price} />

                        <p className="text-center mt-[50px] text-[25px]">Total: {pc.total_price}₸</p>
                    </div>
                </div>

                <div className="bg-[#2D2D2D] w-[85%] m-auto py-[5px] mt-[30px] rounded-[10px]">
                    <p className="text-[30px] text-center text-white">Comments</p>

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
                                        placeholder="Write your comment"
                                        rows={1}
                                        {...register('textComment', { required: "text is required" })}
                                    />
                                    <div className="flex justify-between">
                                        <div className="flex  gap-[5px] px-4">
                                            <input aria-invalid={errors.reliability ? "true" : "false"} {...register("reliability", { required: "is required",min:0, max:10 })} className="inline bg-[#3E3E3E] p-[5px] rounded-[10px]" type="number" placeholder="Reliability" />
                                                
                                            <input aria-invalid={errors.performance ? "true" : "false"} {...register("performance", { required: "is required",min:0, max:10 })} className="inline bg-[#3E3E3E] p-[5px] rounded-[10px]" type="number" placeholder="Performance" />

                                            <input aria-invalid={errors.compatibility ? "true" : "false"} {...register("compatibility", { required: "is required",min:0, max:10 })} className="inline bg-[#3E3E3E] p-[5px] rounded-[10px]" type="number" placeholder="Compatibility" />
                                        
                                        </div>

                                        <div className="flex-end">
                                            <button className="rounded-[15px] cursor-pointer text-[15px] font-black px-[20px] py-[7px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">send</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="ml-[30px]">
                            {
                                comments.map(el => (
                                    <>
                                        <Comment commentInfo={el} />
                                    </>
                                ))
                            }
                        </div>

                    </div>

                </div>
                {
                    pc?.user_id == userId || userRole === 2 ? (
                        <>
                            <div className="text-center mt-[30px]">
                                <button className="text-center cursor-pointer text-[#C82323] border-[#C82323] hover:bg-[#C82323] hover:text-[#ffffff] duration-300 border-1 rounded-[10px] px-[10px] py-[10px]" onClick={() => handleDelete(id)}>Delete pc</button>
                            </div>
                        </>
                    ) : ""
                }
            </div>
        </>
    )
}

export default Computer