import { CreatableCombobox, type CreatableComboboxProps } from "./creatable-combobox";
import { Field, type FieldProps } from "./field";

export type CreatableComboboxField = CreatableComboboxProps['value'];
export const CreatableComboboxField = ({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    ...props
}: Omit<React.ComponentProps<typeof CreatableCombobox>, 'children' > & FieldProps) => {
    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <Field {...fieldProps}>
            <CreatableCombobox {...props} />
        </Field>
    );
}
