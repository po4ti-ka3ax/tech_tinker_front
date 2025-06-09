import { ShortCharacteristicInterface } from "@/app/interfaces/interface";

const ShortCharacteristic = ({ nameComponent, brandComponent ,modelComponent}: ShortCharacteristicInterface) => {
    return (
        <>
            <div className="text-center mb-[10px]">
                <p className="text-[#FFCC70] text-[23px]">{nameComponent}</p>
                <div className="bg-[#3E3E3E] py-[10px] rounded-[10px] px-[70px] w-[100%]">
                    <p className="text-[17px]">{brandComponent}</p>
                    <p className="text-[17px]">{modelComponent}</p>
                </div>
            </div>
        </>
    )
}

export default ShortCharacteristic;