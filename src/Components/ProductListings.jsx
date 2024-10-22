import { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import Listing from "./Listing.jsx";
import Gift_ico from "../assets/gift_ico.svg";
import {BsDot} from "react-icons/bs";
import loadingImg from "../assets/loading.jpg";


const ProductListings = () => {

    const [Products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://monitor-backend-rust.vercel.app/api/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("API Error: ", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <section>
            {loading
                ? (<img src={loadingImg} className="flex mx-auto" alt="Loading"/>)
                : (
                    <>
                        <div className="flex w-full justify-between">
                            <div>
                                <p> Hard to choose right products for your pets? </p>
                                <h2 className="text-2xl font-bold"> Our Products </h2>
                            </div>
                            <button className="hidden lg:visible lg:flex items-center bg-transparent text-blue-950
                            border-2 border-blue-950 px-8 py-3 rounded-full hover:bg-gray-100"> View more &nbsp;
                                <FaAngleRight/> </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10">
                            {Products.map((product) => (
                                <Listing key={product.id} item={product} txt1={"Product"} txt2={"Size"}
                                         Free={
                                             <div className="flex bg-[#FCEED5] m-2 py-3 rounded-md items-center">
                                                 <img src={Gift_ico} alt="Gift Icon" className="h-6 pl-3 pr-2"/>
                                                 <BsDot/>
                                                 <p className="text-blue-950 font-bold px-2 text-sm"> Free Toy & Free
                                                     Shaker </p>
                                             </div>

                                         }
                                />
                            ))}
                        </div>
                        <button className="lg:hidden w-full flex items-center justify-center bg-transparent text-blue-950 border-2
            border-blue-950 px-8 py-3 my-3 rounded-full hover:bg-gray-100"> View more &nbsp; <FaAngleRight/>
                        </button>
                    </>
                )}

        </section>
    );
};
export default ProductListings;