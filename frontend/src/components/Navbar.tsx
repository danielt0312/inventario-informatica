import { useNavigate } from "@tanstack/react-router"
import { Route as AuthRoute } from "@/routes/_auth";
import { Route as InventarioRoute } from "@/routes/_auth/articulos";
import { Route as DictamenRoute } from "@/routes/_auth/dictamenes";
import { Route as DocumentosRoute } from "@/routes/_auth/documentos";
import { Route as ResguardosRoute } from "@/routes/_auth/resguardos";
import { Route as LoginRoute } from "@/routes/_guest/login";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { RouterButton } from "./ui/router-button";
import { LogOutIcon } from "lucide-react";
import api from "@/lib/axios";

function Navbar() {
    const { user } = AuthRoute.useRouteContext()
    const navigate = useNavigate()

    return (
        <div className="bg-stone-900 flex justify-center">
            <div className="container">
                <div className="flex flex-row">
                    <div className="flex-1">
                        <NavbarItem to={InventarioRoute.to}>Inventario</NavbarItem>
                        <NavbarItem to={DictamenRoute.to}>Dictámenes</NavbarItem>
                        <NavbarItem to={ResguardosRoute.to}>Resguardos</NavbarItem>
                        <NavbarItem to={DocumentosRoute.to}>Documentos</NavbarItem>
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <NavbarItem>{user.name}</NavbarItem>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        onClick={async () => {
                                            await api.post('logout')
                                            await navigate({ to: LoginRoute.to })
                                        }}
                                    >
                                        Cerrar sessión <LogOutIcon className="text-primary" />
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NavbarItem({ children, ...props }: React.ComponentProps<typeof RouterButton>) {
    return (
        <RouterButton
            {...props}
            variant="link"
            className="min-h-14 px-6 font-bold cursor-pointer text-primary-foreground"
        >
            {children}
        </RouterButton>
    );
}

export default Navbar
