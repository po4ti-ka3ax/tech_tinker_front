import { CommentInterface } from "@/app/interfaces/interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Comment = ({ userData, image, commentText }: CommentInterface) => {
    return (
        <>
            <div className="flex items-center my-[30px]">
                <div className="mr-[20px] text-center">
                    <Avatar className="w-[50px] cursor-pointer h-[50px] mb-[10px]">
                        <AvatarImage className="object-cover" src={image} />
                        <AvatarFallback className="text-[#000000] text-[40px] uppercase">{userData.username?.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <p>{userData.username}</p>
                </div>
                <div className="w-[100%]  rounded-[2px]">
                    <p>{commentText}</p>
                    <button className="text-[#3282C6] cursor-pointer">Answer</button>
                </div>
            </div>
        </>
    )
}

export default Comment;