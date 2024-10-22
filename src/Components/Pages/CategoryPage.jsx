import {useEffect, useState} from "react";
import BannerText from "../BannerText.jsx";
import BannerImg from "../BannerImg.jsx";
import Banner from "../Banner.jsx";
import ListingsCategory from "../ListingsCategory.jsx";
import Listing from "../Listing.jsx";

import { FaRegPlayCircle } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

import categories from "../../assets/categories.json";
import placeHolder from "../../assets/placeholder.svg";
import banner1Img from "../../assets/banner1.png";
import banner1ImgMobile from "../../assets/banner1_mobile.png";
import {useNavigate, useParams} from "react-router";


const CategoryPage = () => {

    const { category: categoryParam } = useParams();  // get category from URL if exists
    const [category, setCategory] = useState("category");

    const navigate = useNavigate();

    // Sync state with URL category param
    useEffect(() => {
        if (categoryParam) {
            setCategory(categoryParam);
        } else {
            setCategory("category");
        }
    }, [categoryParam]);

    const changeCategory = (name) => {
        setCategory(name);
        if (name !== "category") {
            navigate(`/category/${name}`);
        }
    };

    const goToHome = () => {
        navigate('/');
    };

    return (
        <>
            <div className="mx-5 pt-16 md:mx-20">
                <div className='flex mb-5'>
                    <button className="pl-4 pt-3 text-gray-500 text-sm flex items-center"
                            onClick={goToHome}> Home &nbsp; <FaAngleRight/></button>
                    <button className="pl-4 pt-3 text-gray-500 text-sm flex items-center"
                            onClick={() => changeCategory("category")}> Category</button>
                    <div className= {(category === "category") ? "hidden": "pl-4 pt-3 text-gray-500 text-sm flex " +
                        "items-center"} >  <FaAngleRight/> &nbsp; { category } </div>
                </div>

                {/* banner 1 */}
                <Banner bg_style={"bg-[#003459] w-full rounded-[40px] mt-2 mb-10"} style={ "bg-banner1-mobile xl:bg-" +
                    "banner1 bg-cover bg-center flex flex-col xl:flex-row items-center justify-between px-16 " +
                    "max-xl:px-10 xl:mx-auto rounded-[40px]" }>
                    {/* image */}
                    <div className="hidden xl:block">
                        <BannerImg hero={banner1Img} hero_mobile={banner1ImgMobile}/>
                    </div>
                    {/* text */}
                    <BannerText
                        button1={" View Intro "}
                        ico1={<FaRegPlayCircle className="ml-2 text-xl"/>}
                        button2={"Explore Now"}
                        txt1={"One More Friend"}
                        txt2={"Thousands More Fun!"}
                        txt3={
                            "Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun. We have 200+ different pets that can meet your needs!"
                        }
                        style={
                            "max-xl:flex max-xl:flex-col max-xl:items-center max-xl:text-center xl:text-right"
                        }
                        btnStyle={"justify-end"}
                    />

                    <div className="xl:hidden">
                        <BannerImg hero={banner1Img} hero_mobile={banner1ImgMobile}/>
                    </div>
                </Banner>

                <h1 className="text-5xl text-blue-950 font-black justify-center flex my-10"> Categories </h1>
                <div>
                    {category === "category" ? (
                        <Categories changeCategory={changeCategory}/>
                    ) : (
                        <ListingsCategory category={category}/>
                    )}
                </div>

            </div>
        </>
    );
};

// eslint-disable-next-line react/prop-types
const Categories = ({ changeCategory }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10">
            {categories.map((category) => (
                <button key={category.id} onClick={() => changeCategory(category.name)}>
                    <Listing item={{ name: category.name, image: placeHolder }}/>
                </button>
            ))}
        </div>
    );
};

export default CategoryPage;
