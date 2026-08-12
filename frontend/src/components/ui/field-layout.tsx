import { cn } from "@/lib/utils";
import * as Root from "./field";

const LabelRequiredMark = ({
    className,
    ...props
}: Omit<React.ComponentProps<"span">, 'children'>) => (
    <span className={cn("text-destructive", className)}{...props}>*</span>
);

const Label = ({
    children,
    required,
    ...props
}: React.ComponentProps<typeof Root.FieldLabel> & {
    required?: boolean;
}) => (
    <Root.FieldLabel aria-required={required} {...props}>
        {children} {required && <LabelRequiredMark />}
    </Root.FieldLabel>
);

interface FieldProps extends React.ComponentProps<typeof Root.Field> {
    disabled?: boolean;
    required?: boolean;
}
const Field = ({
    disabled,
    required,
    ...props
}: FieldProps) => (
    <Root.Field
        data-disabled={disabled}
        aria-disabled={disabled}
        aria-required={required}
        {...props}
    />
);

interface CoreFieldLayoutProps extends Pick<FieldProps, 'className' | 'orientation' | 'required' | 'disabled'> {
    label?: React.ReactNode;
    description?: React.ReactNode;
    errors?: React.ComponentProps<typeof Root.FieldError>['errors'];
}

const FieldLayout = ({
    label,
    description,
    children,
    errors,
    required,
    ...props
}: FieldProps & CoreFieldLayoutProps) => (
    <Field required={required} {...props}>
        {label && <Label required={required}>{label}</Label>}
        {description && <Root.FieldDescription>{description}</Root.FieldDescription>}
        {children}
        {errors && <Root.FieldError errors={errors} />}
    </Field>
);

const AsideFieldLayout = ({
    label,
    description,
    children,
    errors,
    required,
    orientation = 'horizontal',
    ...props
}: FieldProps & CoreFieldLayoutProps) => (
    <Field required={required} orientation={orientation} {...props}>
        {children}
        <Root.FieldContent>
            {label && <Label required={required}>{label}</Label>}
            {description && <Root.FieldDescription>{description}</Root.FieldDescription>}
            {errors && <Root.FieldError errors={errors} />}
        </Root.FieldContent>
    </Field>
);

export {
    type CoreFieldLayoutProps,
    FieldLayout,
    AsideFieldLayout,
}
