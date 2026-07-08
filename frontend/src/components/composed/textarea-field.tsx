import { Textarea } from "../ui/textarea";
import { Field, type FieldProps } from "./field";

export interface TextareaFieldProps extends Omit<React.ComponentProps<typeof Textarea>, 'children'>, FieldProps {
}
export const TextareaField = ({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    ...props
}: TextareaFieldProps) => {
    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <Field {...fieldProps}>
            <Textarea
                disabled={disabled}
                required={required}
                {...props}
            />
        </Field>
    );
}
