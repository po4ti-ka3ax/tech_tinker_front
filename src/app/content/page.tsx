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
import { useTranslation } from 'react-i18next';
import "@/lib/i18n";
import { filterConfig } from "../config/filterConfig"
import CheckboxComponent from "../components/filters/CheckboxComponent"
const Content = () => {
    const { selectedFilters, setFilterValue } = useFilterStore();
    const { t } = useTranslation('common');
    const [pc, setPC] = useState([]);
    const handleRangeChange = (name: string, key: 'from' | 'to', value: number | null) => {
        const current = selectedFilters[name] || {};
        setFilterValue(name, { ...current, [key]: value });
    };
    useEffect(() => {
        try {
            instanceAxios.get(`/processors`).then(res => {
                if (filterConfig['builds'][1].options && filterConfig['builds'][1].options.length === 0) {
                    res.data.data.forEach(el => {
                        console.log(el)
                        filterConfig['builds'][1].options?.push({ value: el.id, label: el.processor_model })
                    });
                }
            })
            instanceAxios.get(`/motherboards`).then(res => {
                if (filterConfig['builds'][2].options && filterConfig['builds'][2].options.length === 0) {
                    res.data.data.forEach(el => {
                        filterConfig['builds'][2].options?.push({ value: el.id, label: el.motherboard_model })
                    });
                }
            })
            instanceAxios.get(`/graphic-cards`).then(res => {
                if (filterConfig['builds'][3].options && filterConfig['builds'][3].options.length === 0) {
                    res.data.data.forEach(el => {
                        filterConfig['builds'][3].options?.push({ value: el.id, label: el.gpu_model })
                    });
                }
            })
            instanceAxios.get(`/system-memories`).then(res => {
                if (filterConfig['builds'][4].options && filterConfig['builds'][4].options.length === 0) {
                    res.data.data.forEach(el => {
                        filterConfig['builds'][4].options?.push({ value: el.id, label: el.memory_model })
                    });
                }
            })
            instanceAxios.get(`/cooling-specs`).then(res => {
                if (filterConfig['builds'][5].options && filterConfig['builds'][5].options.length === 0) {
                    res.data.data.forEach(el => {
                        filterConfig['builds'][5].options?.push({ value: el.id, label: el.cooling_model })
                    });
                }
            })
            instanceAxios.get(`/storages`).then(res => {
                if (filterConfig['builds'][6].options && filterConfig['builds'][6].options.length === 0) {
                    res.data.data.forEach(el => {
                        filterConfig['builds'][6].options?.push({ value: el.id, label: el.storage_model })
                    });
                }
            })
            instanceAxios.get(`/computer-cases`).then(res => {
                if (filterConfig['builds'][7].options && filterConfig['builds'][7].options.length === 0) {
                    res.data.data.forEach(el => {
                        filterConfig['builds'][7].options?.push({ value: el.id, label: el.case_model })
                    });
                }
            })
            instanceAxios.get(`/powers`).then(res => {
                if (filterConfig['builds'][8].options && filterConfig['builds'][8].options.length === 0) {
                    res.data.data.forEach(el => {
                        filterConfig['builds'][8].options?.push({ value: el.id, label: el.power_model })
                    });
                }
            })


        } catch (error) {
            console.error(error)
        }
    }, [])
    const buildQuery = () => {
        const params = new URLSearchParams();

        Object.entries(selectedFilters).forEach(([key, value]) => {
            if (debouncedSearchQuery.trim()) {
                params.append('search', debouncedSearchQuery.trim());
            }


            if (Array.isArray(value)) {
                value.forEach((v, index) => {
                    // Особая обработка для graphic_card и system_memory
                    if (key === "graphic_card" || key === "system_memory") {
                        params.append(`${key}`, v);
                    } else {
                        params.append(key, v);
                    }
                });
            } else if (typeof value === "object" && value !== null) {
                if (key === "price") {
                    if (value.from) params.append(`${key}_min`, Number(value.from).toFixed(2));
                    if (value.to) params.append(`${key}_max`, Number(value.to).toFixed(2));
                } else if (key === "height" || key === "width") {
                    if (value.from) params.append(`${key}_min`, Number(value.from).toFixed(1));
                    if (value.to) params.append(`${key}_max`, Number(value.to).toFixed(1));
                } else {
                    if (value.from) params.append(`${key}_min`, value.from);
                    if (value.to) params.append(`${key}_max`, value.to);
                }
            } else if (value !== undefined && value !== "") {
                params.append(key, value);
            }
        });

        const query = params.toString();
        return query ? `?${query}` : "";
    };

    const onApplyFilters = async () => {
        const query = buildQuery();
        const response = await instanceAxios.get(`/builds?${query}`);
        // console.log(selectedFilters)
        setPC(response.data.data);
    };
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    useEffect(() => {
        instanceAxios.get('/builds')
            .then(res => setPC(res.data.data))
            .catch(err => console.error(err));
    }, []);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
    }, [open]);
    const clearFiltersHandle = () => {
        clearAllFilters()
        instanceAxios.get('/builds')
            .then(res => setPC(res.data.data))
            .catch(err => console.error(err));
    }
    const { clearAllFilters } = useFilterStore();
    const searchHandle = async () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
    }
    try {
        const res = await instanceAxios.get(`/builds?${params.toString()}`);
        setPC(res.data.data);
    } catch (error) {
        console.error(error);
    }
};

