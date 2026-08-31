import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useCanGoBack, useRouter } from "@tanstack/react-router";
import { ArrowLeftCircle } from "lucide-react";

// ! This is experimental
function GoBackButton({
    className,
    ...props
}: React.ComponentProps<typeof Button>) {
    const router = useRouter();
    const canGoBack = useCanGoBack();

    const navigateToLocation = () => canGoBack
        ? router.history.back()
        : router.navigate({ to: '/' });

    return (
        <Button
            onClick={navigateToLocation}
            className={cn(
                "max-w-fit",
                className
            )}
            variant="outline"
            {...props}
        >
            <ArrowLeftCircle /> Regresar
        </Button>
    )
}

export default GoBackButton
