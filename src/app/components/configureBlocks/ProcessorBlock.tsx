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
import { useEffect, useState } from "react"
import { filterConfig } from "@/app/config/filterConfig"
import { useFilterStore } from "@/app/state/useFilterStore"
import { useConfigureStore } from "@/app/state/useConfigureStore"
import { usePriceStore } from "@/app/state/usePriceStore"

const ProcessorBlock = () => {
    const { selectedFilters, setFilterValue, clearAllFilters } = useFilterStore();
    const { configureStore, setConfigureStore, deleteConfigureObject } = useConfigureStore();
    const { price, setPriceStore, totalPrice, unsetCurrentComponent, unsetPriceStore, recalculateTotal } = usePriceStore()
    const [components, setComponents] = useState([]);
    const [open, setOpen] = useState(false)
    const [filters, setFilters] = useState({});
    const Cookies = require('js-cookie')
    const token = Cookies.get('access_token')
    const [currentComponent, setCurrentComponent] = useState({})
    const [remove, setRemove] = useState(false);
    console.log('before:', configureStore);
    // const updateFilter = (name, value) => {
    //     setFilters(prev => ({ ...prev, [name]: value }));
    // };

    const handleRangeChange = (name: string, key: 'from' | 'to', value: number | null) => {
        const current = selectedFilters[name] || {};
        setFilterValue(name, { ...current, [key]: value });
    };

    const deleteComponent = (key) => {
        unsetCurrentComponent(key)
        recalculateTotal()
        setCurrentComponent({})
        deleteConfigureObject(key)
    };
    const hasMotherboard = configureStore.motherboard
    const socket = configureStore?.motherboard?.socket?.id
    useEffect(() => {
        console.log(configureStore)
    }, [hasMotherboard])

    useEffect(() => {
        try {
            instanceAxios.get(`/memory-generations`).then(res => {
                if (filterConfig['processors'][2].options && filterConfig['processors'][2].options.length === 0) {
                    res.data.data.forEach(el => {
                        filterConfig['processors'][2].options?.push({ value: el.id, label: el.title })
                    });
                }
                // filterConfig['processors'][2].options?.push(res.data.data)
                // console.log(filterConfig['processors'][2].options)
            })
            instanceAxios.get(`/sockets`).then(res => {
                if (filterConfig['processors'][1].options && filterConfig['processors'][1].options.length === 0) {
                    res.data.data.forEach(el => {
                        filterConfig['processors'][1].options?.push({ value: el.id, label: el.model })
                    });
                }
                // filterConfig['processors'][2].options?.push(res.data.data)
                console.log(filterConfig['processors'][1].options)
            })
        } catch (error) {
            console.error(error)
        }
    }, [])

    const buildQuery = () => {
        const params = new URLSearchParams()
        Object.entries(selectedFilters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v) => params.append(key, v))
            } else if (typeof value === "object" && value !== null) {
                if (key === "price") {
                    if (value.from !== undefined && value.from !== null) {
                        if (value.from) params.append(`${key}_min`, Number(value.from).toFixed(2))
                    }
                    if (value.to !== undefined && value.to !== null) {
                        if (value.to) params.append(`${key}_max`, Number(value.to).toFixed(2))
                    }
                } else {
                    if (value.from !== undefined && value.from !== null) {
                        if (value.from) params.append(`${key}_min`, value.from)
                    }
                    if (value.to !== undefined && value.to !== null) {
                        if (value.to) params.append(`${key}_max`, value.to)
                    }
                }

            } else if (value !== undefined && value !== "") {
                params.append(key, value)
            }
        })

        const query = params.toString()
        return query ? `?${query}` : ""
    }


    const onApplyFilters = async () => {
        const query = buildQuery();
        const response = await instanceAxios.get(`/processors?${query}`);
        // console.log(selectedFilters)
        setComponents(response.data.data);
    };




    const handleComponentClick = async () => {
        try {
            if (hasMotherboard) {
                await instanceAxios.get(`/processors${hasMotherboard ? `?socket_id=${socket}` : ""}`).then(res => {
                    setComponents(res.data.data)
                })
            } else {
                await instanceAxios.get(`/processors`).then(res => {
                    setComponents(res.data.data)
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleRemove = async () => {
        try {
            clearAllFilters()
            setRemove(!remove)
            if (hasMotherboard) {
                await instanceAxios.get(`/processors${hasMotherboard ? `?socket_id=${socket}` : ""}`).then(res => {
                    setComponents(res.data.data)
                })
            } else {
                await instanceAxios.get(`/processors`).then(res => {
                    setComponents(res.data.data)
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleAddComponent = (el) => {
        setOpen(false)
        setConfigureStore('processor', el);
        setPriceStore('processor_id', el.price)
        setCurrentComponent(el);
    }

    return (
        <div className="md:grid flex flex-col m-auto items-center md:grid-cols-4 max-w-[450px] md:max-w-[900px] bg-[#242424] px-[5px] py-[35px] my-[20px] rounded-[10px]">

            {
                Object.keys(currentComponent).length !== 0 ? (
                    <>
                        <div className="text-center">
                            <p className="text-[25px] text-[#fffffff]">{currentComponent?.brand?.title}</p>
                            <p className="">{currentComponent.processor_model}</p>
                            <p className="text-[#626262]">Unknown</p>

                        </div>
                        <div className="md:mx-[40px] my-[20px] flex justify-center">
                            <Image alt="photo" src={"/img/placeholder.png"} width={150} height={100} />
                        </div>
                        <div className="md:mr-[40px] mb-[20px] text-center">
                            <p className="text-[25px] text-[#fffffff]">Socket: {currentComponent?.socket[0].model}</p>
                            <p className="">Cores: {currentComponent.core}</p>
                            <p className="">Price: {currentComponent.price}$</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-center">
                            <p className="text-[25px] text-[#fffffff]">Processors</p>
                            <p className="text-[#626262]">Unknown</p>
                        </div >
                        <div className="md:mx-[40px] my-[20px] flex justify-center">
                            <Image alt="photo" src={"/img/placeholder.png"} width={150} height={100} />
                        </div>
                        <div className="md:mr-[40px] mb-[20px] text-center">
                            <p className="text-[25px] text-[#fffffff]">Model</p>
                            <p className="text-[#626262]">Description under name</p>
                        </div>
                    </>
                )
            }


            <div className="flex flex-col">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger onClick={() => handleComponentClick()} className="text-[#1A1A1A] py-[8px] px-[25px] rounded-[10px] mb-[20px] md:mb-[10px] bg-[#FFCC70] cursor-pointer">
                        Add
                    </DialogTrigger>
                    <DialogContent id="dialog-content" className="bg-[#1A1A1A] border-none text-[#ffffff] px-0 max-w-[320px] lg:max-h-[80vh] overflow-y-auto lg:!max-w-[850px] w-full">
                        <DialogHeader className="px-[24px]">
                            <DialogTitle className="text-center text-[30px]">Processors</DialogTitle>
                        </DialogHeader>
                        <div className="px-[24px] py-[16px]">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-[20px] text-[#FFCC70] hover:no-underline">Processors filters</AccordionTrigger>
                                    <AccordionContent>
                                        {filterConfig["processors"].map((filter) => (
                                            <div key={filter.name} className="mb-4">
                                                <label className="text-white block mb-1">{filter.label}</label>

                                                {filter.type === "select" && (
                                                    <div className="flex bg-[#3C3C3C] rounded-[10px] px-[10px] py-[20px] flex-col gap-[5px]">
                                                        {filter.options.map((opt) => (
                                                            <CheckboxComponent
                                                                key={opt.value}
                                                                componentName={filter.name}
                                                                componentId={opt.value}
                                                                componentLabel={opt.label}
                                                            />
                                                        ))}
                                                    </div>
                                                )}

                                                {filter.type === "range" && (
                                                    <div className="flex space-x-2">
                                                        <input
                                                            type="number"
                                                            placeholder="From"
                                                            value={selectedFilters[filter.name]?.from ?? ""}
                                                            onChange={(e) =>
                                                                handleRangeChange(filter.name, "from", Number(e.target.value))
                                                            }

                                                            className="w-1/2 bg-[#3E3E3E] text-white rounded p-2"
                                                        />
                                                        <input
                                                            type="number"
                                                            placeholder="To"
                                                            value={selectedFilters[filter.name]?.to ?? ""}
                                                            onChange={(e) => {
                                                                handleRangeChange(filter.name, "to", Number(e.target.value))
                                                            }
                                                            }
                                                            className="w-1/2 bg-[#3E3E3E] text-white rounded p-2"
                                                        />
                                                    </div>
                                                )}

                                                {filter.type === "number" && (
                                                    <input
                                                        type="number"
                                                        value={selectedFilters[filter.name] ?? ""}
                                                        onChange={(e) => {
                                                            if (filter.name === "frequency") {
                                                                console.log("frequency")
                                                                setFilterValue(filter.name, Number(e.target.value).toFixed(1))
                                                            } else {
                                                                setFilterValue(filter.name, e.target.value)
                                                            }
                                                        }}
                                                        className="bg-[#3E3E3E] text-white rounded p-2 w-full"
                                                    />
                                                )}

                                                {filter.type === "sort" && (
                                                    <select
                                                        onChange={(e) => setFilterValue(filter.name, e.target.value)}
                                                        className="bg-[#3E3E3E] text-white rounded p-2 w-full"
                                                    >
                                                        <option value="">Without sort</option>
                                                        {filter.options.map((option) => (
                                                            <option key={option} value={option}>
                                                                {option === "asc" ? "ASC" : "DESC"}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}
                                            </div>
                                        ))}
                                        <div className="flex justify-center gap-[10px]">
                                            <button onClick={onApplyFilters} className="text-[#000000] py-[8px] px-[25px] rounded-[10px] bg-[#FFCC70] cursor-pointer">Apply</button>
                                            <button onClick={handleRemove} className="text-[#ffffff] py-[8px] px-[25px] rounded-[10px] bg-[#FF5252] cursor-pointer">Remove filters</button>
                                        </div>
                                    </AccordionContent>

                                </AccordionItem>

                            </Accordion>
                            <div className="w-full border-b my-[20px] border-[#FFCC70]" />
                            <div>
                                {
                                    components.map(el => (
                                        <>
                                            <div className="md:grid grid-cols-4 items-center my-[20px]">
                                                <div className="text-center">
                                                    <p className="text-[20px] text-[#fffffff]">{el.brand.title}</p>
                                                    <p className="text-[20px] text-[#fffffff]">{el.processor_model}</p>
                                                </div>
                                                <div className="mx-[40px] my-[20px] flex justify-center">
                                                    <Image alt="photo" src={"/img/placeholder.png"} width={150} height={100} />
                                                </div>
                                                <div className="md:mr-[40px] mb-[20px] text-center">
                                                    <p className="text-[18px] text-[#fffffff]">Characteristics:</p>
                                                    <div className="text-[#626262] whitespace-nowrap">
                                                        <p className="">Frequency: {el.frequency}GHz</p>
                                                        <p className="">Power wattage: {el.power_wattage}Wt</p>
                                                        <p className="">Socket: {el.socket[0].model}</p>
                                                        <p className="">Memory generation: {el.memory_generation.title}</p>
                                                    </div>
                                                </div>
                                                <div className="md:mr-[40px] mb-[20px] text-center">
                                                    <button onClick={() => handleAddComponent(el)} disabled={hasMotherboard && el.socket.id !== socket ? true : false} className="disabled:text-[#626262] disabled:bg-[#C8B593] text-[#000000] py-[8px] px-[25px] rounded-[10px] bg-[#FFCC70] cursor-pointer">Add</button>
                                                    <p className="mt-[20px]">{el.price}$</p>
                                                </div>
                                            </div>
                                            <div className="w-full border-b my-[20px] border-[#FFCC70]" />
                                        </>
                                    ))
                                }
                                {
                                    !token ? (
                                        <>
                                            <h1 className="text-center text-[30px]">To start the configuration you need to log in\register</h1>
                                        </>
                                    ) : ""
                                }
                            </div>
                        </div>
                        {/* <div className="w-full border-b  border-[#FFCC70]" /> */}


                    </DialogContent>
                </Dialog>
                <button onClick={() => deleteComponent('processor_id')} className="text-[#ffffff] py-[8px] px-[25px] rounded-[10px] bg-[#FF5252] cursor-pointer">Remove</button>
            </div>
        </div >
    )
}

export default ProcessorBlock