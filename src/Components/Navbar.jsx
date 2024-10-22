import { useEffect, useRef, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import logo from '../assets/logo.svg';
import VN from '../assets/flag-vn.png';
import LK from '../assets/flag-lk.png';
import US from '../assets/flag-us.png';
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { FaCaretDown } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
    const [isDropDownOpen, setIsDropDownOpen] = useState(false); // State for dropdown
    const dropdownRef = useRef(null); // Ref to the dropdown element
    const location = useLocation(); // Hook to get the current location (URL)


    const [from, setFrom] = useState("VND");


    const [sort, setSort] = useState(
        <div className="flex items-center space-x-2 px-4">
            <img src={VN} alt="Vietnam Flag" className="size-5"/>
            <span className="text-blue-900 ">VND</span>
        </div>
    );

    const linkClass = ({isActive}) =>
        isActive
            ? "hover:text-blue-700 border-b-4 border-blue-950"
            : "hover:text-blue-700";

    const menuClick = () => {
        setMenuOpen(!menuOpen);
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    };

    const toggleDropdown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    const handleDropdownClick = (option, txt) => {
        setSort(option);
        setIsDropDownOpen(false);
        updateCurrencyValues(txt);
    };

    // Update currency values
    const updateCurrencyValues = async (to) => {
        let rate;

        // Fetch the rate asynchronously
        try {
            rate = await getRate(to);  // Ensure rate is fetched before proceeding
        } catch (error) {
            rate = 1;  // Fallback to 1 in case of error
            console.error('Error fetching rate:', error);
        }

        // Now proceed with updating the currency elements after rate is fetched
        const currencyElements = document.querySelectorAll("#currency");
        currencyElements.forEach((el) => {
            let currentValue = el.textContent.replaceAll(",", "")

            el.textContent = `${(parseFloat(currentValue) * rate).toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${to}`;
        });

        setFrom(to); // Update the base currency after conversion
    };


    const getRate = async (to) => {
        let rate = 1;  // Default to 1 in case of any error

        try {
            const response = await fetch(`https://api.currencyapi.com/v3/latest?apikey=cur_live_mu1ooMmC3I294OHo5Y0lRXt7xyxVjVzY0Wmgpd0A&currencies=${to}&base_currency=${from}`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);  // Handle non-200 responses
            }

            const data = await response.json();
            rate = parseFloat(data.data[to].value);  // Assign the actual rate from the API response
        } catch (error) {
            alert("Currency Conversion API Error");
            console.error("Currency Conversion Error: ", error);
            rate = 1;  // Set rate to 1 in case of any error
        }

        return rate;
    };




    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropDownOpen(false);
        }
    };

    // Reset currency when the path changes
    useEffect(() => {
        setSort(
            <div className="flex items-center space-x-2 px-4">
                <img src={VN} alt="Vietnam Flag" className="size-5"/>
                <span className="text-blue-900 ">VND</span>
            </div>
        );
    }, [location.pathname]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const curr1 = (
        <div className="flex items-center space-x-2 px-4">
            <img src={VN} alt="Vietnam Flag" className="size-5"/>
            <span className="text-blue-900 ">VND</span>
        </div>
    );

    const curr2 = (
        <div className="flex items-center space-x-2 px-4">
            <img src={LK} alt="Sri Lanka Flag" className="size-5"/>
            <span className="text-blue-900 ">LKR</span>
        </div>
    );

    const curr3 = (
        <div className="flex items-center space-x-2 px-4">
            <img src={US} alt="US Flag" className="size-5"/>
            <span className="text-blue-900 ">USD</span>
        </div>
    );

    const dropDown = (
        <div className="relative mx-2" ref={dropdownRef}>
            <div onClick={toggleDropdown} className={`cursor-pointer appearance-none p-3 pr-6 pl-4 
                                ${isDropDownOpen ? "bg-gray-100 rounded-t-3xl" : "rounded-full"}  w-full flex justify-between items-center`}>
                <span>{sort}</span>
                <FaCaretDown className="text-blue-950 "/>
            </div>

            {isDropDownOpen && (
                <ul className="absolute left-0 w-full bg-white border-2 border-t-0 rounded-b-3xl shadow-lg z-10">
                    <li onClick={() => handleDropdownClick(curr1, "VND")}
                        className="cursor-pointer px-4 py-2 hover:bg-blue-100">
                        {curr1}
                    </li>
                    <li onClick={() => handleDropdownClick(curr2, "LKR")}
                        className="cursor-pointer px-4 py-2 hover:bg-blue-100">
                        {curr2}
                    </li>
                    <li onClick={() => handleDropdownClick(curr3, "USD")}
                        className="cursor-pointer px-4 py-2 hover:bg-blue-100">
                        {curr3}
                    </li>
                </ul>
            )}
        </div>
    );

    return (
        <header className="flex w-full justify-center absolute">
            <div className="max-lg:container mx-auto flex items-center justify-between px-8 py-4 bg-transparent">
                <div>
                    <button onClick={menuClick} className="focus:outline-none">
                        <FaBars className="block lg:hidden text-4xl"/>
                    </button>
                </div>

                <div className="flex items-center mx-4">
                    <NavLink to="/" className=""><img src={logo} alt="Monito Logo" className="h-10"/></NavLink>
                </div>

                <nav className={"hidden lg:block space-x-8 mx-4"}>
                    <ul className="flex text-base font-bold space-x-8 text-blue-950">
                        <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
                        <li><NavLink to="/category" className={linkClass}>Category</NavLink></li>
                        <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
                        <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
                    </ul>
                </nav>

                <div className="relative flex items-center mx-4 max-xl:mx-6 ml-auto">
                    <input type="text" placeholder="Search something here!"
                           className="hidden xl:block rounded-full pl-12 py-2 w-64 border-gray-300 focus:outline-none
                           focus:ring-2 focus:ring-blue-500"/>
                    <button className="absolute xl:left-4 max-xl: max-xl:p-2 max-xl:rounded-full max-xl:-left-6">
                        <PiMagnifyingGlassBold className="text-gray-500 text-2xl"/>
                    </button>
                </div>

                <button onClick={scrollToBottom} className="hidden lg:block bg-blue-950 text-white py-2 px-6 rounded-full hover:bg-blue-900">Join the community</button>

                <div className="hidden lg:block">
                    {dropDown}
                </div>
            </div>

            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#FCEED5] shadow-lg lg:hidden">
                    <nav className="px-8 py-4">
                        <ul className="flex flex-col text-xl font-bold space-y-4 text-blue-950">
                            <li><NavLink onClick={menuClick} to="/" className={linkClass}>Home</NavLink></li>
                            <li><NavLink onClick={menuClick} to="/category" className={linkClass}>Category</NavLink></li>
                            <li><NavLink onClick={menuClick} to="/about" className={linkClass}>About</NavLink></li>
                            <li><NavLink onClick={menuClick} to="/contact" className={linkClass}>Contact</NavLink></li>

                            <li><a href="#" className="hover:text-blue-700 font-black flex">
                                {dropDown}
                            </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
