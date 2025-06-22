"use client";

import { CommentInterface, SetColorInterface } from "@/app/interfaces/interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import instanceAxios from "../axios/instanceAxios";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import "@/lib/i18n";

interface ShortCommentProps extends CommentInterface {
  onDelete?: (id: number) => void;
}

const ShortComment = ({ commentInfo, onDelete }: ShortCommentProps) => {
  const { t } = useTranslation('common');
  const Cookies = require("js-cookie");
  const userId = Cookies.get("user_id");
    
  const [reliabilityColor, setReliabilityColor] = useState("");
  const [performanceColor, setPerformanceColor] = useState("");
  const [compatibilityColor, setCompatibilityColor] = useState("");
  const [commentParent, setCommentParent] = useState([]);
  const [open, setOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyTextId, setReplyTextId] = useState(0);

  const { handleSubmit, reset } = useForm({ mode: "onSubmit" });
const fetchReplies = async () => {

    try {
      const res = await instanceAxios.get(`/comments?parent_id=${commentInfo.id}`);
      if (res.status === 200) {
        setCommentParent(res.data.data); 
    console.log("Fetched replies for", commentInfo.id, res.data.data);

      }
    } catch (err) {
      console.error("Ошибка при загрузке ответов:", err);
    }
  };
useEffect(() => {
  const fetchReplies = async () => {
    try {
      const res = await instanceAxios.get(`/comments?parent_id=${commentInfo.id}`);
      if (res.status === 200) {
        setCommentParent(res.data.data); // перезапись — всегда чистый fetch
      }
    } catch (err) {
      console.error("Ошибка при загрузке ответов:", err);
    }
  };

  if (commentInfo?.id) {
    fetchReplies();
  }
}, [commentInfo.id]); // ← один useEffect — этого достаточно




  const commentAnswerFunc = async () => {
    try {
      const res = await instanceAxios.post(`/comments`, {
        content: replyText,
        review_id: commentInfo.review?.id,
        parent_id: commentInfo.id,
      });

      if (res.status === 200 || res.status === 201) {
        await fetchReplies(); // подгружаем всё заново
        setReplyText("");
        setOpen(false);
        }

    } catch (err) {
      console.error("Ошибка при отправке ответа:", err);
    }
  };

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

  useEffect(() => {
    const setColor = ({ setterColor, param }: SetColorInterface) => {
      if (param >= 7) setterColor("text-white");
      else if (param <= 4.9) setterColor("text-[#FF5252]");
      else setterColor("text-[#FFCC70]");
    };

    setColor({ setterColor: setReliabilityColor, param: commentInfo.reliability_rating });
    setColor({ setterColor: setPerformanceColor, param: commentInfo.performance_rating });
    setColor({ setterColor: setCompatibilityColor, param: commentInfo.compatibility_rating });
  }, []);

  const renderCommentWithMentions = (text: string) => {
    const mentionRegex = /@(\w+)/g;
    const parts = text.split(mentionRegex);
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
        );
      }
      return part;
    });
  };

  return (
    <div className="flex items-start justify-between my-[30px] px-[20px]">
      <div className="mr-[20px] text-center w-[50px] shrink-0">
        <Link href={`/profile/${commentInfo.user?.id}`}>
          <Avatar className="w-[50px] cursor-pointer h-[50px] mb-[10px]">
            <AvatarImage
              className="object-cover"
              src={`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${commentInfo.user?.profile_img}`}
            />
            <AvatarFallback className="text-[#000000] text-[40px] uppercase">
              {commentInfo.user?.username?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Link>
        <p>{commentInfo.user?.username}</p>
      </div>

      <div className="w-full rounded-[2px]">
        <p>{renderCommentWithMentions(commentInfo.content)}</p>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <div className="flex gap-[20px]">
              <button
                className="text-[#3282C6] cursor-pointer"
                onClick={() => {
                  setReplyTextId(commentInfo.user_id);
                  setReplyText(`@${commentInfo.user?.username} `);
                  setOpen(!open);
                }}
              >
                {t('answer')}
              </button>
            </div>

            {open && (
              <div className="flex mt-3">
                <div className="w-full border-b-[2px] border-b-[#6D6C6C] pb-[10px] rounded-[2px]">
                  <form onSubmit={handleSubmit(commentAnswerFunc)}>
                    <Textarea
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      className="resize-none w-full bg-transparent outline-none border-none text-white text-[16px] focus-visible:ring-0"
                      placeholder={t('writeAnswer')}
                      rows={1}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        className="rounded-[15px] cursor-pointer text-[15px] font-black px-[20px] py-[7px] bg-[#FFCC70] text-[#1A1A1A]"
                      >
                        {t('send')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <AccordionContent>
              {commentParent.length > 0 ? (
                commentParent.map((el: any) => (
                  <ShortComment key={el.id} commentInfo={el} onDelete={deleteCommentHandler} />
                ))
              ) : (
                <p className="mt-2">{t('noAnswers')}</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {commentInfo?.user?.id == userId && (
        <div>
          <button
            onClick={deleteCommentHandler}
            className="cursor-pointer rounded-[15px] text-[15px] px-[20px] py-[7px] bg-[#FF5252] text-white"
          >
            {t('delete')}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShortComment;
