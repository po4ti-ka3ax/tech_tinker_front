'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import { useTranslation } from 'react-i18next'
import { useRouter, useParams } from "next/navigation"
import { useConfigureStore } from "@/app/state/useConfigureStore"
import { usePriceStore } from "@/app/state/usePriceStore"
// import { usePowerStore } from "@/app/state/usePowerStore"

import ProcessorBlock from "@/app/components/configureBlocks/ProcessorBlock"
import MotherboardBlock from "@/app/components/configureBlocks/MotherboardBlock"
import VideocardBlock from "@/app/components/configureBlocks/VideocardBlock"
import SystemMemoryBlock from "@/app/components/configureBlocks/SystemMemoryBlock"
import CoolingBlock from "@/app/components/configureBlocks/CoolingBlock"
import StorageHddBlock from "@/app/components/configureBlocks/StorageHddBlock"
import StorageSsdBlock from "@/app/components/configureBlocks/StorageSsdBlock"
import CaseBlock from "@/app/components/configureBlocks/CaseBlock"
import PowerBlock from "@/app/components/configureBlocks/PowerBlock"
import instanceAxios from "@/app/components/axios/instanceAxios"


const EditConfigure = () => {
    const { t } = useTranslation('common')
    const router = useRouter()
    const params = useParams()
    const Cookies = require('js-cookie')
    const [pcName, setPcName] = useState("")
    const [pcDescription, setPcDescription] = useState("")
    const [pcImage, setPcImage] = useState<string | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const { configureStore, setConfigureStore, deleteConfigureObject, unsetConfigureStore } = useConfigureStore();
    const { price, setPriceStore, totalPrice, unsetCurrentComponent, unsetPriceStore, recalculateTotal } = usePriceStore()

    // const { totalPower, unsetPowerStore } = usePowerStore()

    const userId = Cookies.get('user_id')
    const id = params?.id



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await instanceAxios.get(`/builds/${id}`);
                const data = res.data.data;

                
                unsetConfigureStore();
                unsetPriceStore(); 

                
                setConfigureStore("processor", data.processor);
                setConfigureStore("motherboard", data.motherboard);
                setConfigureStore("graphic_card", data.graphic_cards);
                setConfigureStore("system_memory", data.systemMemories);
                setConfigureStore("cooling_spec", data.coolingSpecs);
                setConfigureStore("storageHdd", data.storages?.filter(s => s.storage_type.title === "HDD") || []);
                setConfigureStore("storageSsd", data.storages?.filter(s => s.storage_type.title === "SSD") || []);
                setConfigureStore("computer_case", data.computer_case);
                setConfigureStore("power", data.power);

                
                setPriceStore("processor", data.processor?.price);
                setPriceStore("motherboard", data.motherboard?.price);
                setPriceStore("power", data.power?.price);
                setPriceStore("computer_case", data.computer_case?.price);

                if (Array.isArray(data.graphic_cards)) {
                    const prices = data.graphic_cards.map(gpu => Number(gpu.price));
                    setPriceStore("graphic_card", prices);
                }
                if (Array.isArray(data.systemMemories)) {
                    const prices = data.systemMemories.map(ram => Number(ram.price));
                    setPriceStore("system_memory", prices);
                }
                if (Array.isArray(data.coolingSpecs)) {
                    const prices = data.coolingSpecs.map(cool => Number(cool.price));
                    setPriceStore("cooling_specs", prices);
                }
                if (Array.isArray(data.storages)) {
                    const prices = data.storages.map(stor => Number(stor.price));
                    setPriceStore("storages", prices);
                }

                setPcName(data.title);
                setPcDescription(data.description);
                setImagePreview(`${process.env.NEXT_PUBLIC_API_URL_FOR_IMAGE}${data.link_img}`);
            } catch (err) {
                console.error("Ошибка загрузки конфигурации:", err);
            }
        };

        fetchData();
    }, []);



    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append("title", pcName)
        formData.append("description", pcDescription)
        formData.append("user_id", userId || "")

        if (pcImage) {
            formData.append("upload", pcImage)
        }

        const idMap = {
            processor: "processor_id",
            motherboard: "motherboard_id",
            graphic_card: "graphic_card_id",
            system_memory: "system_memory_id",
            cooling_spec: "cooling_spec_id",
            computer_case: "computer_case_id",
            power: "power_id"
        }

        const indexedFields = ["cooling_spec_id", "graphic_card_id", "system_memory_id"]
        const indexCounters = {}

        const storageDevices = [
            ...(Array.isArray(configureStore.storageHdd) ? configureStore.storageHdd : [configureStore.storageHdd]),
            ...(Array.isArray(configureStore.storageSsd) ? configureStore.storageSsd : [configureStore.storageSsd])
        ]

        storageDevices.forEach((dev, i) => {
            if (dev?.id) formData.append(`storage_id[${i}]`, dev.id)
        })

        Object.entries(idMap).forEach(([key, field]) => {
            const comp = configureStore[key]
            if (!comp) return

            if (Array.isArray(comp)) {
                comp.forEach((el) => {
                    if (el?.id) {
                        const index = indexCounters[field] || 0
                        formData.append(`${field}[${index}]`, el.id.toString())
                        indexCounters[field] = index + 1
                    }
                })
            } else if (comp?.id) {
                formData.append(field, comp.id.toString())
            }
        })

        try {
            await instanceAxios.post(`/builds/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            }).then(res => {
                unsetPriceStore()
                unsetConfigureStore()
                router.push(`/computer/${id}`)
            })
        } catch (err) {
            console.error("Ошибка при сохранении:", err)
        }
    }

    return (
        <div>
            <h1 className="text-center text-[30px] lg:text-[50px] mb-[50px]">{t('editComputer')}</h1>
            <div className="md:flex justify-around">
                <div className="text-center mb-[80px] flex flex-col items-center md:sticky md:mr-[20px] top-[20px] self-start">
                    <input type="file" accept="image/*" onChange={e => {
                        const file = e.target.files?.[0]
                        if (file) {
                            setPcImage(file)
                            setImagePreview(URL.createObjectURL(file))
                        }
                    }} id="edit-photo" hidden />

                    <label htmlFor="edit-photo">
                        <div className="bg-[#242424] py-[10px] rounded-[10px] my-[20px]">
                            <div className="px-[10px]">
                                <Image
                                    alt="PC Image"
                                    className="rounded-[10px] cursor-pointer w-[200px] md:w-[300px] md:h-[300px]"
                                    src={imagePreview || '/img/upload.svg'}
                                    width={300}
                                    height={300}
                                />
                            </div>
                            <div className="border-b border-[#FFCC70] my-6" />
                            <p className="my-[20px] cursor-pointer">{t('uploadPhoto')}</p>
                        </div>
                    </label>

                    <input type="text" value={pcName} onChange={e => setPcName(e.target.value)} placeholder={t('pcName')} className="text-center rounded-[20px] py-[10px] px-[50px] bg-[#242424]" />
                    <Textarea value={pcDescription} onChange={e => setPcDescription(e.target.value)} placeholder={t('pcDescription')} className="my-[20px] w-[80%] resize-none bg-[#242424]" />
                    <p className="my-[20px]">{t('totalPrice')} {totalPrice}₸</p>

                    <button
                        onClick={handleSubmit}
                        className="bg-[#FFCC70] py-[10px] px-[70px] hover:bg-[#C5A262] duration-300 text-[#1A1A1A] rounded-[10px]"
                    >
                        {t('saveConfigure')}
                    </button>
                </div>

                <div>
                    <ProcessorBlock />
                    <MotherboardBlock />
                    <VideocardBlock />
                    <SystemMemoryBlock />
                    <CoolingBlock />
                    <StorageHddBlock />
                    <StorageSsdBlock />
                    <CaseBlock />
                    <PowerBlock />
                </div>
            </div>
        </div>
    )
}

export default EditConfigure
