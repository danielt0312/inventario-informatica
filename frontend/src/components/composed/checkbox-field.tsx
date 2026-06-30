import { Checkbox } from "../ui/checkbox";
import { AsideField, Field, type FieldProps } from "./field";

export const CheckboxFieldItem = ({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    ...props
}: Omit<React.ComponentProps<typeof Checkbox>, 'children'> & FieldProps) => {
    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <AsideField {...fieldProps}>
            <Checkbox required={required} {...props} />
        </AsideField>
    );
}

export const CheckboxField = (props: React.ComponentProps<typeof Field>) => (
    <Field {...props} />
);
