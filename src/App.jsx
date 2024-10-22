import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider
} from "react-router-dom";
import HomePage from "./Components/Pages/HomePage.jsx";
import MainLayout from "./Components/Layouts/MainLayout.jsx";
import NotFoundPage from "./Components/Pages/NotFoundPage.jsx";
import CategoryPage from "./Components/Pages/CategoryPage.jsx";
import ProductPage from "./Components/Pages/ProductPage.jsx";
import ContactPage from "./Components/Pages/ContactPage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="/category" element={<CategoryPage/>}/>
            <Route path="/category/:category" element={<CategoryPage />}/> {/* Dynamic route for categories */}
            <Route path="/category/:category/:id" element={<ProductPage />}/> {/* Updated dynamic route for products */}
            <Route path="/contact" element={<ContactPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router}/>;

};
export default App;