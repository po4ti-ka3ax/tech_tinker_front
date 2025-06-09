import { LongCharacteristicInterface } from "@/app/interfaces/interface";

const LongCharacteristicComponent = ({nameComponent,brandComponent,modelComponent,price}:LongCharacteristicInterface) => {
    return (
        <>
            <div className="grid grid-cols-3 items-center w-full mt-[20px] text-white">
                <p className="text-[#FFCC70] text-[22px]">{nameComponent}:</p>
                <div className="bg-[#3E3E3E]  py-[10px] text-center rounded-[10px] px-[100px]">
                    <p className="text-[17px]">{brandComponent}</p>
                    <p className="text-[17px]">{modelComponent}</p>
                </div>
                <p className="text-[#FFCC70] text-[22px] text-right">{price}$</p>
            </div>
        </>
    )
}

export default LongCharacteristicComponent;