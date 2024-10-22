import logo from "../assets/logo.svg";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import {useState} from "react";
import {NavLink} from "react-router-dom";



const Footer = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleRegisterClick = () => {
        if (validateEmail(email)) {
            setError('');
            console.log('Email entered:', email);
            alert(`Registered with email: ${email}`);
            // submission logic
        } else {
            setError('*Please enter a valid email address');
        }

    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email); // Returns true if email is valid
    };

    const linkClass = ({isActive}) =>
        isActive
            ? "hover:text-blue-700 border-b-4 border-blue-950"
            : "hover:text-blue-700"

    return (
        <footer className="bg-gradient-to-br from-[#FCEED5] to-[#FFE7BA] w-full mt-16 rounded-t-[40px]">
            <div className="mx-6 lg:mx-16 pt-14">

                {/* Register */}
                <div className="bg-blue-950 p-8 lg:p-14 mb-3 rounded-3xl lg:flex justify-between w-full">

                    <p className="flex text-3xl text-white lg:w-1/2 max-lg:mb-6"> Register Now So You Don&#39;t Miss Our Programs</p>

                    <div className="lg:w-1/2 bg-white p-3 rounded-2xl">

                        <div className="lg:flex">
                            <input
                                type="text"
                                placeholder="Enter your email address"
                                className="p-2 w-full rounded-lg outline outline-gray-300"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <button onClick={handleRegisterClick}
                                    className="bg-blue-950 text-white px-4 lg:ml-3 rounded-lg max-lg:w-full max-lg:py-2 max-lg:mt-3">Register
                            </button>
                        </div>

                        {/* error message */}
                        {error && <p className="text-red-500 text-sm mt-2 pl-3">{error}</p>}

                    </div>

                </div>

                <div className="border-b-2 border-[#CCD1D2] lg:flex mx-auto py-6 w-full justify-between">
                    {/* Navigation */}
                    <nav className={"space-x-8"}>
                        <ul className="flex mx-auto justify-between w-full text-base font-bold max-lg:px-6 lg:space-x-8 text-blue-950">
                            <li><NavLink to="/" className={linkClass} >Home</NavLink></li>
                            <li><NavLink to="/category" className={linkClass} >Category</NavLink></li>
                            <li><NavLink to="/about" className={linkClass} >About</NavLink></li>
                            <li><NavLink to="/contact" className={linkClass} >Contact</NavLink></li>
                        </ul>
                    </nav>

                    {/* Social Media */}
                    <ul className="flex justify-center max-lg:mx-auto max-lg:pt-8 max-lg:w-full text-base font-bold space-x-8 text-blue-950">
                        <li><a href="#" className="hover:text-blue-700 "><FaFacebook /></a></li>
                        <li><a href="#" className="hover:text-blue-700"><FaXTwitter /></a></li>
                        <li><a href="#" className="hover:text-blue-700"><FaInstagram /></a></li>
                        <li><a href="#" className="hover:text-blue-700"><FaYoutube /></a></li>
                    </ul>

                </div>

                {/* Footer */}
                <div className="flex py-2 justify-center">
                    <div className="w-full mx-auto lg:flex lg:justify-between lg:items-center lg:space-x-10 py-4 text-center">

                        <p className="hidden lg:block text-gray-500 ">© 2022 Monito. All rights reserved.</p>

                        {/* Logo */}
                        <img src={logo} alt="Monito Logo" className="h-10 mx-auto max-lg:my-3"/>

                        <div className="text-gray-500 flex justify-center space-x-6 max-lg:my-5">
                            <p>Terms of Service</p>
                            <p>Privacy Policy</p>
                        </div>

                        <p className="lg:hidden text-gray-500 ">© 2022 Monito. All rights reserved.</p>
                    </div>
                </div>


            </div>
        </footer>
    );
};
export default Footer;
