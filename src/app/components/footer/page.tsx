'use client'

import Image from "next/image"
import { useTranslation } from "react-i18next"
import '@/lib/i18n';

const Footer = () => {
    const {t} = useTranslation("common")

    return (
        <>
            <footer className="mt-[180px]">
                            <div className="w-full border-b my-[20px] border-[#FFCC70]" />

                <div className=" mx-[20px] px-[40px] py-[24px] rounded-[20px] flex justify-between items-center mb-[20px]">
                    <div className="">
                        {/* <Link className="flex text-[25px] lg:text-[40px] fw-[700] " href="/">Tech <Image width={70} height={65} className="px-[5px] w-[40px] lg:w-[70px] lg:h-[65px]" src="/img/logo.svg" alt="" />Tinker</Link> */}

                        <p className="flex text-[25px] lg:text-[40px] text-[#3E3E3E] fw-[700]">
                            Tech
                            <Image className="px-[5px]" src="/img/footer_logo.svg" width={50} height={50} alt="logo" />
                            Tinker
                        </p>

                    </div>
                    <div className="">
                        <p>{t("rights")}</p>
                    </div>
                    <div className="">
                        <p className="mb-[15px]">{t('weMedia')}</p>
                        <div className="flex justify-center items-center gap-[10px]">
                            <a target="_blank" href="https://www.instagram.com/po4ti_ka3ax/">
                                <Image src="/img/instagram.svg" width={30} height={30} alt="telegram"/>
                            </a>
                            <a target="_blank" href="https://t.me/po4ti_kana1">
                                <Image src="/img/telegram.svg" width={30} height={30} alt="telegram"/>
                            </a>
                            <a target="_blank" href="#">
                                <Image src="/img/youtube.svg" width={30} height={30} alt="youtube"/>
                            </a>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default Footer