import {useEffect, useState} from "react";
// eslint-disable-next-line no-unused-vars
import {FaAngleRight} from "react-icons/fa";
import Listing from "./Listing.jsx";
import loadingImg from "../assets/loading.jpg";

// Import Swiper components
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Navigation, Pagination} from 'swiper/modules';


// eslint-disable-next-line react/prop-types
const PetListings = ({top = true, isHome = false, sorting = "Sort by: Name ( A - Z )", chunkSize =9,
                         // eslint-disable-next-line react/prop-types
                         gender = null, color = null, priceMin = null, priceMax = null,
                         // eslint-disable-next-line react/prop-types
                         size = null, category = "Small Dogs", setPetAmount, }) => {

    const [pets, setPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [swiperInstance, setSwiperInstance] = useState(null);


    // Swiper pagination
    const pagination = {
        clickable: true,
        type: 'custom',
        renderCustom: function (swiper, current, total) {
            let paginationHtml = '';
            let visiblePages; // Number of adjacent pages to show

            if (current === 1 ||current === total) {
                visiblePages = 3;
            } else if (current === 2  ||current === total-1) {
                visiblePages = 2;
            } else {
                visiblePages = 1;
            }

            // Helper function to render a clickable page number
            const renderPage = (page, isCurrent = false) => {
                return `
          <span class="pagination-bullet ${isCurrent ? 'bg-blue-950 text-white' : 'bg-transparent text-blue-950'} 
          w-8 h-8 flex items-center justify-center rounded-md mx-1 cursor-pointer" data-page="${page}">
            ${page}
          </span>`;
            };

            // Render first page
            paginationHtml += renderPage(1, current === 1);

            // Add "..." if there are hidden pages between first and current - 2
            if (current > visiblePages + 2) {
                paginationHtml += '<span class="pagination-dots">...</span>';
            }

            // Render pages around the current page
            for (let i = Math.max(2, current - visiblePages); i <= Math.min(total - 1, current + visiblePages); i++) {
                paginationHtml += renderPage(i, current === i);
            }

            // Add "..." if there are hidden pages between current + 2 and last
            if (current < total - visiblePages - 1) {
                paginationHtml += '<span class="pagination-dots">...</span>';
            }

            // Render last page
            if (total > 1) {
                paginationHtml += renderPage(total, current === total);
            }


            const arrowL = `
                <div class=" text-blue-950 button-prev">
                    <svg class=" w-4 h-4"  fill="currentColor"  xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 
                        0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 
                        12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                    </svg>
                </div>
            `;

            const arrowR = `
                <div class=" text-blue-950 button-next">
                    <svg class=" w-4 h-4"  fill="currentColor"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3
                        0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7
                        0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                </div>
            `;

            return `<div class=" w-72 flex justify-center items-center mx-auto"> ${arrowL} 
                        <div class=" justify-center flex mx-auto font-black"> ${paginationHtml} 
                        </div> ${arrowR} 
                    </div> `;
        },
    };

    // Attach event listener to pagination bullets
    const updatePaginationListeners = () => {
        document.querySelectorAll('.pagination-bullet').forEach((bullet) => {
            bullet.addEventListener('click', function () {
                const page = parseInt(this.getAttribute('data-page'));
                swiperInstance?.slideTo(page - 1);
            });
        });
        document.querySelectorAll('.button-prev').forEach((button) => {
            button.addEventListener('click', function () {
                swiperInstance?.slidePrev();
            });
        });
        document.querySelectorAll('.button-next').forEach((button) => {
            button.addEventListener('click', function () {
                swiperInstance?.slideNext();
            });
        });
    };

    // Update pagination listeners when the swiper instance changes
    useEffect(() => {
        updatePaginationListeners();

        if (swiperInstance) {
            swiperInstance.on('paginationRender', () => {
                updatePaginationListeners();
            });
        }
    }, [swiperInstance]);

    // ---------------------------getting data from api-------------------------
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch("https://monitor-backend-rust.vercel.app/api/pets");
                const data = await response.json();
                setPets(data);
            } catch (error) {
                console.error("API Error: ", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPets();
    }, []);

    //duplicate array
    const duplicateObjects = (array, times) => {
        return array.flatMap(obj => Array(times).fill({ ...obj }));
    };

    // Function to filter the pets array based on the selected filters
    const filterArray = (array) => {


        // If no filters are applied, return the original array
        if (gender === null && color === null && priceMin === null && priceMax === null && size === null) {
            return array;
        }

        // Filter the array based on the conditions
        return array.filter(item => {
            try {
                // Gender filter
                if (gender !== null && item.gender !== gender) {
                    return false;
                }

                // Color filter
                if (color !== null && !item.breed.toLowerCase().includes(color.toLowerCase())) {
                    console.log("color");
                    return false;
                }

                // Price filter (minimum)
                if (priceMin !== null && parseInt(item.price.replaceAll(",", "")) < priceMin) {
                    console.log("priceMin");
                    return false;
                }

                // Price filter (maximum)
                if (priceMax !== null && parseInt(item.price.replaceAll(",", "")) > priceMax) {
                    console.log("priceMax");
                    return false;
                }

                // Size filter
                if (size !== null && !item.breed.toLowerCase().includes(size.toLowerCase())) {
                    console.log("size");
                    return false;
                }

                console.log("true");
                // If all conditions pass, keep the item
                return true;

            } catch (error) {
                console.error("Filtering Error: ", error);
                return false; // If there's an error, filter out the item
            }
        });
    };


    // Function to group array into chunks
    const chunkArray = (array, chunkSize) => {
        return array.reduce((acc, _, i) => {
            if (i % chunkSize === 0) acc.push(array.slice(i, i + chunkSize));
            return acc;
        }, []);
    };


    // Duplicate the pets array
    const dupPets =  duplicateObjects(pets, 20);
    //const dupPets = pets;

    // displayed pets array
    const allPets = isHome ? dupPets.slice(0, chunkSize) : dupPets;

    useEffect(() => {
        setFilteredPets(filterArray(allPets));
    }, [allPets, gender, color, priceMin, priceMax, size]); // Add dependencies here



    // Sort the pets array based on the selected sorting option
    if (sorting === "Sort by: Name ( A - Z )") {
        filteredPets.sort();
    } else if (sorting === "Sort by: Name ( Z - A )") {
        filteredPets.sort().reverse();
    } else if (sorting === "Sort by: Price ( Low - High )") {
        filteredPets.sort((a, b) => parseInt(a.price.replaceAll(",", "")) - parseInt(b.price.replaceAll(",", "")));
    } else if (sorting === "Sort by: Price ( High - Low )") {
        filteredPets.sort((a, b) => parseInt(b.price.replaceAll(",", "")) - parseInt(a.price.replaceAll(",", "")));
    }


    // Use useEffect to update petAmount in the parent component whenever filteredPets changes
    useEffect(() => {
        if (setPetAmount) {
            setPetAmount(`${filteredPets.length} ${category}`);
        }
    }, [filteredPets, setPetAmount]);


    // Chunk the pets array into groups
    const petChunks = chunkArray(filteredPets, chunkSize)


    // Generate a unique key for the Swiper component
    const swiperKey = `${JSON.stringify(filteredPets)}-${chunkSize}`;

    return (
        <section>
            {/* title */}
            <div className= {(top) ? "" : "hidden"} >
                <div className={(top) ? "flex w-full justify-between" : "hidden"}>
                    <div>
                        <p> What&#39;s New? </p>
                        <h2 className="text-2xl font-bold"> Take a look at some of our pets </h2>
                    </div>
                    <button className="hidden lg:visible lg:flex items-center bg-transparent text-blue-950 border-2
                    border-blue-950 px-8 py-3 rounded-full hover:bg-gray-100"> View more &nbsp; <FaAngleRight/>
                    </button>
                </div>

            </div>

            {/* Listing */}
            {loading
                ? (<img src={loadingImg} className="flex mx-auto" alt="Loading"/>)
                : (
                    <>
                        {/* swiper */}
                        <Swiper key={swiperKey}
                                onSwiper={(swiper) => {
                                    setSwiperInstance(swiper);
                                }}
                                pagination={pagination}
                                modules={[Pagination, Navigation]}
                                className={`${(isHome) ? "" : " w-full lg:w-[70svw]"} mySwiper py-4`}
                        >
                            {petChunks.map((chunk, index) => (
                                <SwiperSlide key={index} className="px-10">
                                    {/* Render the group of pets in this slide */}
                                    <div className={`${(isHome)
                                        ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                        : "md:grid-cols-2 xl:grid-cols-3"} 
                                        grid grid-cols-1 gap-10 py-10`}>
                                        {chunk.map((pet) => (
                                            <Listing key={pet.id} item={pet} txt1={"Gene"} txt2={"Age"} category={category}/>
                                        ))}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                ) }

            {/* View more button */}
            <button
                className={(top) ? "lg:hidden w-full flex items-center justify-center bg-transparent text-blue-950 " +
                    "border-2 border-blue-950 px-8 py-3 my-3 rounded-full hover:bg-gray-100" : "hidden"}> View
                more &nbsp; <FaAngleRight />
            </button>
        </section>
    );
};
export default PetListings;