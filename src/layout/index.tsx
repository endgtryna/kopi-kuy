import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";

const Layout = () => {
    return (
        <div className="w-full min-h-screen bg-white">
            <ToastContainer className={"z-50"} />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;