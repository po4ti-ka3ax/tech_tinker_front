'use client'

import { ConfigureInterface, PartInterface } from "@/app/interfaces/interface"
import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import CheckboxComponent from "../filters/CheckboxComponent"
import instanceAxios from "../axios/instanceAxios"
import { useState } from "react"

const ConfigureBlock = ({ nameComponent, linkName }: ConfigureInterface) => {

    const [components,setComponents] = useState([]);

    const Part = ({ title, componentArray, showBtn, setShowBtn }: PartInterface) => {
        
        return (
            <div>
                <h2 className="text-[25px] text-[#ffffff] mb-[15px]">{title}</h2>
                <div>
                    {componentArray.length > 3 ? (
                        <>
                            {(showBtn ? componentArray : componentArray.slice(0, 3)).map(el => (
                                <CheckboxComponent
                                    key={el.id}
                                    componentName={title}
                                    componentLabel={el.name}
                                    componentId={el.id}
                                />
                            ))}
                            <button
                                className="text-[#FFCC70] text-[20px] flex items-center justify-center"
                                onClick={() => setShowBtn(!showBtn)}
                            >
                                {showBtn ? "Show less" : "Show more"}
                                <img
                                    src="img/downBtn.svg"
                                    alt=""
                                    className={`ml-[5px] w-[12px] transform transition-transform duration-[1000] ease-in-out rotate-${showBtn ? '180' : '0'}`}
                                />
                            </button>

                        </>
                    ) : (
                        componentArray.map(el => (
                            <CheckboxComponent
                                key={el.id}
                                componentName={title}
                                componentLabel={el.name}
                                componentId={el.id}
                            />
                        ))
                    )}
                </div>
            </div>
        );
    };

    const handleComponentClick = async () => {
        try {
            await instanceAxios.get(`/${linkName}`).then(res => {
                console.log(res.data.data);
                setComponents(res.data.data)
            })
        } catch(error) {
            console.error(error)
        }

    }

    return (
        <div className="md:grid flex flex-col m-auto items-center md:grid-cols-4 max-w-[450px] md:max-w-[900px] bg-[#242424] px-[5px] py-[35px] my-[20px] rounded-[10px]">
            <div className="text-center">
                <p className="text-[25px] text-[#fffffff]">{nameComponent}</p>
                <p className="text-[#626262]">Unknown</p>
            </div>
            <div className="md:mx-[40px] my-[20px] flex justify-center">
                <Image alt="photo" src={"/img/placeholder.png"} width={150} height={100} />
            </div>
            <div className="md:mr-[40px] mb-[20px] text-center">
                <p className="text-[25px] text-[#fffffff]">Model</p>
                <p className="text-[#626262]">Description under name</p>
            </div>
            <div className="flex flex-col">
                <Dialog>
                    <DialogTrigger onClick={() => handleComponentClick()} className="text-[#1A1A1A] py-[8px] px-[25px] rounded-[10px] mb-[20px] md:mb-[10px] bg-[#FFCC70] cursor-pointer">
                        Add
                    </DialogTrigger>
                        <DialogContent id="dialog-content" className="bg-[#1A1A1A] border-none text-[#ffffff] px-0 max-w-[320px] lg:max-h-[80vh] overflow-y-auto lg:!max-w-[750px] w-full">
                            <DialogHeader className="px-[24px]"> 
                                <DialogTitle className="text-center text-[30px]">{nameComponent}</DialogTitle>
                            </DialogHeader>
                            <div className="px-[24px] py-[16px]">
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="text-[20px] text-[#FFCC70] hover:no-underline">Price</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex items-center text-center">
                                                <input className="bg-[#3E3E3E] px-[5px] py-[10px] w-[50%] rounded-[10px]" type="number" placeholder="From" />
                                                <div className="mx-[10px]">
                                                    <p className="whitespace-nowrap">Computers found with filter:</p>
                                                    <p className="text-center">0</p>
                                                </div>
                                                <input className="bg-[#3E3E3E] px-[5px] py-[10px] w-[50%] rounded-[10px]" type="number" placeholder="To" />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger className="text-[20px] text-[#FFCC70] hover:no-underline">{nameComponent}</AccordionTrigger>
                                        <AccordionContent>
                                            <h1>pupu</h1>
                                        </AccordionContent>
                                    </AccordionItem>
                                    
                                </Accordion>

                                
                            </div>
                            {/* <div className="w-full border-b  border-[#FFCC70]" /> */}
                        </DialogContent>
                    </Dialog>
                <button className="text-[#ffffff] py-[8px] px-[25px] rounded-[10px] bg-[#FF5252] cursor-pointer">Remove</button>
            </div>
        </div>
    )
}

export default ConfigureBlock