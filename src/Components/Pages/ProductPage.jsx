import {useEffect, useState} from "react";
import {FaAngleRight, FaFacebook, FaLink, FaWhatsapp} from "react-icons/fa";
import { useParams, useNavigate, useLocation } from "react-router";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Navigation, Pagination, Thumbs} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import placeHolderImg from "../../assets/placeholder.svg";
import {BsChatLeftDots} from "react-icons/bs";
import {
    FacebookShareButton, TwitterShareButton, WhatsappShareButton
} from "react-share";
import {FaXTwitter} from "react-icons/fa6";
import {AiOutlineShareAlt} from "react-icons/ai";
import shield from "../../assets/shield.svg";
import dog from "../../assets/dog.svg";
import loadingImg from "../../assets/loading.jpg";
import PetListings from "../PetListings.jsx";

const ProductPage = () => {
    const { category, id } = useParams();  // Get category and ID from URL
    const navigate = useNavigate();
    const location = useLocation();

    // Access the passed item from the previous page via location.state
    const productItem = location.state?.item;
    console.log(productItem);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [copySuccess, setCopySuccess] = useState(false);


    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [slides, setSlides] = useState(3);
    const [chunkSize, setChunkSize] = useState(4); // Default chunk size

    // Function to calculate `chunkSize` based on screen width
    const updateChunkSizeBasedOnWidth = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 1280) {
            setChunkSize(4); // Large screens
        } else if (screenWidth >= 1024) {
            setChunkSize(3); // Large screens
            setSlides(3); // Large screens
        } else if (screenWidth >= 768) {
            setChunkSize(2); // Medium screens
            setSlides(2); // Medium screens
        } else {
            setChunkSize(1); // Small screens
            setSlides(1); // Small screens
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


    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 3000); // Reset message after 3 seconds
        });
    };

    const goToHome = () => {
        navigate('/');
    };

    // Fetch Customers data from the API
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch("https://monitor-backend-rust.vercel.app/api/customers");
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error("API Error: ", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCustomers();
    }, []);

    return (
        <>
            <div className="mx-5 pt-16 md:mx-20">
                <div className="lg:flex lg:justify-between rounded-xl border p-4 my-8">
                    {/* images */}
                    <div className=" lg:w-[40dvw]">
                        <div>
                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-pagination-color': '#fff',
                                }}
                                loop={true}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper2"
                            >
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={productItem?.item.image} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={true}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper"
                            >
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={productItem?.item.image} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="bg-blue-100 justify-center flex">
                                        <img className="w-full h-full" src={placeHolderImg} alt="placeholder"/>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>


                        <div className="my-3">

                            <div className="1.5Xxl:flex bg-[#FFE7BA] p-3 rounded-lg my-3">
                                <p className="1.5Xxl:w-1/2 py-1 text-blue-950 text-sm font-bold flex">
                                    <img className="w-5" src={shield}/>&nbsp; 100% health guarantee for pets
                                </p>
                                <p className="1.5Xxl:w-1/2 py-1 text-blue-950 text-sm font-bold flex">
                                    <img className="w-5"  src={dog}/>&nbsp; 100% guarantee of pet identification
                                </p>
                            </div>

                            {/* Share Buttons */}
                            <div className="flex space-x-4">
                                <p className="text-blue-950 font-bold flex items-center">
                                    <AiOutlineShareAlt/>&nbsp; Share: </p>
                                {/* Share Buttons */}
                                <FacebookShareButton url={window.location.href} quote={""} hashtag="#AboutUs">
                                    <FaFacebook className="text-gray-500 text-xl hover:text-blue-950"/>
                                </FacebookShareButton>

                                <TwitterShareButton url={window.location.href} title={""}
                                                    hashtags={["AboutUs", "Company"]}>
                                    <FaXTwitter className="text-gray-500 text-xl hover:text-blue-950"/>
                                </TwitterShareButton>

                                <WhatsappShareButton url={window.location.href} title={""}>
                                    <FaWhatsapp className="text-gray-500 text-xl hover:text-blue-950"/>
                                </WhatsappShareButton>

                                {/* Copy Link Button */}
                                <button onClick={handleCopyLink} className="flex items-center justify-center
                                bg-gray-500 text-white text-sm p-1 rounded-full hover:bg-blue-950">
                                    <FaLink/>
                                </button>
                            </div>
                            {/* Copy Success Message */}
                            {copySuccess && (
                                <div className="text-green-500">
                                    *Link copied to clipboard!
                                </div>
                            )}
                        </div>
                    </div>

                    {/* details */}
                    <div className="w-full sm:px-8">
                        {/* path */}
                        <div className='sm:flex mb-5'>
                            <button className=" pt-3 text-gray-500 text-sm flex items-center"
                                    onClick={goToHome}> Home &nbsp; <FaAngleRight/></button>
                            <button className="pl-4 pt-3 text-gray-500 text-sm flex items-center"
                                    onClick={() => navigate(`/category/`)}> Category &nbsp; <FaAngleRight/></button>
                            <button className="pl-4 pt-3 text-gray-500 text-sm flex items-center"
                                    onClick={() => navigate(`/category/${category}`)}> {category} &nbsp; <FaAngleRight/>
                            </button>
                            <div className="pl-4 pt-3 text-gray-500 text-sm flex items-center">
                                {id}
                            </div>
                        </div>

                        <div>
                            {/* Render product details */}
                            <p className="hidden sm:block my-3 text-gray-500"> ID {productItem?.item.id} </p>
                            <h1 className="my-3 text-blue-950 text-3xl font-bold"> {productItem?.item.breed || "Product Name"} </h1>
                            <div className="flex">
                                <p className="my-3 text-blue-950 text-2xl font-semibold"> Price:&nbsp; </p>
                                <p id={"currency"} className="my-3 text-blue-950 text-2xl font-semibold"> {productItem?.item.price} </p>
                            </div>

                            <div className="py-3 sm:flex">
                            <button onClick={() => navigate(`/contact`)}
                                        className="bg-blue-950 text-white px-8 py-3 rounded-full hover:bg-blue-700">
                                    Contact Us
                                </button>
                                <button onClick={() => alert("Not Available")} className="flex items-center border-2 border-blue-950 text-blue-950 font-bold
                                my-3 sm:my-0 sm:mx-5 px-8 py-3 rounded-full hover:bg-blue-700">
                                    <BsChatLeftDots/>&nbsp; Chat with Monito
                                </button>
                            </div>
                            {Object.entries(productItem?.item || {}).map(([key, value], index) => (
                                <div key={index} className={`${(key === "image") ? "hidden" : ""} flex my-3 border-b py-2`}>
                                    <p className="text-gray-500 flex w-1/2"> {key} </p>
                                    {/* Check if this is the last item */}
                                    <div className="flex">
                                        <p className="text-gray-500 flex"> :&nbsp; </p>
                                        <p className="text-gray-500 flex" id={key === "price" ? "currency" : ""}> {value} </p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Customers */}
                <div className=" justify-center">
                    {loading
                        ? (<img src={loadingImg} className="flex mx-auto" alt="Loading"/>)
                        : (
                            <>
                                <Swiper
                                    slidesPerView={slides}
                                    spaceBetween={30}
                                    pagination={{
                                        dynamicBullets: true,
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper max-w-[850px] py-10"
                                >
                                    {customers.map((customer, index) => (
                                        <SwiperSlide key={index}>
                                            {/* image with hover */}
                                            <div className=" flex justify-center">
                                                <div className="relative group" >
                                                    <img className="mx-auto h-96 rounded-xl object-cover" src={customer.image}
                                                         alt="customer"/>
                                                    <div className="absolute bg-blue-950 rounded-xl
                                                opacity-0 group-hover:opacity-100
                                                transition-opacity duration-500
                                                top-0 bottom-0 left-0 right-0 w-full h-full
                                                flex items-center justify-center">

                                                        <div>
                                                            <p className="p-5 text-white font-black text-3xl text-center">
                                                                {customer.name} </p>
                                                            <p className="p-5 text-white text-3xl text-center">
                                                                and their pet </p>
                                                            <p className="p-5 text-white font-black text-3xl text-center">
                                                                {customer.pet} </p>
                                                        </div>


                                                    </div>
                                                </div>

                                            </div>


                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </>
                        )
                    }

                </div>

                {/* pet listings */}
                <PetListings isHome={true} chunkSize={chunkSize}/>

            </div>
        </>
    );
};

export default ProductPage;


