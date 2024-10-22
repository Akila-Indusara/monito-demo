import { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import {Swiper, SwiperSlide} from "swiper/react";
import { Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import img7 from "../assets/7.png";


const PetListings = () => {

    const [swiperSize, setswiperSize] = useState(8); // Default chunk size

    // Function to calculate `swiperSize` based on screen width
    const updateswiperSizeBasedOnWidth = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 1280) {
            setswiperSize(4); // Large screens
        } else if (screenWidth >= 1024) {
            setswiperSize(3); // Large screens
        } else if (screenWidth >= 768) {
            setswiperSize(2); // Medium screens
        } else {
            setswiperSize(1); // Small screens
        }
    };

    // Run on mount and when the window is resized
    useEffect(() => {
        updateswiperSizeBasedOnWidth(); // Initial setup
        window.addEventListener("resize", updateswiperSizeBasedOnWidth);

        return () => {
            window.removeEventListener("resize", updateswiperSizeBasedOnWidth); // Clean up
        };
    }, []);

    return (
        <section>
            <div className="flex w-full justify-between pt-10 ">
                <div className="flex ">
                    <p className=" text-xl text-blue-950"> Proud to be part of </p>
                    <h2 className=" text-2xl font-bold text-blue-950 px-4"> Pet Sellers </h2>
                </div>
                <button className="hidden lg:visible lg:flex items-center bg-transparent text-blue-950 border-2 border-blue-950 px-8 py-3
                rounded-full hover:bg-gray-100"> View more &nbsp; <FaAngleRight />
                </button>
            </div>

            <Swiper
                key={swiperSize}
                slidesPerView={swiperSize}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide className="my-auto mx-auto p-8"><img src={img1} className="justify-center w-full h-full"/></SwiperSlide>
                <SwiperSlide className="my-auto mx-auto p-8"><img src={img2} className="justify-center w-full h-full"/></SwiperSlide>
                <SwiperSlide className="my-auto mx-auto p-8"><img src={img3} className="justify-center w-full h-full"/></SwiperSlide>
                <SwiperSlide className="my-auto mx-auto p-8"><img src={img4} className="justify-center w-full h-full"/></SwiperSlide>
                <SwiperSlide className="my-auto mx-auto p-8"><img src={img5} className="justify-center w-full h-full"/></SwiperSlide>
                <SwiperSlide className="my-auto mx-auto p-8"><img src={img6} className="justify-center w-full h-full"/></SwiperSlide>
                <SwiperSlide className="my-auto mx-auto p-8"><img src={img7} className="justify-center w-full h-full"/></SwiperSlide>
            </Swiper>
            <button className="lg:hidden w-full flex items-center justify-center bg-transparent text-blue-950 border-2
            border-blue-950 px-8 py-3 my-3 rounded-full hover:bg-gray-100"> View more &nbsp; <FaAngleRight />
            </button>
        </section>
    );
};
export default PetListings;