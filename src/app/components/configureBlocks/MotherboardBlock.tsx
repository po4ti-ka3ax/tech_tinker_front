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
import { useTranslation } from 'react-i18next';
import "@/lib/i18n"; 
const MotherboardBlock = () => {
    const { t } = useTranslation('common');

    const { selectedFilters, setFilterValue, clearAllFilters } = useFilterStore();
    const { configureStore, setConfigureStore, deleteConfigureObject } = useConfigureStore();
    const { price, setPriceStore, totalPrice, unsetCurrentComponent, unsetPriceStore, recalculateTotal } = usePriceStore()
    const { power, setPowerStore, totalPower, unsetPowerCurrentComponent, unsetPowerStore, recalculateTotalPower } = usePowerStore()
    
    const [components, setComponents] = useState([]);
    const [open, setOpen] = useState(false)
    const [filters, setFilters] = useState({});
    const Cookies = require('js-cookie')
    const token = Cookies.get('access_token')
    const [hasFilterComponent, setHasFilterComponent] = useState(false);
    const [compatible, setCompatible] = useState(false);
    const [currentComponent, setCurrentComponent] = useState({})
    const [remove, setRemove] = useState(false);
    const [incompatibilityReason, setIncompatibilityReason] = useState('');

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
    const hasProcessor = configureStore.processor
    const socket = configureStore?.processor?.socket[0]?.id
    const hasStorage = configureStore.storage;
    const storageInterface = hasStorage ? configureStore?.storage?.connect_interface[0]?.id : '';
    useEffect(() => {
        if (hasProcessor && socket) {
            setHasFilterComponent(true)
            handleComponentClick();
        } else {
            setHasFilterComponent(false)
        }
    }, [hasProcessor, open])

    useEffect(() => {
        try {
            instanceAxios.get(`/brands?category_id=3`).then(res => {
                if (filterConfig['motherboards'][0].options && filterConfig['motherboards'][0].options.length === 0) {
                    res.data.data.forEach(el => {
                        filterConfig['motherboards'][0].options?.push({ value: el.id, label: el.title })
                    });
                }
            })
            instanceAxios.get(`/form-factors`).then(res => {
                if (filterConfig['motherboards'][1].options && filterConfig['motherboards'][1].options.length === 0) {
                    res.data.data.forEach(el => {
                        filterConfig['motherboards'][1].options?.push({ value: el.id, label: el.title })
                    });
                }
            })
            instanceAxios.get(`/sockets`).then(res => {
                if (filterConfig['motherboards'][2].options && filterConfig['motherboards'][2].options.length === 0) {
                    res.data.data.forEach(el => {
                        filterConfig['motherboards'][2].options?.push({ value: el.id, label: el.model })
                    });
                }
                // console.log(filterConfig['motherboards'][1].options)
            })
            instanceAxios.get(`/memory-generations`).then(res => {
                if (filterConfig['motherboards'][3].options && filterConfig['motherboards'][3].options.length === 0) {
                    res.data.data.forEach(el => {
                        filterConfig['motherboards'][3].options?.push({ value: el.id, label: el.title })
                    });
                }
            })
            instanceAxios.get(`/chipsets`).then(res => {
                if (filterConfig['motherboards'][4].options && filterConfig['motherboards'][4].options.length === 0) {
                    res.data.data.forEach(el => {
                        filterConfig['motherboards'][4].options?.push({ value: el.id, label: el.model })
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
        const response = await instanceAxios.get(`/motherboards?${query}`);
        // console.log(selectedFilters)
        setComponents(response.data.data);
    };


    const handleComponentClick = async () => {
        try {
            console.log(socket)
            await instanceAxios.get(`/motherboards${hasProcessor ? `?socket_id=${socket}` : ""}${hasStorage ? `?connect_interfaces_id[0]=${storageInterface}` : ''}`).then(res => {
                setComponents(res.data.data)
            })
        } catch (error) {
            console.error(error)
        }
    }

    const isCompatible = (componentA, componentB) => {
        if (!componentA || !componentB) return false;
        return componentA.socket[0]?.id === componentB.socket?.id;
    };

    useEffect(() => {
       if(!configureStore.processor || !currentComponent) return;
       if(currentComponent.socket?.id !== configureStore.processor.socket[0]?.id) {
            setCompatible(false)
            setIncompatibilityReason("Socket doesn't match")
       }
    }, [configureStore.processor, currentComponent]);


    const handleRemoveFilters = async () => {
        try {
            console.log(socket)
            clearAllFilters()
            setRemove(!remove)
            await instanceAxios.get(`/motherboards${hasProcessor ? `?socket_id=${socket}` : ""}`).then(res => {
                setComponents(res.data.data)
            })
        } catch (err) {
            console.error(err)
        }
    }

    const handleAddComponent = (el) => {
        setOpen(false)

        setConfigureStore('motherboard', el);
        setPriceStore('motherboard_id', el.price)
        // setPowerStore('motherboard_id',el.power_wattage)
        setCurrentComponent(el);
    }

    return (
        <div className="md:grid flex flex-col m-auto items-center md:grid-cols-4 max-w-[450px] md:max-w-[900px] bg-[#242424] px-[5px] py-[35px] my-[20px] rounded-[10px]">

            {
                Object.keys(currentComponent).length !== 0 ? (
                    <>
                        <div className="text-center">
                            <p className="text-[25px] text-[#fffffff]">{currentComponent?.brand?.title}</p>
                            <p className="">{currentComponent.motherboard_model}</p>
                            {
                                hasProcessor && isCompatible(configureStore.processor, currentComponent) ? (
                                    <>
                                        <Tooltip>
                                            <TooltipTrigger className="text-[#28CC20] mt-[10px] "> <div className="flex justify-center gap-[6px]"><BadgeInfo />{t('compatible')}</div></TooltipTrigger>
                                            <TooltipContent className="bg-[#3E3E3E] p-[20px]">
                                                <p className="text-[17px]">
                                                    {t('your')} {t('motherboard')}: {currentComponent.motherboard_model}
                                                    <br />
                                                    {t('compatibleWith')}
                                                    <br />
                                                    {t('your')} {t('processors')}: {configureStore.processor.processor_model}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </>
                                ) : (
                                    <>
                                        <Tooltip>
                                            <TooltipTrigger className="text-[#FF5252]  mt-[10px] "> <div className="flex justify-center gap-[6px]"><BadgeInfo />{t('uncompatible')}</div></TooltipTrigger>
                                            <TooltipContent className="bg-[#3E3E3E] p-[20px]">
                                                <p className="text-[17px]">
                                                   {incompatibilityReason}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </>
                                )
                            }

                        </div>
                        <div className="md:mx-[40px] my-[20px] flex justify-center">
                            <Image alt="photo" className="rounded-[10px]" src={`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${currentComponent.link_img}`} width={150} height={100} />
                        </div>
                        <div className="md:mr-[40px] mb-[20px] text-center">
                            <p className="text-[25px] text-[#fffffff]">{t('chipset')}: {currentComponent?.chipset?.model}</p>
                            <p className="">{t('socket')}: {currentComponent?.socket?.model}</p>
                            <p className="">{t('price')}: {currentComponent.price}$</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-center">
                            <p className="text-[25px] text-[#fffffff]">{t('motherboard')}</p>
                            <p className="text-[#626262]">{t('unknown')}</p>
                        </div >
                        <div className="md:mx-[40px] my-[20px] flex justify-center">
                            <Image alt="photo" src={"/img/placeholder.png"} width={150} height={100} />
                        </div>
                        <div className="md:mr-[40px] mb-[20px] text-center">
                            <p className="text-[25px] text-[#fffffff]">{t('model')}</p>
                            <p className="text-[#626262]">{t('descriptionComponent')}</p>
                        </div>
                    </>
                )
            }


            <div className="flex flex-col">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger onClick={() => handleComponentClick()} className="text-[#1A1A1A] py-[8px] px-[25px] rounded-[10px] mb-[20px] md:mb-[10px] bg-[#FFCC70] cursor-pointer">
                        {t('add')}
                    </DialogTrigger>
                    <DialogContent id="dialog-content" className="bg-[#1A1A1A] border-none text-[#ffffff] px-0 max-w-[320px] lg:max-h-[80vh] overflow-y-auto lg:!max-w-[850px] w-full">
                        <DialogHeader className="px-[24px]">
                            <DialogTitle className="text-center text-[30px]">{t('motherboard')}</DialogTitle>
                        </DialogHeader>
                        <div className="px-[24px] py-[16px]">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-[20px] text-[#FFCC70] hover:no-underline">{t('motherboard')} {t('filters')}</AccordionTrigger>
                                    <AccordionContent>
                                        {filterConfig["motherboards"].map((filter) => (
                                            <div key={filter.name} className="mb-4">
                                                <label className="text-white block mb-1">{filter.label}</label>

                                                {filter.type === "select" && (
                                                    <div className="flex bg-[#3C3C3C] rounded-[10px] px-[10px] py-[20px] flex-col gap-[5px]">
                                                        {filter?.options.map((opt) => (
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
                                                            placeholder={t('from')}
                                                            value={selectedFilters[filter.name]?.from ?? ""}
                                                            onChange={(e) =>
                                                                handleRangeChange(filter.name, "from", Number(e.target.value))
                                                            }

                                                            className="w-1/2 bg-[#3E3E3E] text-white rounded p-2"
                                                        />
                                                        <input
                                                            type="number"
                                                            placeholder={t('to')}
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
                                                        <option value="">{t('withoutSort')}</option>
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
                                            <button onClick={onApplyFilters} className="text-[#000000] py-[8px] px-[25px] rounded-[10px] bg-[#FFCC70] cursor-pointer">{t('apply')}</button>
                                            <button onClick={handleRemoveFilters} className="text-[#ffffff] py-[8px] px-[25px] rounded-[10px] bg-[#FF5252] cursor-pointer">{t('removeFilters')}</button>
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
                                                    <p className="text-[20px] text-[#fffffff]">{el.motherboard_model}</p>
                                                </div>
                                                <div className="mx-[40px] my-[20px] flex justify-center">
                                                    <Image alt="photo" className="rounded-[10px]" src={`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${el.link_img}`} width={150} height={100} />
                                                </div>
                                                <div className="md:mr-[40px] mb-[20px] text-center">
                                                    <p className="text-[18px] text-[#fffffff]">Characteristics:</p>
                                                    <div className="text-[#626262] whitespace-nowrap">
                                                        <p className="">{t('chipset')}: {el.chipset.model}</p>
                                                        <p className="">{t('formFactor')}: {el.form_factor.title}Wt</p>
                                                        <p className="">{t('socket')}: {el.socket.model}</p>
                                                        <p className="">{t('memoryGeneration')}: {el.memory_generation.title}</p>
                                                    </div>
                                                </div>
                                                <div className="md:mr-[40px] mb-[20px] text-center">
                                                    <button disabled={hasProcessor && el.socket.id !== socket ? true : false} onClick={() => handleAddComponent(el)} className="disabled:cursor-default disabled:text-[#626262] disabled:bg-[#C8B593] text-[#000000] py-[8px] px-[25px] rounded-[10px] bg-[#FFCC70] cursor-pointer">{t('add')}</button>
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
                                            <h1 className="text-center text-[30px]">{t('configurationRegister')}</h1>
                                        </>
                                    ) : ""
                                }
                            </div>
                        </div>
                        {/* <div className="w-full border-b  border-[#FFCC70]" /> */}


                    </DialogContent>
                </Dialog>
                <button onClick={() => deleteComponent('motherboard')} className="text-[#ffffff] py-[8px] px-[25px] rounded-[10px] bg-[#FF5252] cursor-pointer">{t('remove')}</button>
            </div>
        </div >
    )
}

export default MotherboardBlock