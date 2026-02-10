import { Link } from "@tanstack/react-router"
import NavbarItem from "./NavbarItem"

// todo: verify UserRole to display them
function Navbar() {
    return (
        <div className="bg-stone-900 flex justify-center">
            <div className="container">
                <Link to="/inventario"><NavbarItem>Inventario</NavbarItem></Link>
                <Link to="/dictamen"><NavbarItem>Dictamen Tecnológico</NavbarItem></Link>
            </div>
        </div>
    )
}

export default Navbar
