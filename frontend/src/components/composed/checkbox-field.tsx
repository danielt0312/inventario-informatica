import { Checkbox } from "../ui/checkbox";
import { AsideFieldLayout, FieldLayout, type CoreFieldLayoutProps } from "../ui/field-layout";

export interface CheckboxFieldItemProps extends Omit<React.ComponentProps<typeof Checkbox>, 'children'>, CoreFieldLayoutProps {
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
    const fieldProps: CoreFieldLayoutProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <AsideFieldLayout {...fieldProps}>
            <Checkbox
                required={required}
                disabled={disabled}
                {...props}
            />
        </AsideFieldLayout>
    );
}

export interface CheckboxFieldProps extends React.ComponentProps<typeof FieldLayout> {
}
export const CheckboxField = (props: CheckboxFieldProps) => (
    <FieldLayout {...props} />
);
