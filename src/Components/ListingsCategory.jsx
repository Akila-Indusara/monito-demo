import PetListings from "./PetListings.jsx";
import {FaCircle, FaFilter} from "react-icons/fa";
import {FaCircleHalfStroke} from "react-icons/fa6";
import {useEffect, useRef, useState} from "react";
import {MdKeyboardArrowDown} from "react-icons/md";

// eslint-disable-next-line react/prop-types
const ListingsCategory = ({ category }) => {

    // State for storing the filter selections
    const [gender, setGender] = useState([null]);
    const [color, setColor] = useState([null]);
    const [price, setPrice] = useState({ min: 0, max: 9000000 });
    const [size, setBreed] = useState([null]);
    const [sort, setSort] = useState("Sort by: Name ( A - Z )");
    const [chunkSize, setChunkSize] = useState(8); // Default chunk size
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [petAmount, setPetAmount] = useState(0);

    // Function to update petAmount
    const updatePetAmount = (newPetAmount) => {
        setPetAmount(newPetAmount);
    };
    
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };


    // Prevent background scrolling when popup is open
    useEffect(() => {
        if (isPopupOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        // Cleanup when component unmounts
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isPopupOpen]);

    // Function to calculate `chunkSize` based on screen width
    const updateChunkSizeBasedOnWidth = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 1280) {
            setChunkSize(9); // Large screens
        } else if (screenWidth >= 768) {
            setChunkSize(6); // Medium screens
        } else {
            setChunkSize(4); // Small screens
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

    // State for dropdown
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref to the dropdown element

    const handleGenderChange = (event) => {
        const { value, checked } = event.target;
        setGender(checked ? [value] : gender.filter((g) => g !== value));
    };

    const handleColorChange = (event) => {
        const { value, checked } = event.target;
        setColor(checked ? [value] : color.filter((c) => c !== value));
    };

    const handleBreedChange = (event) => {
        const { value, checked } = event.target;
        setBreed(checked ? [value] : size.filter((b) => b !== value));
    };

    const handlePriceChange = (event) => {
        const { name, value } = event.target;

        if (name === "min") {
            if (value < 3900000){
                setPrice({ ...price, [name]: 3900000 });
            } else if (value > price.max) {
                setPrice({ ...price, [name]: price.max });
            } else {
                setPrice({ ...price, [name]: value === '' ? null : value });
            }
        }
        if (name === "max") {
            if (value < 3900000) {
                setPrice({ ...price, [name]: 3900000 });
            } else if (value < price.min){
                setPrice({ ...price, [name]: price.min });
            } else if (value > 9000000) {
                setPrice({ ...price, [name]: 9000000 });
            } else {
                setPrice({ ...price, [name]: value === '' ? null : value });
                }
        }
    };

    // Function to toggle the dropdown
    const toggleDropdown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    const handleDropdownClick = (option) => {
        setSort(option);
        setIsDropDownOpen(false); // Close the dropdown after selection
    };

    // Function to close the dropdown when clicking outside
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropDownOpen(false); // Close dropdown if clicked outside
        }
    };

    // Add event listener to detect clicks outside
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const Filter = () => {
        return (
            <div className="mr-8">

                <h1 className="hidden lg:block text-3xl font-black text-blue-950 py-3 pb-6">Filter</h1>

                <div className="p-4">

                    {/* Gender Filter */}
                    <div className="mb-4 py-2 border-b-2">
                        <h3 className="font-semibold text-md mb-2">Gender</h3>
                        <div>
                            <label className="block">
                                <input type="checkbox" checked={gender[0] === "Male"} value="Male" onChange={handleGenderChange}/>
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="block">
                                <input type="checkbox" checked={gender[0] === "Female"}  value="Female" onChange={handleGenderChange}/>
                                <span className="ml-2">Female</span>
                            </label>
                        </div>
                    </div>

                    {/* Color Filter */}
                    <div className="mb-4 py-2 border-b-2">
                        <h3 className="font-semibold text-md mb-2">Color</h3>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input type="checkbox" checked={color[0] === "Red"} value="Red" onChange={handleColorChange}/>
                                <span
                                    className="ml-2 text-red-500 flex items-center text-sm"> <FaCircle/> &nbsp; </span>
                                <span> Red </span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" checked={color[0] === "Apricot"} value="Apricot" onChange={handleColorChange}/>
                                <span
                                    className="ml-2 text-orange-400 flex items-center text-sm"> <FaCircle/> &nbsp;</span>
                                <span> Apricot </span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" checked={color[0] === "Black"} value="Black" onChange={handleColorChange}/>
                                <span className="ml-2 text-black flex items-center text-sm"> <FaCircle/> &nbsp;</span>
                                <span> Black </span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" checked={color[0] === "BlackWhite"} value="BlackWhite" onChange={handleColorChange}/>
                                <span className="ml-2  flex items-center text-sm"> <FaCircleHalfStroke/> &nbsp; </span>
                                <span> Black & White </span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" checked={color[0] === "White"} value="White" onChange={handleColorChange}/>
                                <span
                                    className="ml-2 text-gray-400 flex items-center text-sm"> <FaCircle/> &nbsp; </span>
                                <span> White </span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" checked={color[0] === "Yellow"} value="Yellow" onChange={handleColorChange}/>
                                <span
                                    className="ml-2 text-yellow-300 flex items-center text-sm"> <FaCircle/> &nbsp; </span>
                                <span> Yellow </span>
                            </label>
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div className="mb-4 pb-4 border-b-2">
                        <h3 className="font-semibold text-md mb-2">Price</h3>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                min=""
                                max={price.max}
                                name="min"
                                value={price.min}
                                onChange={handlePriceChange}
                                placeholder="Min"
                                className="border rounded p-1 w-1/2"
                            />
                            <input
                                type="number"
                                min={price.min}
                                max=""
                                name="max"
                                value={price.max}
                                onChange={handlePriceChange}
                                placeholder="Max"
                                className="border rounded p-1 w-1/2"
                            />
                        </div>
                    </div>

                    {/* Breed Filter */}
                    <div className="mb-4 py-2 border-b-2">
                        <h3 className="font-semibold text-md mb-2">Breed</h3>
                        <div>
                            <label className="block">
                                <input type="checkbox" checked={size[0] === "Tiny"} value="Tiny" onChange={handleBreedChange}/>
                                <span className="ml-2">Small</span>
                            </label>
                            <label className="block">
                                <input type="checkbox" checked={size[0] === "Medium"} value="Medium" onChange={handleBreedChange}/>
                                <span className="ml-2">Medium</span>
                            </label>
                            <label className="block">
                                <input type="checkbox" checked={size[0] === "Large"} value="Large" onChange={handleBreedChange}/>
                                <span className="ml-2">Large</span>
                            </label>
                        </div>
                    </div>
                </div>
        </div>
        );
    };


    return (
        <div className="flex mx-auto justify-center w-full">

            {/* Filter */}
            <div className="hidden lg:block">
                <Filter/>
            </div>

            {/* Listings Section */}
            <div className="hid w-full lg:w-3/4">
                <div className="lg:flex justify-between items-center ">
                    <div className="flex items-end">
                        {/* Category */}
                        <h1 className="hidden lg:block text-3xl font-black text-blue-950"> {category}</h1>
                        <p className="hidden lg:block text-gray-500 px-4"> {petAmount} </p>
                    </div>

                    <div className="sm:flex justify-between">
                        {/* Dropdown */}
                        <div className=" relative w-[280px]" ref={dropdownRef}>
                            {/* Dropdown button */}
                            <div onClick={toggleDropdown} className={`cursor-pointer appearance-none p-3 pr-6 pl-8 border-2
                            ${isDropDownOpen ? "rounded-t-3xl" : "rounded-full"}  bg-white w-full flex justify-between items-center`}>
                                <span>{sort}</span>
                                {/* Custom dropdown arrow */}
                                <MdKeyboardArrowDown />
                            </div>

                            {/* Dropdown menu */}
                            {isDropDownOpen && (
                                <ul className="absolute left-0  w-full bg-white border-2 border-t-0  rounded-b-3xl shadow-lg z-10">
                                    <li onClick={() => handleDropdownClick("Sort by: Name ( A - Z )")}
                                        className="cursor-pointer px-4 py-2 hover:bg-blue-100">
                                        Sort by: Name ( A - Z )
                                    </li>
                                    <li onClick={() => handleDropdownClick("Sort by: Name ( Z - A )")}
                                        className="cursor-pointer px-4 py-2 hover:bg-blue-100">
                                        Sort by: Name ( Z - A )
                                    </li>
                                    <li onClick={() => handleDropdownClick("Sort by: Price ( Low - High )")}
                                        className="cursor-pointer px-4 py-2 hover:bg-blue-100">
                                        Sort by: Price ( Low - High )
                                    </li>
                                    <li onClick={() => handleDropdownClick("Sort by: Price ( High - Low )")}
                                        className="cursor-pointer px-4 py-2 hover:bg-blue-100">
                                        Sort by: Price ( High - Low )
                                    </li>
                                </ul>
                            )}
                        </div>

                        {/* Filter Mobile */}
                        <div>
                            <button className="lg:hidden flex items-center font-black text-blue-950 p-4 md:pr-10"
                                onClick={togglePopup} >
                                <FaFilter />
                                &nbsp; Filter
                            </button>

                            {isPopupOpen && (
                                <div
                                    className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-end"
                                    onClick={togglePopup} // Close popup when clicking outside
                                >
                                    <div
                                        className="w-full bg-white rounded-t-2xl p-6 relative z-50 max-h-[75vh] overflow-y-auto"
                                        onClick={(e) => e.stopPropagation()} // Prevent closing popup when clicking inside
                                    >
                                        <div className="fixed bg-white shadow rounded-t-2xl -m-6 p-4 flex justify-between items-start w-full">

                                            <h2 className="text-2xl font-black text-blue-950"> Filter </h2>

                                            {/* Close Button */}
                                            <button
                                                className="sticky text-xl font-bold text-gray-600"
                                                onClick={togglePopup}
                                            >
                                                &times; {/* Unicode for close icon */}
                                            </button>
                                        </div>
                                        <div className="pt-10">
                                            <Filter/>
                                        </div>


                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Category Mobile */}
                    <div className=" lg:hidden p-4 flex items-end">
                        {/* Category */}
                        <h1 className="text-3xl font-black text-blue-950"> {category}</h1>
                        <p className="text-gray-500 px-4"> {petAmount} </p>
                    </div>
                </div>

                {/* pet listings */}
                <PetListings top={false} sorting={sort} chunkSize={chunkSize} gender={gender[0]} color={color[0]}
                             priceMin={price.min} priceMax={price.max} size={size[0]} category={category}
                             setPetAmount={updatePetAmount} />

            </div>
        </div>

    );
};
export default ListingsCategory;