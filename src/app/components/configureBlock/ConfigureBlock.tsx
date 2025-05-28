import { ConfigureInterface } from "@/app/interfaces/interface"
import Image from "next/image"

const ConfigureBlock = ({ nameComponent }: ConfigureInterface) => {
    return (
        <div className="flex items-center justify-between bg-[#242424] px-[35px] py-[35px] my-[20px] rounded-[10px]">
            <div className="text-center">
                <p className="text-[25px] text-[#fffffff]">{nameComponent}</p>
                <p className="text-[#626262]">Unknown</p>
            </div>
            <div className="mx-[40px]">
                <Image alt="photo" src={"/img/placeholder.png"} width={150} height={100} />
            </div>
            <div className="mr-[40px]">
                <p className="text-[25px] text-[#fffffff]">Model</p>
                <p className="text-[#626262]">Description under name</p>
            </div>
            <div className="flex flex-col">
                <button className="text-[#1A1A1A] py-[8px] px-[25px] rounded-[10px] mb-[10px] bg-[#FFCC70] cursor-pointer">Add</button>
                <button className="text-[#ffffff] py-[8px] px-[25px] rounded-[10px] bg-[#FF5252] cursor-pointer">Remove</button>
            </div>
        </div>
    )
}

export default ConfigureBlock