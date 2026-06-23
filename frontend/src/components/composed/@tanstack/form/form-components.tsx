import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import { useFormContext } from "./form";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { type AnyFormApi } from "@tanstack/react-form";
import type React from "react";

interface FormProps extends React.ComponentProps<'form'> {
    form: AnyFormApi;
}

export const Form = ({ form, ...props }: FormProps) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="contents"
            {...props}
        />
    );
};

export type SubmitButtonProps =
    Omit<
        React.ComponentProps<typeof Button>,
        'type' | 'disabled' | 'children'
    > & {
        icon?: React.ReactNode;
        label?: string;
        children?: (isSubmitting: boolean) => React.ReactNode;
    }
export const SubmitButton = ({
    label = "Guardar",
    icon = <SaveIcon />,
    className,
    children,
    ...props
}: SubmitButtonProps) => {
    const form = useFormContext();

    return (
        <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => {
                const renderChildren = typeof children === 'function'
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
