import { Outlet } from "react-router"

function GuestLayout() {
    return (
        <div className="bg-gray-100 p-10 flex items-center h-screen ">
            <div className="w-full flex flex-col gap-4">
                <Outlet />
            </div>
        </div>
    )
}

export default GuestLayout
