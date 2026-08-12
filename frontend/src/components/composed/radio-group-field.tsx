import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { AsideFieldLayout, FieldLayout, type CoreFieldLayoutProps } from "../ui/field-layout";

export interface RadioGroupFieldProps extends Omit<React.ComponentProps<typeof RadioGroup>, 'orientation'>, CoreFieldLayoutProps {
    radioGroupOrientation?: React.ComponentProps<typeof RadioGroup>['orientation'];
}
export const RadioGroupField = ({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    radioGroupOrientation,
    ...props
}: RadioGroupFieldProps) => {
    const fieldProps: CoreFieldLayoutProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <FieldLayout {...fieldProps}>
            <RadioGroup
                orientation={radioGroupOrientation}
                disabled={disabled}
                required={required}
                {...props}
            />
        </FieldLayout>
    );
}

export interface RadioGroupFieldItemProps extends Omit<React.ComponentProps<typeof RadioGroupItem>, 'children'>, CoreFieldLayoutProps {
}
export const RadioGroupFieldItem = ({
    className,
    description,
    disabled,
    errors,
    label,
    required,
    orientation,
    ...props
}: RadioGroupFieldItemProps) => {
    const fieldProps: CoreFieldLayoutProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <AsideFieldLayout {...fieldProps}>
            <RadioGroupItem
                required={required}
                disabled={disabled}
                {...props}
            />
        </AsideFieldLayout>
    );
}
