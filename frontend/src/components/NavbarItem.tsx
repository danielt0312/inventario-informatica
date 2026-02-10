import { Button } from "./ui/button"

// todo: add Link @tanstack/react-router component
function NavbarItem({  children }: React.ComponentProps<"button">) {
    return (
        <Button
            variant={"link"}
            className="text-white min-h-14 px-6 font-bold cursor-pointer"
        >
            {children}
        </Button>
    )
}

export default NavbarItem
