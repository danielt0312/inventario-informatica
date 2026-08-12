import { SaveIcon } from "lucide-react";
import { Spinner } from "./spinner";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useFormContext } from "./form-context";

interface SubmitFormButtonProps extends Omit<React.ComponentProps<typeof Button>, 'disabled' | 'children'> {
    icon?: React.ReactNode;
    label?: string;
    children?: (isSubmitting: boolean) => React.ReactNode;
}

export function SubmitFormButton({
    className,
    children,
    label = "Guardar",
    icon = <SaveIcon />,
    ...props
}: SubmitFormButtonProps) {
    const form = useFormContext();

    return (
        <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => {
                const renderChildren = children
                    ? children(isSubmitting)
                    : (
                        <>
                            {isSubmitting
                                ? <Spinner />
                                : icon
                            } {label}
                        </>
                    );

                return (
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        children={renderChildren}
                        className={cn("max-w-fit self-center", className)}
                        {...props}
                    />
                );
            }}
        </form.Subscribe>
    );
}
