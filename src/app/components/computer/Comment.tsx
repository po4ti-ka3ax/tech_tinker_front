import { CommentInterface, SetColorInterface } from "@/app/interfaces/interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";


const Comment = ({ commentInfo }: CommentInterface) => {
    const [reliabilityColor, setReliabilityColor] = useState("");
    const [performanceColor, setPerformanceColor] = useState("");
    const [compatibilityColor, setCompatibilityColor] = useState("");
    useEffect(() => {


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

        setColor({ setterColor: setReliabilityColor, param: commentInfo.reliability_rating });
        setColor({ setterColor: setPerformanceColor, param: commentInfo.performance_rating });
        setColor({ setterColor: setCompatibilityColor, param: commentInfo.compatibility_rating });

    }, [ performance])
    return (
        <>
            <div className="flex items-center my-[30px]">
                <div className="mr-[20px] text-center">
                    <Avatar className="w-[50px] cursor-pointer h-[50px] mb-[10px]">
                        <AvatarImage className="object-cover" src={`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${commentInfo.user?.profile_img}`} />
                        <AvatarFallback className="text-[#000000] text-[40px] uppercase">{commentInfo.user?.username?.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <p>{commentInfo.user?.username}</p>
                </div>
                <div className="w-[100%]  rounded-[2px]">
                    <p>{commentInfo.content}</p>
                    <div className="w-full border-b border-[#6D6C6C] my-4" />

                    <div className="flex gap-[20px] my-[10px]">
                        <div className="flex  bg-[#3E3E3E] p-[5px] rounded-[10px]">
                            <p>Reliability: </p>
                            <p className={`${reliabilityColor}`}>&nbsp;{commentInfo.reliability_rating}</p>
                        </div>
                        <div className="flex  bg-[#3E3E3E] p-[5px] rounded-[10px]">
                            <p>Performance: </p>
                            <p className={`${performanceColor}`}>&nbsp;{commentInfo.performance_rating}</p>
                        </div>
                        <div className="flex  bg-[#3E3E3E] p-[5px] rounded-[10px]">
                            <p>Compatibility: </p>
                            <p className={`${compatibilityColor}`}>&nbsp;{commentInfo.compatibility_rating}</p>
                        </div>
                    </div>
                    <button className="text-[#3282C6] cursor-pointer">Answer</button>
                </div>
            </div>
        </>
    )
}

export default Comment;