import { Outlet } from "react-router"

function GuestLayout() {
    return (
        <div className="bg-gray-100 p-10 h-full">
            <Outlet />
        </div>
    )
}

export default GuestLayout
