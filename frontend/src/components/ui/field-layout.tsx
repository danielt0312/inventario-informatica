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
}
const Field = ({
    disabled,
    ...props
}: FieldProps) => (
    <Root.Field
        data-disabled={disabled}
        {...props}
    />
);

interface CoreFieldLayoutProps extends Pick<FieldProps, 'orientation' | 'disabled'> {
    required?: boolean;
    label?: React.ReactNode;
    description?: React.ReactNode;
    errors?: React.ComponentProps<typeof Root.FieldError>['errors'];
}

interface FieldLayoutProps {
    className?: string;
    children?: React.ReactNode;
    fieldLayout?: CoreFieldLayoutProps;
}

const BaseFieldLayout = ({
    label,
    required,
    description,
    errors,
    children,
    ...props
}: CoreFieldLayoutProps & FieldProps) => (
    <Field {...props}>
        {label && <Label required={required}>{label}</Label>}
        {description && <Root.FieldDescription>{description}</Root.FieldDescription>}
        {children}
        {errors && <Root.FieldError errors={errors} />}
    </Field>
)

const FieldLayout = ({
    fieldLayout = {},
    ...props
}: FieldLayoutProps) => {

    return (
        <BaseFieldLayout
            {...fieldLayout}
            {...props}
        />
    );
}

export {
    type CoreFieldLayoutProps,
    type FieldLayoutProps,
    BaseFieldLayout,
    FieldLayout,
}
