import { Outlet } from "react-router-dom";
import Navbar from "../Navbar.jsx";
import Footer from "../Footer.jsx";

const MainLayout = () => {
    // Define the shared state

    return (
        <>
            {/* Pass the state setter to Navbar */}
            <Navbar/>

            {/* Pass the state to components rendered by Outlet */}
            <Outlet/>

            <Footer/>
        </>
    );
};
export default MainLayout;