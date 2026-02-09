import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { Outlet } from "@tanstack/react-router";

function AuthLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <Navbar />

            <main className="flex-1 flex justify-center">
                <div className="container py-4 flex flex-col gap-4">
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default AuthLayout
