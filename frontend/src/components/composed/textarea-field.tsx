import { Textarea } from "../ui/textarea";
import { Field, type FieldProps } from "./field";

export const TextareaField = ({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    ...props
}: React.ComponentProps<typeof Textarea> & FieldProps) => {
    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <Field {...fieldProps}>
            <Textarea
                {...props}
            />
        </Field>
    );
}
