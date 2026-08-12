import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AsideFieldLayout, FieldLayout, type CoreFieldLayoutProps } from "@/components/ui/field-layout";
import { useFieldContext } from "./form-context";

export interface RadioGroupFieldProps extends Omit<React.ComponentProps<typeof RadioGroup>, 'orientation'>, CoreFieldLayoutProps {
    radioGroupOrientation?: React.ComponentProps<typeof RadioGroup>['orientation'];
}
export type RadioGroupFieldType = string | number | boolean | undefined;
export const RadioGroupField = ({
    className, description, disabled, label, errors, required, orientation, radioGroupOrientation, ...radioGroupProps
}: RadioGroupFieldProps) => {
    const field = useFieldContext<RadioGroupFieldType>();

    return (
        <FieldLayout
            className={className}
            description={description}
            disabled={disabled}
            label={label}
            errors={field.state.meta.errors}
            required={required}
            orientation={orientation}
        >
            <RadioGroup
                name={field.name}
                value={field.state.value !== undefined
                    ? String(field.state.value)
                    : ''
                }
                onValueChange={(value) => field.handleChange(
                    value === ''
                        ? undefined
                        : value === 'true' || value === 'false'
                            ? value === 'true'
                            : typeof field.state.value === 'number' || !isNaN(Number(value)) && value !== null
                                ? Number(value)
                                : value
                )
                }
                orientation={radioGroupOrientation}
                {...radioGroupProps}
            />
        </FieldLayout>
    );
}

export interface RadioGroupFieldItemProps extends Omit<React.ComponentProps<typeof RadioGroupItem>, 'children'>, CoreFieldLayoutProps {
}
export const RadioGroupFieldItem = ({
    className, description, disabled, errors,label, required,orientation, ...radioGroupItemProps
}: RadioGroupFieldItemProps) => {
    return (
        <AsideFieldLayout
            className={className}
            description={description}
            disabled={disabled}
            label={label}
            errors={errors}
            required={required}
            orientation={orientation}
        >
            <RadioGroupItem
                required={required}
                disabled={disabled}
                {...radioGroupItemProps}
            />
        </AsideFieldLayout>
    );
}
