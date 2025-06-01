'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { FiltersProps, PartInterface } from '../../interfaces/interface'
import { useState } from "react"
import CheckboxComponent from "./CheckboxComponent"
import { useFilterStore } from "@/app/state/useFilterStore" 



const FilterComponent = ({ componentName, NameModel, NameVendor, ProcessorSocket, VideoMemoryType, VideoMemoryVolume }: FiltersProps) => {
    const [showMoreSockets, setShowMoreSockets] = useState(false);
    const [showMoreModel, setShowMoreModel] = useState(false);
    const [showMoreMemoryType, setShowMoreMemoryType] = useState(false);
    const [showMoreMemoryVolume, setShowMoreMemoryVolume] = useState(false);

   
    

    // const useStore = create((set) => {
    //     processorVendor:{},
    //     updateVendor: (newVendor) => set({vendor: newVendor})

    // })

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


    return (
        <>
            <div className="px-[24px] py-[16px]">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-[20px] text-[#FFCC70] hover:no-underline">{componentName}</AccordionTrigger>
                        <AccordionContent>
                            {/* grid grid-rows-2 grid-cols-2 */}
                            <div className="flex wrap flex-col gap-[10px]  bg-[#3C3C3C] rounded-[10px] px-[30px] py-[30px]">
                                <div className="">
                                    {componentName === "Processor" ? <h2 className="text-[25px] text-[#ffffff] mb-[15px]">Processor vendor:</h2> : <h2 className="text-[25px] text-[#ffffff] mb-[15px]">Videocard vendor:</h2>}
                                    {
                                        NameVendor.map(el => (
                                            <>
                                    
                                                <CheckboxComponent componentLabel={el.name} componentName={el.name} componentId={el.id} />
                                            </>
                                        ))
                                    }
                                </div>
                                {
                                    ProcessorSocket && (
                                        <Part
                                            title="Processor socket:"
                                            componentArray={ProcessorSocket}
                                            showBtn={showMoreSockets}
                                            setShowBtn={setShowMoreSockets}
                                        />
                                    )
                                }
                                <div className="">
                                    <Part
                                        title={componentName === "Processor" ? "Processor model" : "Videocard model"}
                                        componentArray={NameModel}
                                        setShowBtn={setShowMoreModel}
                                        showBtn={showMoreModel}
                                    />
                                </div>
                                {
                                    VideoMemoryType && (
                                        <Part
                                            title="Type video memory"
                                            componentArray={VideoMemoryType}
                                            setShowBtn={setShowMoreMemoryType}
                                            showBtn={showMoreMemoryType}
                                        />
                                    )
                                }
                                {
                                    VideoMemoryVolume && (
                                        <Part
                                            title="Volume video memory"
                                            componentArray={VideoMemoryVolume}
                                            setShowBtn={setShowMoreMemoryVolume}
                                            showBtn={showMoreMemoryVolume}
                                        />
                                    )
                                }
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                
            </div>
            <div className="w-full border-b  border-[#FFCC70]" />

        </>
    )
}

export default FilterComponent;
