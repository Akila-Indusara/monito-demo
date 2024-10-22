import {BsDot} from "react-icons/bs";
import {useNavigate} from "react-router";

const Listing = (item) => {

    const navigate = useNavigate();


    // Navigate to the dynamic product page with category and ID in the URL
    const goToDetails = () => {
        if (item.category && item.item.id) {
            navigate(`/category/${item.category}/${item.item.id}`, { state: { item: item } });
        } else {
            console.error("Category or item ID is missing");
        }
    };

    return (
        <div onClick={goToDetails} className=" bg-white p-2 flex flex-col justify-between shadow-[0_0px_20px_5px_rgba(0,0,0,0.2)] rounded-xl">
            <div>
                <img className="flex mx-auto p-1" src={item.item.image} alt={item.item.breed} />
                <div className="p-3">
                    <h3 className="text-blue-950 text-lg font-bold"> {(item.txt1 === "Gene") ? `${item.item.id}  - ` : ""}
                        {item.item.breed}{item.item.name}   </h3>
                    <p className={(item.txt1 == null) ? "hidden" : "flex items-center text-sm text-gray-500"}>
                        {item.txt1}:&nbsp; <span className="font-bold">{item.item.gender}{item.item.product}</span>
                        <BsDot/>
                        {item.txt2}:&nbsp; <span className="font-bold">{item.item.age}{item.item.size}</span>
                    </p>
                    <p id={"currency"} className="text-blue-950 font-bold"> {item.item.price} </p>
                </div>
            </div>
            {item.Free}

        </div>
    );
};
export default Listing;