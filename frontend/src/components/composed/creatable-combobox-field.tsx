import { CreatableCombobox } from "./creatable-combobox";
import { Field, type FieldProps } from "./field";

export interface CreatableComboboxFieldProps extends Omit<React.ComponentProps<typeof CreatableCombobox>, 'children'>, FieldProps {
}
export const CreatableComboboxField = ({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    ...props
}: CreatableComboboxFieldProps) => {
    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <Field {...fieldProps}>
            <CreatableCombobox
                disabled={disabled}
                {...props}
            />
        </Field>
    );
}
