import { cn } from "@/lib/utils";
import * as Root from "../ui/field";

export const FieldRequiredMark = ({
    className,
    ...props
}: Omit<React.ComponentProps<"span">, 'children'>) => {
    return (
        <span
            className={cn("text-destructive", className)}
            {...props}
        >
            *
        </span>
    );
}

export const FieldLabel = ({
    children,
    required,
    ...props
}: React.ComponentProps<typeof Root.FieldLabel> & {
    required?: boolean;
}) => {
    return (
        <Root.FieldLabel {...props}>
            {children} {required && <FieldRequiredMark />}
        </Root.FieldLabel>
    );
}

export interface RootFieldProps {
    disabled?: boolean;
    required?: boolean;
    orientation?: React.ComponentProps<typeof Root.Field>['orientation'];
    className?: React.ComponentProps<typeof Root.Field>['className'];
}

export const RootField = ({
    disabled,
    required,
    ...props
}: RootFieldProps & React.ComponentProps<typeof Root.Field>) => {
    return (
        <Root.Field
            data-disabled={disabled}
            aria-disabled={disabled}
            aria-required={required}
            {...props}
        />
    );
}

export interface FieldProps extends RootFieldProps {
    label?: React.ReactNode;
    description?: React.ReactNode;
    errors?: React.ComponentProps<typeof Root.FieldError>['errors'];
}

export const Field = ({
    label,
    description,
    children,
    errors,
    required,
    ...props
}: React.ComponentProps<typeof RootField> & FieldProps) => {
    return (
        <RootField
            required={required}
            {...props}
        >
            {label && <FieldLabel required={required}>{label}</FieldLabel>}
            {description && <Root.FieldDescription>{description}</Root.FieldDescription>}
            {children}
            {errors && <Root.FieldError errors={errors} />}
        </RootField>
    );
}

export const AsideField = ({
    label,
    description,
    children,
    errors,
    required,
    orientation = 'horizontal',
    ...props
}: React.ComponentProps<typeof RootField> & FieldProps) => {
    return (
        <RootField
            required={required}
            orientation={orientation}
            {...props}
        >
            {children}
            <Root.FieldContent>
                {label && <FieldLabel required={required}>{label}</FieldLabel>}
                {description && <Root.FieldDescription>{description}</Root.FieldDescription>}
                {errors && <Root.FieldError errors={errors} />}
            </Root.FieldContent>
        </RootField>
    );
}
