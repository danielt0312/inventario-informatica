import { Button } from "./ui/button";
import { useCanGoBack, useRouter } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ArrowLeftCircle } from "lucide-react";

// ! This is experimental
function Goback({ children, className, ...props }: React.ComponentProps<"div">) {
    const router = useRouter()
    const canGoBack = useCanGoBack()

    const navigateToLocation = () => canGoBack
        ? router.history.back()
        : '/'

    return (
        <div
            className={cn("flex justify-between", className)}
            {...props}
        >
            <Button variant={"outline"} onClick={navigateToLocation}>
                <ArrowLeftCircle /> Regresar
            </Button>

            {children}
        </div>
    )
}

export default Goback
