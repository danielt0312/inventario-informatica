import { createBrowserRouter } from "react-router";

import GuestLayout from "@/components/GuestLayout"

import Login from "@/views/Login";
import AuthLayout from "@/components/AuthLayout";
import Dictamen from "@/views/Dictamen";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                Component: GuestLayout,
                children: [
                    {
                        path: "login",
                        Component: Login,
                    },
                ],
            },
            {
                Component: AuthLayout,
                children: [
                    {
                        path: "dictamen",
                        Component: Dictamen,
                    }
                ],
            },
        ],
    }
]);

export default router
