import { Input } from "../ui/input";
import { Field, type FieldProps } from "./field";

export const InputField = ({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    ...props
}: Omit<React.ComponentProps<typeof Input>, 'children'> & FieldProps) => {
    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <Field {...fieldProps}>
            <Input required={required} {...props}/>
        </Field>
    );
}
