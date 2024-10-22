import Hero from "../Hero.jsx";
import BannerText from "../BannerText.jsx";
import BannerImg from "../BannerImg.jsx";
import {FaRegPlayCircle} from "react-icons/fa";
import Banner from "../Banner.jsx";
import PetListings from "../PetListings.jsx";
import ProductListings from "../ProductListings.jsx";
import SellerListings from "../SellerListings.jsx";

import banner1Img from "../../assets/banner1.png";
import banner1ImgMobile from "../../assets/banner1_mobile.png";
import banner2Img from "../../assets/banner2.png";
import {useEffect, useState} from "react";


const HomePage = () => {

    const [chunkSize, setChunkSize] = useState(8); // Default chunk size

    // Function to calculate `chunkSize` based on screen width
    const updateChunkSizeBasedOnWidth = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 1280) {
            setChunkSize(8); // Large screens
        } else if (screenWidth >= 1024) {
            setChunkSize(6); // Large screens
        } else if (screenWidth >= 768) {
            setChunkSize(4); // Medium screens
        } else {
            setChunkSize(2); // Small screens
        }
    };

    // Run on mount and when the window is resized
    useEffect(() => {
        updateChunkSizeBasedOnWidth(); // Initial setup
        window.addEventListener("resize", updateChunkSizeBasedOnWidth);

        return () => {
            window.removeEventListener("resize", updateChunkSizeBasedOnWidth); // Clean up
        };
    }, []);

    return (
        <>
            <Hero/>
            <div className="m-5 md:m-20">

                {/* pet listings */}
                <PetListings isHome={true} chunkSize={chunkSize}/>

                {/* banner 1 */}
                <Banner bg_style={"bg-[#003459] w-full rounded-[40px] my-10"}
                        style={"bg-banner1-mobile xl:bg-banner1 bg-cover bg-center flex flex-col xl:flex-row items-center " +
                            "justify-between px-16 max-xl:px-10 xl:mx-auto rounded-[40px]"}>

                    {/* image */}
                    <div className="hidden xl:block">
                        <BannerImg hero={banner1Img} hero_mobile={banner1ImgMobile}/>
                    </div>
                    {/* text */}
                    <BannerText button1={" View Intro "}
                                ico1={<FaRegPlayCircle className="ml-2 text-xl"/>}
                                button2={"Explore Now"}
                                txt1={"One More Friend"}
                                txt2={"Thousands More Fun!"}
                                txt3={"Having a pet means you have more joy, a new friend, a happy person who will always " +
                                    "be with you to have fun. We have 200+ different pets that can meet your needs!"}
                                style = { "max-xl:flex max-xl:flex-col max-xl:items-center max-xl:text-center xl:text-right" }
                                btnStyle={"justify-end"}
                    />

                    <div className="xl:hidden">
                        <BannerImg hero={banner1Img} hero_mobile={banner1ImgMobile}/>
                    </div>
                </Banner>

                {/* product listings */}
                <ProductListings/>



                {/* seller listings */}
                <SellerListings/>

                {/* banner 2 */}
                <Banner bg_style={"bg-[#FFB775] w-full rounded-[40px] my-10"}
                        style={"max-xl:hidden bg-banner2 bg-cover bg-center flex flex-col xl:flex-row items-center " +
                            "justify-between px-16 max-xl:px-10 xl:mx-auto rounded-[40px]"}>
                    {/* text */}
                    <BannerText button1={"Explore Now"}
                                ico2={<FaRegPlayCircle className="ml-2 text-xl"/>}
                                button2={" View Intro "}
                                txt1={"Adoption"}
                                txt2={"We need help. so do they."}
                                txt3={"Adopt a pet and give it a home, it will be love you back unconditionally."}
                                style = { "max-xl:flex max-xl:flex-col max-xl:items-center max-xl:text-center" }
                                b1Style={"bg-blue-950 text-white px-8 py-3 rounded-full hover:bg-blue-700"}
                                b2Style={"flex items-center bg-transparent text-blue-950 border-2 border-blue-950 px-8 py-3 rounded-full hover:bg-gray-100"}
                    />

                    <div className="w-1/3">
                        <BannerImg hero={banner2Img}/>
                    </div>

                </Banner>
            </div>


        </>
    );
};
export default HomePage;