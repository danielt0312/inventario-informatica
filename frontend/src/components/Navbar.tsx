import { Link, useNavigate } from "@tanstack/react-router"
import { Route as AuthRoute } from "@/routes/_auth";
import { Route as InventarioRoute } from "@/routes/_auth/inventario";
import { Route as DictamenRoute } from "@/routes/_auth/dictamen";
import { Route as DocumentosRoute } from "@/routes/_auth/documentos";
import { Route as LoginRoute } from "@/routes/_guest/login";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import api from "@/lib/axios";

function Navbar() {
    const { user } = AuthRoute.useRouteContext()
    const navigate = useNavigate()

    async function logout() {
        await api.post('logout')

        navigate({ to: LoginRoute.to })
    }

    return (
        <div className="bg-stone-900 flex justify-center">
            <div className="container">
                <div className="flex flex-row">
                    <div className="flex-1">
                        <Link to={InventarioRoute.to}><NavbarItem>Inventario</NavbarItem></Link>
                        <Link to={DictamenRoute.to}><NavbarItem>Dictamen Tecnológico</NavbarItem></Link>
                        <Link to={DocumentosRoute.to}><NavbarItem>Documentos</NavbarItem></Link>
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <NavbarItem>{user.name}</NavbarItem>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={logout}>
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

function NavbarItem({ children, ...props }: React.ComponentProps<"button">) {
  return (
    <Button
      {...props}
      variant="link"
      className="min-h-14 px-6 font-bold cursor-pointer text-primary-foreground"
    >
      {children}
    </Button>
  );
}

export default Navbar
