import Image from "next/image"
import ConfigureBlock from "../components/configureBlock/ConfigureBlock"

const Configure = () => {
    return (
        <>
            <h1 className="text-center text-[30px] lg:text-[50px] mb-[50px]">Choose computer for yourself</h1>
            <div className="flex justify-around relative">
                <div className="">
                    <ConfigureBlock nameComponent="Processor"/>
                    <ConfigureBlock nameComponent="Motherboard"/>
                    <ConfigureBlock nameComponent="Videocard"/>
                    <ConfigureBlock nameComponent="Memory"/>
                    <ConfigureBlock nameComponent="Hard disk"/>
                    <ConfigureBlock nameComponent="SSD disk"/>
                    <ConfigureBlock nameComponent="Case"/>
                    <ConfigureBlock nameComponent="PSU"/>
                </div>
                <div className="text-center sticky top-[20px] self-start">
                    <div className="">
                        <input type="file" id="real-input" hidden/>
                        <label htmlFor="real-input">
                            <Image alt="add photo" className="cursor-pointer" src={'/img/addPhoto.svg'} width={300} height={300} />
                            <p className="my-[20px] cursor-pointer">Upload photo PC</p>
                        </label>
                    </div>
                    <input type="text" placeholder="PC name" className="text-center rounded-[20px] py-[10px] px-[50px] bg-[#242424]"/>
                    <p className="my-[20px]">Total price: 9999₸</p>
                    <button className="bg-[#FFCC70] py-[10px] px-[70px] text-[#1A1A1A] rounded-[10px]">Save configure</button>
                </div>
            </div>

        </>
    )
}

export default Configure