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
            <Checkbox required={required} {...props} />
        </AsideField>
    );
}

export const CheckboxField = (props: React.ComponentProps<typeof Field>) => (
    <Field {...props} />
);
