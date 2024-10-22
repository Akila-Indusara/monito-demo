import BannerText from "./BannerText.jsx";
import BannerImg from "./BannerImg.jsx";

import hero from "../assets/hero.png";
import hero_mobile from "../assets/hero_mobile.png";

import Banner from "./Banner.jsx";
import {FaRegPlayCircle} from "react-icons/fa";

const Hero = () => {
    return (
        <Banner>
            {/* text */}
            <div className="mt-24">
                <BannerText button1 = { " View Intro " }
                            ico1={ <FaRegPlayCircle className="ml-2 text-xl"/> }
                            button2 ={ "Explore Now"}
                            txt1 = { "One More Friend" }
                            txt2 = { "Thousands More Fun!" }
                            txt3 = { "Having a pet means you have more joy, a new friend, a happy person who will always " +
                                "be with you to have fun. We have 200+ different pets that can meet your needs!" }
                />
            </div>

            {/* image */}
            <div className="lg:mt-24">
                <BannerImg hero = { hero } hero_mobile = { hero_mobile } />
            </div>
        </Banner>
    );
};
export default Hero;