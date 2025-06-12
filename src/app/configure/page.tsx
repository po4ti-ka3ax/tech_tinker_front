'use client'

import Image from "next/image"
import ConfigureBlock from "../components/configureBlock/ConfigureBlock"
import { Textarea } from "@/components/ui/textarea"
import ProcessorBlock from "../components/configureBlocks/ProcessorBlock"
import { usePriceStore } from "../state/usePriceStore"
import MotherboardBlock from "../components/configureBlocks/MotherboardBlock"
const Configure = () => {
    const {price, setPriceStore,totalPrice, unsetCurrentComponent, unsetPriceStore} = usePriceStore()
    
    return (
        <>
            <h1 className="text-center text-[30px] lg:text-[50px] mb-[50px]">Choose computer for yourself</h1>
            <div className="md:flex justify-around md:relative">
                <div className="text-center mb-[80px] flex flex-col items-center md:sticky md:mr-[20px] top-[20px] self-start">
                    <div className="">
                        <input type="file" id="real-input" hidden/>
                        <label htmlFor="real-input">
                            <Image alt="add photo" className="cursor-pointer w-[200px] md:w-[300px] md:h-[300px]" src={'/img/addPhoto.svg'} width={300} height={300} />
                            <p className="my-[20px] cursor-pointer">Upload photo PC</p>
                        </label>
                    </div>
                    <input type="text" placeholder="PC name" className="text-center rounded-[20px] py-[10px] px-[50px] bg-[#242424]"/>
                    <Textarea className="my-[20px] w-[80%] text-[25px] md:text-[20px] resize-none bg-[#242424] border-none" placeholder="Write description about your PC"/>
                    <p className="my-[20px]">Total price: {totalPrice}₸</p>
                    <button className="bg-[#FFCC70] py-[10px] px-[70px] text-[#1A1A1A] rounded-[10px]">Save configure</button>
                </div>
                <div className="">
                    <ProcessorBlock/>
                    <MotherboardBlock/>
                    {/* <ConfigureBlock linkName="motherboards" nameComponent="Motherboard"/> */}
                    <ConfigureBlock linkName="graphic-cards" nameComponent="Videocard"/>
                    <ConfigureBlock linkName="" nameComponent="Memory"/>
                    <ConfigureBlock linkName="" nameComponent="Hard disk"/>
                    <ConfigureBlock linkName="" nameComponent="SSD disk"/>
                    <ConfigureBlock linkName="computer-cases" nameComponent="Case"/>
                    <ConfigureBlock linkName="" nameComponent="PSU"/>
                </div>
            </div>

        </>
    )
}

export default Configure