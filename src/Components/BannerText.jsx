// eslint-disable-next-line react/prop-types
import {useNavigate} from "react-router";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const BannerText = ({ button1, ico1, button2, ico2, txt1, txt2, txt3, ico3, style, btnStyle,
                        // eslint-disable-next-line react/prop-types
                        b1Style = "flex items-center bg-transparent text-blue-950 border-2 border-blue-950 px-8 py-3 rounded-full hover:bg-gray-100",
                        // eslint-disable-next-line react/prop-types
                        b2Style = "bg-blue-950 text-white px-8 py-3 rounded-full hover:bg-blue-700"} ) => {


    const navigate = useNavigate();
    const goToCategory = () => {
        navigate('/category');
    };


    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Function to open the popup
    const openPopup = () => {
        setIsPopupOpen(true);
        document.body.style.overflow = "hidden"; // Disable background scroll
    };

    // Function to close the popup
    const closePopup = () => {
        setIsPopupOpen(false);
        document.body.style.overflow = "auto"; // Re-enable background scroll
    };


    return (
        <div className={`max-w-full xl:pl-20 max-xl:my-10  ${style}`}>
            <h1 className="text-2xl md:text-5xl font-black text-blue-950 leading-tight"> { txt1 } { ico3 } <br/>
                <span className="text-xl md:text-4xl"> { txt2 } </span>
            </h1>
            <p className="max-sm:text-sm mt-4 text-gray-600"> { txt3 } </p>

            <div className={`mt-8 flex space-x-4 max-sm:mb-28 ${btnStyle}`}>

                <button onClick={(button1 === "Explore Now") ? goToCategory : openPopup} className= { b1Style } > { button1 } { ico1 }
                </button>

                <button onClick={(button2 === "Explore Now") ? goToCategory : openPopup} className= { b2Style } > { button2 } { ico2 }
                </button>

            </div>

            {/* Popup */}
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className=" bg-white p-4 rounded-lg shadow-lg w-3/4  overflow-y-auto">
                        <button
                            className="flex text-xl font-bold text-gray-600 "
                            onClick={closePopup}
                        >
                            &times; {/* Unicode for close icon */}
                        </button>
                        <div className="flex w-full justify-center">
                            <iframe width="560" height="315"
                                    src="https://www.youtube.com/embed/j5a0jTc9S10?si=std-Z53uU0j9Bj2G"
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};
export default BannerText;