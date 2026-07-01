import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { AsideField, Field, type FieldProps } from "./field";

export interface RadioGroupFieldProps extends Omit<React.ComponentProps<typeof RadioGroup>, 'orientation'>, FieldProps {
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
    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <Field {...fieldProps}>
            <RadioGroup
                orientation={radioGroupOrientation}
                disabled={disabled}
                required={required}
                {...props}
            />
        </Field>
    );
}

export interface RadioGroupFieldItemProps extends Omit<React.ComponentProps<typeof RadioGroupItem>, 'children'>, FieldProps {
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
    const fieldProps: FieldProps = { className, description, disabled, errors, label, required, orientation };

    return (
        <AsideField {...fieldProps}>
            <RadioGroupItem
                required={required}
                disabled={disabled}
                {...props}
            />
        </AsideField>
    );
}
