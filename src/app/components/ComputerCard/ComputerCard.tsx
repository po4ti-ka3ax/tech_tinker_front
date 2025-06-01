import { ComputerCardInterface } from "@/app/interfaces/interface";
import Image from "next/image";

const ComputerCard = ({computerId}:ComputerCardInterface) => {
    return (
        <>
            <div className="bg-[#2D2D2D] opacity-95 rounded-[10px]  mt-[20px] relative">
                <div className="">
                    <Image src="/img/pc2.png" width={200} height={200} alt="pc-photo"/>    
                </div>

                    <div className="w-full border-t  border-[#6D6C6C]" />
                <div className="mb-[70px] px-[20px] py-[10px]">
                    <p className="mb-[15px]">Game Monster</p>
                    <p>February 13, 2024</p>
                </div>
                <div className="absolute bottom-[10px] right-[10px]">
                    <div className="rounded-[50%] bg-[#1A1A1A] px-[10px] py-[10px]">
                        <Image src="/img/arrow.svg" width={20} height={20} alt="go to PC"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComputerCard;