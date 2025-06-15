'use client'
import FilterComponent from "../components/filters/FilterComponent"

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
import { useEffect, useState } from "react"
import { useFilterStore } from '../state/useFilterStore'
import ComputerCard from "../components/ComputerCard/ComputerCard"
import instanceAxios from "../components/axios/instanceAxios"

const Content = () => {
    const [pc, setPC] = useState([]);
    const ProcessorSocket = [
        { id: 1, name: "LGA1151" },
        { id: 2, name: "LGA1200" },
        { id: 3, name: "AM4" },
        { id: 4, name: "LGA1700" },
        { id: 5, name: "AM5" },
        { id: 6, name: "TR4" },
        { id: 7, name: "sTRX4" },
        { id: 8, name: "SP3" }
    ];
    const NameModel = [
        { id: 1, name: "Intel Core i5-10400F" },
        { id: 2, name: "Intel Core i7-11700K" },
        { id: 3, name: "Intel Core i9-13900K" },
        { id: 4, name: "AMD Ryzen 5 5600X" },
        { id: 5, name: "AMD Ryzen 7 5800X" },
        { id: 6, name: "AMD Ryzen 9 7950X" },
        { id: 7, name: "Intel Core i3-12100" },
        { id: 8, name: "AMD Ryzen 3 4100" }
    ];
    const NameVendor = [
        { id: 1, name: "Intel" },
        { id: 2, name: "AMD" },
    ];

    const VideoCardModels = [
        { id: 1, name: "NVIDIA GeForce RTX 3060" },
        { id: 2, name: "NVIDIA GeForce RTX 3080" },
        { id: 3, name: "NVIDIA GeForce GTX 1660 Super" },
        { id: 4, name: "AMD Radeon RX 6600 XT" },
        { id: 5, name: "AMD Radeon RX 6700 XT" },
        { id: 6, name: "AMD Radeon RX 7900 XTX" },
        { id: 7, name: "NVIDIA GeForce RTX 4060 Ti" },
        { id: 8, name: "AMD Radeon RX 7600" },
    ];

    const VideoMemoryTypes = [
        { id: 1, name: "GDDR5" },
        { id: 2, name: "GDDR6" },
        { id: 3, name: "GDDR6X" },
        { id: 4, name: "HBM2" },
    ];

    const VideoVendors = [
        { id: 1, name: "NVIDIA" },
        { id: 2, name: "AMD" },
    ];

    const VideoMemoryVolumes = [
        { id: 1, name: "4 GB" },
        { id: 2, name: "6 GB" },
        { id: 3, name: "8 GB" },
        { id: 4, name: "10 GB" },
        { id: 5, name: "12 GB" },
        { id: 6, name: "16 GB" },
        { id: 7, name: "24 GB" },
    ];
    const [open, setOpen] = useState(false);

    useEffect(() => {
        try {
            instanceAxios.get('/builds').then(res => setPC(res.data.data))
        } catch(err) {
            console.error(err)
        }
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [open])
    const { clearAllFilters } = useFilterStore();

    return (
        <>
            <div className="">

                <h1 className="text-center text-[30px] lg:text-[50px] mb-[50px]">Choose computer for yourself</h1>
                <div className="flex justify-center">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger className="bg-[#2D2D2D] rounded-[10px] py-[10px] px-[20px] hover:bg-[#262626] duration-200 ease-in-out">
                            Filters
                        </DialogTrigger>

                        <DialogContent id="dialog-content" className="bg-[#1A1A1A] border-none text-[#ffffff] px-0 max-w-[320px] lg:max-h-[80vh] overflow-y-auto lg:!max-w-[750px] w-full">
                            <DialogHeader className="px-[24px]">
                                <DialogTitle className="text-center text-[30px]">Filters</DialogTitle>
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
                                </Accordion>
                            </div>
                            <div className="w-full border-b  border-[#FFCC70]" />
                            <FilterComponent componentName={"Processor"} NameVendor={NameVendor} NameModel={NameModel} ProcessorSocket={ProcessorSocket} />
                            <FilterComponent componentName={"Videocard"} NameVendor={VideoVendors} NameModel={VideoCardModels} VideoMemoryType={VideoMemoryTypes} VideoMemoryVolume={VideoMemoryVolumes} />
                            <div className="text-center ">
                                <button onClick={clearAllFilters} className="text-[#000000] bg-[#FFCC70] px-[5px] py-[10px] rounded-[10px] text-[20px]">Reset filters</button>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <input type="text" className="mx-[20px] bg-[#2D2D2D] pl-[20px] px-[200px] rounded-[10px]" placeholder="Search" />
                    <button className="px-[20px]  py-[10px] bg-[#FFCC70] text-black cursor-pointer rounded-[10px]" >Search</button>
                </div>
                <div className=" flex wrap ">
                    {
                        pc.map(el => (
                            <>
                                <ComputerCard computer={el}/>
                            </>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Content