useEffect(() => {
    if (debouncedSearchQuery.trim() !== '') {
        searchHandle();
    }
}, [debouncedSearchQuery]);


    return (
        <>
            <div className="">

                <h1 className="text-center text-[30px] lg:text-[50px] mb-[50px]">{t('chooseComputer')}</h1>
                <div className="flex justify-center">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger className="bg-[#2D2D2D] rounded-[10px] py-[10px] px-[20px] hover:bg-[#262626] duration-200 ease-in-out">
                            {t('filters')}
                        </DialogTrigger>

                        <DialogContent id="dialog-content" className="bg-[#1A1A1A] border-none text-[#ffffff] px-0 max-w-[320px] lg:max-h-[80vh] overflow-y-auto lg:!max-w-[750px] w-full">
                            <DialogHeader className="px-[24px]">
                                <DialogTitle className="text-center text-[30px]">{t('filters')}</DialogTitle>
                            </DialogHeader>
                            <div className="px-[24px] py-[16px]">
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="text-[20px] text-[#FFCC70] hover:no-underline">{t('Filter')}</AccordionTrigger>
                                        <AccordionContent>
                                            {filterConfig["builds"].map((filter) => (
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
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                            <div className="w-full border-b  border-[#FFCC70]" />
                            <div className="text-center flex gap-[10px] justify-center">
                                <button onClick={() => clearFiltersHandle()} className="cursor-pointer text-[#000000] bg-[#FFCC70] px-[5px] py-[10px] rounded-[10px] text-[20px]">{t('resetFilters')}</button>
                                <button onClick={onApplyFilters} className="cursor-pointer text-[#000000] bg-[#FFCC70] px-[5px] py-[10px] rounded-[10px] text-[20px]">{t('apply')}</button>
                            </div>
                        </DialogContent>
                    </Dialog>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mx-[20px] bg-[#2D2D2D] pl-[20px] px-[200px] rounded-[10px]"
                    placeholder={t('search')}
                />

                <button
                    onClick={searchHandle}
                    className="px-[20px] py-[10px] bg-[#FFCC70] text-black cursor-pointer rounded-[10px]"
                >
                    {t('search')}
                </button>


                </div>
                <div className=" grid grid-cols-5 mt-[30px] justify-center">
                    {
                        pc.map(el => (
                            <>
                                <ComputerCard computer={el} />
                            </>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Content