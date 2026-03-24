import { Link } from "@tanstack/react-router"
import NavbarItem from "./NavbarItem"
import { Route as AuthRoute } from "@/routes/_auth";
import { Route as InventarioRoute } from "@/routes/_auth/inventario";
import { Route as DictamenRoute } from "@/routes/_auth/dictamen";

function Navbar() {
    const { user } = AuthRoute.useRouteContext()

    return (
        <div className="bg-stone-900 flex justify-center">
            <div className="container">
                <div className="flex flex-row">
                    <div className="flex-1">
                        <Link to={InventarioRoute.to}><NavbarItem>Inventario</NavbarItem></Link>
                        <Link to={DictamenRoute.to}><NavbarItem>Dictamen Tecnológico</NavbarItem></Link>
                    </div>
                    <div>
                        <NavbarItem>{user.name}</NavbarItem>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
