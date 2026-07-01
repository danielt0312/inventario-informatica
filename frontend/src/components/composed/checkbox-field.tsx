import { Checkbox } from "../ui/checkbox";
import { AsideField, Field, type FieldProps } from "./field";

export interface CheckboxFieldItemProps extends Omit<React.ComponentProps<typeof Checkbox>, 'children'>, FieldProps {
}
export const CheckboxFieldItem = ({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    ...props
}: CheckboxFieldItemProps) => {
    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <AsideField {...fieldProps}>
            <Checkbox
                required={required}
                disabled={disabled}
                {...props}
            />
        </AsideField>
    );
}

export interface CheckboxFieldProps extends React.ComponentProps<typeof Field> {
}
export const CheckboxField = (props: CheckboxFieldProps) => (
    <Field {...props} />
);
