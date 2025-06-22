import { ComputerCardInterface } from "@/app/interfaces/interface";
import Image from "next/image";
import Link from "next/link";

const ComputerCard = ({ computer }: ComputerCardInterface) => {
    return (
        <>

            <div className="bg-[#2D2D2D] opacity-95 rounded-[15px] mx-[20px] mt-[20px] relative">
                <Link href={`/computer/${computer?.id}`}>
                    <div className="">
                        <div className="p-[10px]">
                            <Image className="object-cover w-[250px] h-[200px] rounded-[10px] w-[250px] h-[200px]" src={`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${computer?.link_img}`} width={200} height={200} alt="pc-photo" />
                        </div>

                        <div className="w-full border-t  border-[#6D6C6C]" />
                        <div className="mb-[40px] px-[20px] py-[10px]">
                            <p className="mb-[15px] text-[20px]">{computer.title}</p>
                            <p className="text-[#B3B3B3] text-[14px]">Author: {computer.user.username}</p>
                            <p className="mb-[15px] text-[16px]">Price: {computer.total_price}$</p>

                        </div>
                        <div className="absolute bottom-[10px] right-[10px]">
                            <div className="rounded-[50%] bg-[#1A1A1A] px-[10px] py-[10px]">
                                <Image src="/img/arrow.svg" width={20} height={20} alt="go to PC" />
                            </div>
                        </div>
                    </div>
                </Link>

            </div>
        </>
    )
}

export default ComputerCard;