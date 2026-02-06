import { Outlet } from "react-router";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AuthLayout() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <Navbar />

            <div className="flex justify-center">
                <div className="container py-4 flex flex-col gap-4">
                    <Outlet />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default AuthLayout
