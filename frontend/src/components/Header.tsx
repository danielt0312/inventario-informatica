import Logo from "./Logo"

function Header() {
    return (
        <div className="bg-white flex justify-center">
            <div className="container py-5">
                <div className="flex flex-row items-center justify-between">
                    <Logo />
                    <div className="text-3xl font-black text-center">
                        Inventario Informática
                    </div>
                    <Logo className="opacity-0" />
                </div>
            </div>
        </div>
    )
}

export default Header
