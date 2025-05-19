'use client'

import { Navigation, Pagination } from "swiper/modules"
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
const Slider = () => {
    return (
        <>
            <div className="max-w-[500px] flex items-center">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay:3000,
                        disableOnInteraction:false
                    }}
                    allowTouchMove={false}
                    loop={true}
                >
                    <SwiperSlide>
                        <img src="/img/pc1.png" width={600} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/img/pc2.png" width={600} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/img/pc3.png" width={600} alt="" />
                    </SwiperSlide>
                </Swiper>
            </div>

        </>
    )
}

export default Slider;