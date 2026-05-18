import {
    Field,
    FieldError,
    FieldLabel
} from '@/components/ui/field';

export interface FormFieldProps extends React.ComponentProps<typeof Field> {
    children: React.ReactNode;
    label?: string;
    errors?: React.ComponentProps<typeof FieldError>["errors"];
}

export const FormField = ({
    children,
    label,
    errors,
    ...props
}: FormFieldProps) => (
    <Field {...props}>
        {label && <FieldLabel>{label}</FieldLabel>}
        {children}
        <FieldError errors={errors} />
    </Field>
);
