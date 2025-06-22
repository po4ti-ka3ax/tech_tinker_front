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
import ShortComment from "./ShortComment";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import "@/lib/i18n";

interface CommentProps extends CommentInterface {
  onDelete?: (id: number) => void;
}

const Comment = ({ commentInfo, onDelete }: CommentProps) => {
    const { t } = useTranslation('common');
    const Cookies = require("js-cookie");
    const userId = Cookies.get("user_id")
    const [reliabilityColor, setReliabilityColor] = useState("");
    const [performanceColor, setPerformanceColor] = useState("");
    const [compatibilityColor, setCompatibilityColor] = useState("");
    const [parentComment, setParentComment] = useState<any[]>([]);
    const [nextLink, setNextLink] = useState('')
    const [open, setOpen] = useState(false)
    const [like, setLike] = useState(false)
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        mode: "onSubmit"
    });
    
    const handleDeleteChildComment = (id: number) => {
        setParentComment(prev => prev.filter((comment: any) => comment.id !== id));
    };
    
    const fetchParentComments = async () => {
        try {
            const res = await instanceAxios.get(`/comments?review_id=${commentInfo.id}`);
            if (res.status === 200) {
                setParentComment(res.data.data);
                setNextLink(res.data.links?.next || '');
            }
        } catch (err) {
            console.error("Ошибка при получении ответов:", err);
        }
    };
    
    useEffect(() => {
        fetchParentComments();
    }, []);

    useEffect(() => {
        try {
            instanceAxios.get(`/comments?review_id=${commentInfo.id}`).then((res: any) => {
                setParentComment(res.data.data)
                setNextLink(res.data?.links?.next)
            })
        } catch (err) {
            console.error(err)
        }
    }, [])

    const commentAnswerFunc = async () => {
        try {
            const res = await instanceAxios.post(`/comments`, {
                content: watch("textComment"),
                review_id: commentInfo.id,
            });

            if (res.status === 200 || res.status === 201) {
                const newComment = res.data.data;
                setParentComment(prev => [...prev, newComment]);
                reset();
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        try {
            instanceAxios.get(`/comments?parent_id=${commentInfo.review_id}`).then((res: any) => {
                if (res.status === 200) {
                    setParentComment(res.data.data)
                }
            })
        } catch (err) {
            console.error(err)
        }
    }, [commentInfo.id])

    const fetchReplies = async () => {
        try {
            const res = await instanceAxios.get(`/comments?parent_id=${commentInfo.id}`);
            if (res.status === 200) {
                setParentComment(res.data.data);
            }
        } catch (err) {
            console.error("Ошибка при загрузке ответов:", err);
        }
    };

    useEffect(() => {
        if (commentInfo?.id) {
            fetchReplies();
        }
    }, [commentInfo?.id]);

    const setLikeHandle = () => {
        try {
            instanceAxios.post(`/reviews/like/${commentInfo.id}`).then((res: any) => {
                setLike(true)
            })
        } catch (err) {
            console.error(err)
        }
    }
    
    const unsetLikeHandle = () => {
        try {
            instanceAxios.delete(`/reviews/like/${commentInfo.id}`).then((res: any) => {
                setLike(false)
            })
        } catch (err) {
            console.error(err)
        }
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

    }, [commentInfo.reliability_rating, commentInfo.performance_rating, commentInfo.compatibility_rating])
    
    return (
        <>
            <div className="flex items-start justify-between my-[30px]">
                <div className="mr-[20px] text-center w-[50px] shrink-0">
                    <Link href={`/profile/${commentInfo.user_id}`}>
                        <Avatar className="w-[50px] cursor-pointer h-[50px] mb-[10px]">
                            <AvatarImage className="object-cover" src={`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${commentInfo.user?.profile_img}`} />
                            <AvatarFallback className="text-[#000000] text-[40px] uppercase">{commentInfo.user?.username?.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <p>{commentInfo.user?.username}</p>
                </div>
                <div className="w-[100%]  rounded-[2px]">
                    <p>{commentInfo.content}</p>

                    <div className="flex gap-[20px] my-[10px]">
                        <div className="flex  bg-[#3E3E3E] p-[5px] rounded-[10px]">
                            <p>{t('reliability')}: </p>
                            <p className={`${reliabilityColor}`}>&nbsp;{commentInfo.reliability_rating}</p>
                        </div>
                        <div className="flex  bg-[#3E3E3E] p-[5px] rounded-[10px]">
                            <p>{t('performance')}: </p>
                            <p className={`${performanceColor}`}>&nbsp;{commentInfo.performance_rating}</p>
                        </div>
                        <div className="flex  bg-[#3E3E3E] p-[5px] rounded-[10px]">
                            <p>{t('compatibility')}: </p>
                            <p className={`${compatibilityColor}`}>&nbsp;{commentInfo.compatibility_rating}</p>
                        </div>
                    </div>
                    <div className="">
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <div className="flex gap-[20px]">
                                    <div className="flex gap-[10px] items-center">
                                        {like ? (
                                            <Image onClick={() => unsetLikeHandle()} src="/img/like-full.svg" width={20} height={20} alt={"like"} />
                                        ) : (
                                            <Image onClick={() => setLikeHandle()} src="/img/like-non-full.svg" width={20} height={20} alt={"like"} />
                                        )}
                                        <p>{commentInfo?.review_rating === 0 ? "" : commentInfo?.review_rating}</p>
                                    </div>
                                    <AccordionTrigger>
                                        <button className="text-[#3282C6] cursor-pointer">{t('answers')}</button>
                                    </AccordionTrigger>
                                    <button className="text-[#3282C6] cursor-pointer" onClick={() => setOpen(!open)}>{t('answer')}</button>
                                </div>
                                <div className="">
                                    {open && (
                                        <>
                                            <div className="flex">
                                                <div className="w-[100%] border-b-[2px] border-b-[#6D6C6C] pb-[10px] rounded-[2px]">
                                                    <form onSubmit={handleSubmit(commentAnswerFunc)}>
                                                        <Textarea
                                                            className="resize-none w-full bg-transparent outline-none border-none  text-white   leading-[1.5rem] text-[16px] focus-visible:ring-0 focus-visible:ring-offset-0"
                                                            placeholder={t('writeAnswer')}
                                                            rows={1}
                                                            {...register('textComment', { required: t('textRequired') })}
                                                        />
                                                        <div className="flex justify-end">
                                                            <button className="rounded-[15px] cursor-pointer text-[15px] font-black px-[20px] py-[7px] bg-[#FFCC70] text-[#1A1A1A]" type="submit">{t('send')}</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <AccordionContent>
                                    {parentComment.length >= 1 ? (
                                        <>
                                            {parentComment.map((el: any) => (
                                                <ShortComment key={el.id} commentInfo={el} onDelete={handleDeleteChildComment} />
                                            ))}
                                        </>
                                    ) : (
                                        t('noAnswers')
                                    )}
                                    {parentComment.length >= 10 && nextLink && (
                                        <>
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        const res = await instanceAxios.get(`${nextLink}`);
                                                        if (res.status === 200) {
                                                            setParentComment(prev => [...prev, ...res.data.data]);
                                                            setNextLink(res.data.links?.next || '');
                                                        }
                                                    } catch (err) {
                                                        console.error(err);
                                                    }
                                                }}
                                            >
                                                {t('showMore')}
                                            </button>
                                        </>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                <div className="">
                    {commentInfo?.user?.id == userId && (
                        <div>
                            <button
                                onClick={async () => {
                                    try {
                                        const res = await instanceAxios.delete(`/reviews/${commentInfo.id}`);
                                        if (res.status === 204 && onDelete) {
                                            onDelete(commentInfo.id);
                                        }
                                    } catch (err) {
                                        console.error("Ошибка при удалении комментария:", err);
                                    }
                                }}
                                className="cursor-pointer rounded-[15px] text-[15px] px-[20px] py-[7px] bg-[#FF5252] text-white"
                            >
                                {t('delete')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Comment;