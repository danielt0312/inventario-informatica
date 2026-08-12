import { CreatableCombobox } from "../ui/creatable-combobox";
import { FieldLayout, type CoreFieldLayoutProps } from "../ui/field-layout";

export interface CreatableComboboxFieldProps extends Omit<React.ComponentProps<typeof CreatableCombobox>, 'children'>, CoreFieldLayoutProps {
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
    const fieldProps: CoreFieldLayoutProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <FieldLayout {...fieldProps}>
            <CreatableCombobox
                disabled={disabled}
                {...props}
            />
        </FieldLayout>
    );
}
