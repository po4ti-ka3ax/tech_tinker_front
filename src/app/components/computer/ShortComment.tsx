import { CommentInterface, SetColorInterface } from "@/app/interfaces/interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import instanceAxios from "../axios/instanceAxios";
import Link from "next/link";

interface ShortCommentProps extends CommentInterface {
    onDelete?: (id: number) => void;
}


const ShortComment = ({ commentInfo, onDelete }: ShortCommentProps) => {
    const Cookies = require("js-cookie")
    const userId = Cookies.get('user_id')
    const [reliabilityColor, setReliabilityColor] = useState("");
    const [performanceColor, setPerformanceColor] = useState("");
    const [compatibilityColor, setCompatibilityColor] = useState("");
    const [parentComment, setParentComment] = useState([]);
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        mode: "onSubmit"
    });

    const deleteCommentHandler = async () => {
        try {
            const res = await instanceAxios.delete(`/comments/${commentInfo.id}`);
            if (res.status === 204 && onDelete) {
                onDelete(commentInfo.id);
            }
        } catch (err) {
            console.error("Ошибка при удалении комментария", err);
        }
    };

    const [replyText, setReplyText] = useState("")
    const [replyTextId, setReplyTextId] = useState(0)
    const [commentParent, setCommentParent] = useState([]);
    useEffect(() => {
        instanceAxios.get(`/reviews?parent_id=${commentInfo.id}`).then(res => {
            setParentComment(res.data.data)
        })
    }, [])
    const commentAnswerFunc = () => {
        instanceAxios.post(`reviews`, {
            "content": replyText,
            "review_id": commentInfo.id,
            "build_id": commentInfo.build_id,
        })

        reset()
    }


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

    }, [performance])
    const renderCommentWithMentions = (text: string) => {
        const mentionRegex = /@(\w+)/g;
        const parts = text.split(mentionRegex)

        return parts.map((part, index) => {
            if (index % 2 === 1) {
                return (
                    <Link
                        key={index}
                        href={`/profile/${replyTextId}`}
                        className="text-[#3282C6] underline"
                    >
                        @{part}
                    </Link>
                )
            } else {
                return part
            }
        })
    }
    return (
        <>
            <div className="flex items-start justify-between my-[30px] px-[20px]">
                <div className="mr-[20px] text-center w-[50px] shrink-0">
                    <div className="">
                        <div className="">
                            <Link href={`/profile/${commentInfo.user?.id}`}>
                                <Avatar className="w-[50px] cursor-pointer h-[50px] mb-[10px]">
                                    <AvatarImage className="object-cover" src={`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${commentInfo.user?.profile_img}`} />
                                    <AvatarFallback className="text-[#000000] text-[40px] uppercase">{commentInfo.user?.username?.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                            </Link>
                            <p>{commentInfo.user?.username}</p>

                        </div>
                    </div>

                </div>
                <div className="w-[100%]  rounded-[2px]">
                    <p>{renderCommentWithMentions(commentInfo.content)}</p>
                    {/* <div className="w-full border-b border-[#6D6C6C] my-4" /> */}

                    {/* <div className="flex gap-[20px] my-[10px]">
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
                    </div> */}
                    <div className="">
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <div className="flex gap-[20px]">
                                    <AccordionTrigger>
                                        <button className="text-[#3282C6] cursor-pointer">Answers</button>
                                    </AccordionTrigger>
                                    <button className="text-[#3282C6] cursor-pointer" onClick={() => {
                                        setReplyTextId(commentInfo.user?.id)
                                        setReplyText(`@${commentInfo.user?.username} `);
                                        setOpen(!open)
                                    }}>Answer</button>
                                </div>
                                <div className="">
                                    {
                                        open ? (
                                            <>
                                                <div className="flex">
                                                    <div className="w-[100%] border-b-[2px] border-b-[#6D6C6C] pb-[10px] rounded-[2px]">
                                                        <form onSubmit={handleSubmit(commentAnswerFunc)}>
                                                            <Textarea
                                                                value={replyText}
                                                                className="resize-none w-full bg-transparent outline-none border-none  text-white   leading-[1.5rem] text-[16px] focus-visible:ring-0 focus-visible:ring-offset-0"
                                                                placeholder="Write your answer"
                                                                rows={1}
                                                                onChange={e => setReplyText(e.target.value)}
                                                            // {...register('textComment', { required: "text is required" })}
                                                            />
                                                            <div className="flex justify-end">
                                                                <button className="rounded-[15px] cursor-pointer text-[15px] font-black px-[20px] py-[7px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">send</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </>
                                        ) : ""
                                    }
                                </div>
                                <AccordionContent>
                                    {
                                        commentParent.length >= 1 ? (
                                            <>
                                                {
                                                    commentParent.map(el => (
                                                        <>
                                                            <ShortComment commentInfo={el} />
                                                        </>
                                                    ))
                                                }
                                            </>
                                        ) : "Don't have answer on this comment, you can become first"
                                    }

                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>


                </div>
                {commentInfo?.user?.id == userId ? (
                    <div>
                        <button
                            onClick={deleteCommentHandler}
                            className="cursor-pointer rounded-[15px] text-[15px] px-[20px] py-[7px] bg-[#FF5252] text-white"
                        >
                            delete
                        </button>
                    </div>
                ) : null}


            </div>
        </>
    )
}

export default ShortComment;