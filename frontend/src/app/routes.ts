import { createBrowserRouter } from "react-router";

import GuestLayout from "@/components/GuestLayout"

import Login from "@/views/Login";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                Component: GuestLayout,
                children: [{
                    path: "login",
                    Component: Login,
                }]
            },
        ],
    }
]);

export default router
