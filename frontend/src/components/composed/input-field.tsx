import { Input } from "../ui/input";
import { Field, type FieldProps } from "./field";

export interface InputFieldProps extends Omit<React.ComponentProps<typeof Input>, 'children'>, FieldProps {
}
export const InputField = ({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    ...props
}: InputFieldProps) => {
    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <Field {...fieldProps}>
            <Input
                required={required}
                disabled={disabled}
                {...props}
            />
        </Field>
    );
}
