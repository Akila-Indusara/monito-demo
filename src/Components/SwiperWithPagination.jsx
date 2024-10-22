// Import Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import 'swiper/css';              // Core Swiper styles
import 'swiper/css/pagination';   // Pagination styles (if you're using pagination)


const SwiperWithPagination = () => {
    return (
        <div className="w-full">
            <p> fff </p>
            <Swiper
                // Configure Swiper modules
                modules={[Pagination]}
                spaceBetween={50}
                slidesPerView={3} // Change this for how many slides per view
                pagination={{ clickable: true }} // Enable pagination
                loop={true} // Enable continuous loop
            >
                {/* Swiper slides */}
                <SwiperSlide>
                    <div className="p-5 bg-gray-200 rounded-md">
                        <h3>Slide 1</h3>
                        <p>Content for the first slide</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="p-5 bg-gray-200 rounded-md">
                        <h3>Slide 2</h3>
                        <p>Content for the second slide</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="p-5 bg-gray-200 rounded-md">
                        <h3>Slide 3</h3>
                        <p>Content for the third slide</p>
                    </div>
                </SwiperSlide>
                {/* Add more SwiperSlide components as needed */}
            </Swiper>
        </div>
    );
};

export default SwiperWithPagination;
