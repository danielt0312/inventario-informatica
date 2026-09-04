import { SaveIcon } from "lucide-react";
import { Button } from "./button";
import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";

function SubmitButton({
    className,
    isSubmitting,
    label = "Guardar",
    icon = <SaveIcon />,
    spinnerIcon = <Spinner />,
    spinnerLabel = "Guardando...",
    ...props
}: React.ComponentProps<typeof Button> & {
    isSubmitting: boolean
    label?: string;
    spinnerLabel?: string;
    icon?: React.ReactNode;
    spinnerIcon?: React.ReactNode;
}) {
    return (
        <Button
            type="submit"
            disabled={isSubmitting}
            className={cn("self-center", className)}
            {...props}
        >
            {isSubmitting ? (
                <>{spinnerIcon}{spinnerLabel}</>
            ): (
                <>{icon}{label}</>
            )}
        </Button>
    );
}

export { SubmitButton }
