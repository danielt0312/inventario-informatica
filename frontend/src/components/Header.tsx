import Logo from "./Logo"

function Header() {
    return (
        <div className="bg-white flex justify-center">
            <div className="container py-5 w-full">
                <div className="flex flex-row items-center justify-between">
                    <Logo className="h-18" />
                    <div className="text-3xl font-bold text-center">
                        Inventario Informática
                    </div>
                    <Logo className="h-18 opacity-0" />
                </div>
            </div>
        </div>
    )
}

export default Header
