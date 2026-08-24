import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFieldContext } from "./form-context";
import { FieldLayout, type FieldLayoutProps } from "./field-layout";

export interface RadioGroupFieldProps extends React.ComponentProps<typeof RadioGroup>, FieldLayoutProps {
}
export type RadioGroupFieldType = string | number | boolean | undefined;
export const RadioGroupField = ({
    className,
    required,
    disabled,
    fieldLayout = {},
    ...props
}: RadioGroupFieldProps) => {
    const field = useFieldContext<RadioGroupFieldType>();

    return (
        <FieldLayout
            className={className}
            fieldLayout={{
                required,
                disabled,
                errors: field.state.meta.errors,
                ...fieldLayout
            }}
        >
            <RadioGroup
                required={required}
                disabled={disabled}
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
                )}
                {...props}
            />
        </FieldLayout>
    );
}

export const RadioGroupFieldItem = RadioGroupItem;
