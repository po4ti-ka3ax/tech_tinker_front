'use client'

import Image from "next/image"
import ConfigureBlock from "../components/configureBlock/ConfigureBlock"
import { Textarea } from "@/components/ui/textarea"
import ProcessorBlock from "../components/configureBlocks/ProcessorBlock"
import { usePriceStore } from "../state/usePriceStore"
import MotherboardBlock from "../components/configureBlocks/MotherboardBlock"
import VideocardBlock from "../components/configureBlocks/VideocardBlock"
import { usePowerStore } from "../state/usePowerStore"
import SystemMemoryBlock from "../components/configureBlocks/SystemMemoryBlock"
import CoolingBlock from "../components/configureBlocks/CoolingBlock"
import StorageHddBlock from "../components/configureBlocks/StorageHddBlock"
import StorageSsdBlock from "../components/configureBlocks/StorageSsdBlock"
import CaseBlock from "../components/configureBlocks/CaseBlock"
import PowerBlock from "../components/configureBlocks/PowerBlock"
import { useConfigureStore } from "../state/useConfigureStore"
import instanceAxios from "../components/axios/instanceAxios"
import { useState } from "react"
import { redirect } from "next/navigation"
import { useTranslation } from 'react-i18next';
import { useRouter } from "next/navigation";
import "@/lib/i18n";
const Configure = () => {
    const router = useRouter();
    const { t } = useTranslation('common');
    const [pcName, setPcName] = useState("")
    const [pcDescription, setPcDescription] = useState("")
    const [pcImage, setPcImage] = useState<File | null>(null)
    const Cookies = require('js-cookie');
    const userId = Cookies.get('user_id')
    const { price, setPriceStore, totalPrice, unsetCurrentComponent, unsetPriceStore } = usePriceStore()
    // const { power, setPowerStore, totalPower, unsetPowerCurrentComponent, unsetPowerStore, recalculateTotalPower } = usePowerStore()
    const { configureStore, setConfigureStore, deleteConfigureObject,unsetConfigureStore } = useConfigureStore();
    const [image,setImage] = useState<string | null>(null)
    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append("title", pcName);
        formData.append("description", pcDescription);
        formData.append("user_id", userId || "");

        if (pcImage) {
            formData.append("upload", pcImage);
        } else {
            console.warn("Файл не выбран!");
        }
        localStorage.removeItem('imagePC')
        const arr = [
            'processor',
            'motherboard',
            'graphic_card',
            'system_memory',
            'cooling_spec',
            'storageHdd',
            'storageSsd',
            'computer_case',
            'power'
        ];

        const idMap = {
            'processor': 'processor_id',
            'motherboard': 'motherboard_id',
            'graphic_card': 'graphic_card_id',
            'system_memory': 'system_memory_id',
            'cooling_spec': 'cooling_spec_id',
            'computer_case': 'computer_case_id',
            'power': 'power_id'
        };

        const indexedFields = [ 'cooling_spec_id', 'graphic_card_id', 'system_memory_id'];

        let indexCounters: { [key: string]: number } = {};
        formData.forEach((val, key) => {
            console.log(key, val);
        });
        const storageDevices = [];

        if (configureStore.storageHdd) {
            if (Array.isArray(configureStore.storageHdd)) {
                storageDevices.push(...configureStore.storageHdd);
            } else {
                storageDevices.push(configureStore.storageHdd);
            }
        }

        if (configureStore.storageSsd) {
            if (Array.isArray(configureStore.storageSsd)) {
                storageDevices.push(...configureStore.storageSsd);
            } else {
                storageDevices.push(configureStore.storageSsd);
            }
        }

        // console.log("storageDevices:", storageDevices);

        storageDevices.forEach((device, index) => {
            if (device?.id) {
                formData.append(`storage_id[${index}]`, device.id);
            }
        });

        arr.forEach((key) => {
            const component = configureStore[key];
            const formKey = idMap[key];
            if (!component) return;

            if (Array.isArray(component)) {
                const ids = component.filter((item) => item?.id).map((item) => item.id);
                ids.forEach((id) => {
                    if (indexedFields.includes(formKey)) {
                        const index = indexCounters[formKey] || 0;
                        formData.append(`${formKey}[${index}]`, id);
                        indexCounters[formKey] = index + 1;
                    } else {
                        formData.append(`${formKey}`, id.toString());
                    }
                });
            } else if (component?.id) {
                if (indexedFields.includes(formKey)) {
                    formData.append(`${formKey}[0]`, component.id.toString());
                } else {
                    formData.append(`${formKey}`, component.id.toString());
                }
            }
        });

        try {
            await instanceAxios.post("/builds", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => {
                console.log(res)
                if (res.status === 201) {
                    unsetPriceStore();
                    unsetConfigureStore();
                    router.push(`/computer/${res.data.data.id}`);
                }
            })
        } catch (err) {
            console.error("Ошибка при сохранении:", err);
        }
    };




    return (
        <>
            <h1 className="text-center text-[30px] lg:text-[50px] mb-[50px]">{t('chooseComputer')}</h1>
            <div className="md:flex justify-around md:relative">
                <div className="text-center mb-[80px] flex flex-col items-center md:sticky md:mr-[20px] top-[20px] self-start">
                    <div className="">
                        <input type="file" accept="image/*" onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                                console.log(e.target.files[0])
                                setPcImage(e.target.files[0])
                                const src = URL.createObjectURL(e.target.files[0])
                                setImage(src)
                            } 
                        }} id="real-input" hidden />
                        <label htmlFor="real-input">
                            <div className="py-[10px] my-[20px] bg-[#242424] rounded-[10px]">
                                <div className="px-[10px]">
                                    <Image alt="add photo" className="cursor-pointer rounded-[10px] w-[200px] md:w-[300px] md:h-[300px]" src={image ? image : '/img/Upload.svg'} width={300} height={300} />
                                </div>
                            <p className="my-[20px] cursor-pointer">{t('uploadPhoto')}</p>
                            <button onClick={() => {
                                setPcImage(null)
                                setImage("")
                            }} className="text-[#ffffff] py-[8px] px-[25px] rounded-[10px] bg-[#FF5252] cursor-pointer">Remove photo</button>
                            </div>
                        </label>
                    </div>
                    <input type="text" value={pcName} onChange={e => setPcName(e.target.value)} placeholder={t('pcName')} className="text-center rounded-[20px] py-[10px] px-[50px] bg-[#242424]" />
                    <Textarea value={pcDescription} onChange={e => setPcDescription(e.target.value)} className="my-[20px] w-[80%] text-[25px] md:text-[20px] resize-none bg-[#242424] border-none" placeholder={t('pcDescription')} />
                    <p className="my-[20px]">{t('totalPrice')} {totalPrice}₸</p>
                    {/* <p className="my-[20px]">Total power: {totalPower}</p> */}

                    <button
                        onClick={handleSubmit}
                        className="bg-[#FFCC70] py-[10px] px-[70px] text-[#1A1A1A] rounded-[10px]"
                    >
                        {t('saveConfigure')}
                    </button>

                </div>
                <div className="">
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

        </>
    )
}

export default Configure