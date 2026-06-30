import { Textarea } from "../ui/textarea";
import { Field, type FieldProps } from "./field";

export interface TextareaFieldProps extends React.ComponentProps<typeof Textarea>, FieldProps {}
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
                {...props}
            />
        </Field>
    );
}
