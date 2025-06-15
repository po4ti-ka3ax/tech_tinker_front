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
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import CheckboxComponent from "../filters/CheckboxComponent"
import instanceAxios from "../axios/instanceAxios"
import { useEffect, useState } from "react"
import { filterConfig } from "@/app/config/filterConfig"
import { useFilterStore } from "@/app/state/useFilterStore"
import { useConfigureStore } from "@/app/state/useConfigureStore"
import { usePriceStore } from "@/app/state/usePriceStore"
import { BadgeInfo } from 'lucide-react';
import { usePowerStore } from "@/app/state/usePowerStore"

const StorageHddBlock = () => {
    const { selectedFilters, setFilterValue, clearAllFilters } = useFilterStore();
    const { configureStore, setConfigureStore, deleteConfigureObject } = useConfigureStore();
    const { price, setPriceStore, totalPrice, unsetCurrentComponent, unsetPriceStore, recalculateTotal } = usePriceStore()
    const { power, setPowerStore, totalPower, unsetPowerCurrentComponent, unsetPowerStore, recalculateTotalPower } = usePowerStore()
    const [components, setComponents] = useState([]);
    const [hasFilterComponent, setHasFilterComponent] = useState(false);
    const [open, setOpen] = useState(false)
    const [filters, setFilters] = useState({});
    const Cookies = require('js-cookie')
    const token = Cookies.get('access_token')
    const [currentComponent, setCurrentComponent] = useState({})
    const [remove, setRemove] = useState(false);
    
    // console.log('before:', configureStore);
    const [compatible, setCompatible] = useState(false);
    const [incompatibilityReason, setIncompatibilityReason] = useState('');

    // const updateFilter = (name, value) => {
    //     setFilters(prev => ({ ...prev, [name]: value }));
    // };

    const handleRangeChange = (name: string, key: 'from' | 'to', value: number | null) => {
        const current = selectedFilters[name] || {};
        setFilterValue(name, { ...current, [key]: value });
    };

    const deleteComponent = (key) => {
        unsetCurrentComponent(key)
        unsetPowerCurrentComponent(key)
        setTimeout(() => recalculateTotal(), 0)
        setTimeout(() => recalculateTotalPower(), 0)
        setCurrentComponent({})
        deleteConfigureObject(key)
    };
    const hasMotherboard = configureStore.motherboard
    const socket = configureStore?.motherboard?.socket.id
    const storageInterface = configureStore?.motherboard?.connect_interface;
    useEffect(() => {
        if(hasMotherboard && storageInterface) {
            setHasFilterComponent(true)
            handleComponentClick();
        } else {
            setHasFilterComponent(false)
        }
    }, [hasMotherboard,open])
    useEffect(() => {
        try {
            instanceAxios.get(`/brands?category_id=6`).then(res => {
                if (filterConfig['storages'][0].options && filterConfig['storages'][0].options.length === 0) {
                    res.data.data.forEach(el => {
                        filterConfig['storages'][0].options?.push({ value: el.id, label: el.title })
                    });
                }
            })
            instanceAxios.get(`/storage-types`).then(res => {
                if (filterConfig['storages'][2].options && filterConfig['storages'][2].options.length === 0) {
                    res.data.data.forEach(el => {
                        filterConfig['storages'][2].options?.push({ value: el.id, label: el.title })
                    });
                }
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
        const response = await instanceAxios.get(`/storages?${query}`);
        // console.log(selectedFilters)
        setComponents(response.data.data);
    };




    const handleComponentClick = async () => {
        try {
            if (hasMotherboard) {
                await instanceAxios.get(`/storages?storage_type_id=2${hasMotherboard ? `&connect_interfaces_id[0]=5` : ""}`).then(res => {
                    setComponents(res.data.data)
                })
            } else {
                await instanceAxios.get(`/storages?storage_type_id=2`).then(res => {
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
                await instanceAxios.get(`/storages?storage_type_id=2${hasMotherboard ? `&connect_interfaces_id[0]=5` : ""}`).then(res => {
                    setComponents(res.data.data)
                })
            } else {
                await instanceAxios.get(`/storages?storage_type_id=2`).then(res => {
                    setComponents(res.data.data)
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    const isCompatible = (component) => {
        if (!component) return false;
        const motherboardInterfacesIds = (configureStore?.motherboard?.connect_interface || []).map(el => el.id);
        const componentInterfaceIds = (component?.connect_interface || []).map(el => el.id);
        return componentInterfaceIds.some(id => motherboardInterfacesIds.includes(id));
    };

    useEffect(() => {
       if(!configureStore.motherboard || !currentComponent) return;
        const motherboardInterfaces = configureStore?.motherboard?.connect_interface || [];
        const motherboardInterfacesIds = motherboardInterfaces.map(el => el.id);

        const components = Array.isArray(currentComponent) ? currentComponent : [currentComponent]

        const incompatible = components.some(component => {
            const componentInterfaceIds = (component.connect_interface || []).map(el => el.id);
            const hasMatch = componentInterfaceIds.some(id => motherboardInterfacesIds.includes(id))
            return !hasMatch;
        })
       if(incompatible) {
            setCompatible(false)
            setIncompatibilityReason("Connect interface doesn't match")
       } else {
            setCompatible(true);
            setIncompatibilityReason(null);
        }
    }, [configureStore.motherboard, currentComponent]);

    const handleAddComponent = (el) => {
        setOpen(false)
        setConfigureStore('storageHdd', el);
        setPriceStore('storage_id', el.price)
        // setPowerStore('storage_id',el.power_wattage)
        setCurrentComponent(el);
    }
    // console.log(compatible)
    return (
        <div className="md:grid flex flex-col m-auto items-center md:grid-cols-4 max-w-[450px] md:max-w-[900px] bg-[#242424] px-[5px] py-[35px] my-[20px] rounded-[10px]">

            {
                Object.keys(currentComponent).length !== 0 ? (
                    <>
                        <div className="text-center">
                            <p className="text-[25px] text-[#fffffff]">{currentComponent?.brand?.title}</p>
                            <p className="">{currentComponent.storage_model}</p>
                             {
                                // isCompatible(currentComponent, configureStore.motherboard ) &&
                                hasMotherboard &&  compatible ? (
                                    <>
                                        <Tooltip>
                                            <TooltipTrigger className="text-[#28CC20] mt-[10px] "> <div className="flex justify-center gap-[6px]"><BadgeInfo />Compatible</div></TooltipTrigger>
                                            <TooltipContent className="bg-[#3E3E3E] p-[20px]">
                                                <p className="text-[17px]">
                                                    Your {currentComponent.storage_type.title}: {currentComponent.storage_model} 
                                                    <br /> 
                                                    compatible with
                                                    <br /> 
                                                    your motherboard: {configureStore.motherboard.motherboard_model}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </>
                                ) : (
                                    <>
                                        <Tooltip>
                                            <TooltipTrigger className="text-[#FF5252] mt-[10px] "> <div className="flex justify-center gap-[6px]"><BadgeInfo />Uncompatible</div></TooltipTrigger>
                                            <TooltipContent className="bg-[#3E3E3E] p-[20px]">
                                                <p className="text-[17px]">
                                                    {incompatibilityReason}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                        {/* <p className="text-[#626262]">Unknown</p> */}
                                    </>
                                )
                            }

                        </div>
                        <div className="md:mx-[40px] my-[20px] flex justify-center">
                            <Image alt="photo" src={"/img/placeholder.png"} width={150} height={100} />
                        </div>
                        <div className="md:mr-[40px] mb-[20px] text-center">
                            <p className="text-[25px] text-[#fffffff] whitespace-nowrap">Volume: {currentComponent.volume}GB</p>
                            <p className="">Type: {currentComponent.storage_type.title}</p>
                            <p className=" whitespace-nowrap">Connect interface: {currentComponent.connect_interface[0].title}</p>
                            <p className="">Price: {currentComponent.price}$</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-center">
                            <p className="text-[25px] text-[#fffffff]">Hard drive</p>
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
                            <DialogTitle className="text-center text-[30px]">Storage</DialogTitle>
                        </DialogHeader>
                        <div className="px-[24px] py-[16px]">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-[20px] text-[#FFCC70] hover:no-underline">Hard drives filters</AccordionTrigger>
                                    <AccordionContent>
                                        {filterConfig["storages"].map((filter) => (
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
                                                    <p className="text-[20px] text-[#fffffff]">{el.storage_model}</p>
                                                </div>
                                                <div className="mx-[40px] my-[20px] flex justify-center">
                                                    <Image alt="photo" src={"/img/placeholder.png"} width={150} height={100} />
                                                </div>
                                                <div className="md:mr-[40px] mb-[20px] text-center">
                                                    <p className="text-[18px] text-[#fffffff]">Characteristics:</p>
                                                    <div className="text-[#626262] whitespace-nowrap">
                                                        <p className="">Volume: {el.volume}GB</p>
                                                        <p className="">Type: {el.storage_type.title}</p>
                                                        <p className="">Connect interface: {el.connect_interface[0].title}</p>
                                                        {/* <p className="">Memory generation: {el.memory_generation.title}</p> */}
                                                    </div>
                                                </div>
                                                <div className="md:mr-[40px] mb-[20px] text-center">
                                                    
                                                    <button
                                                        onClick={() => handleAddComponent(el)}
                                                        disabled={!isCompatible(el)}
                                                        className="disabled:cursor-default disabled:text-[#626262] disabled:bg-[#C8B593] text-[#000000] py-[8px] px-[25px] rounded-[10px] bg-[#FFCC70] cursor-pointer"
                                                    >
                                                        Add
                                                    </button>
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
                <button onClick={() => deleteComponent('storage')} className="text-[#ffffff] py-[8px] px-[25px] rounded-[10px] bg-[#FF5252] cursor-pointer">Remove</button>
            </div>
        </div >
    )
}

export default StorageHddBlock