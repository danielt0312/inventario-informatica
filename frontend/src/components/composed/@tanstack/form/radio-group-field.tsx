import * as Root from "../../radio-group-field";
import { useFieldContext } from "./form";

export type RadioGroupField = string | number | boolean | undefined;
export const RadioGroupField = ({
    value,
    onValueChange,
    ...props
}: Root.RadioGroupFieldProps) => {
    const field = useFieldContext<RadioGroupField>();

    return (
        <Root.RadioGroupField
            name={field.name}
            value={value !== undefined
                ? value
                : field.state.value !== undefined
                    ? String(field.state.value)
                    : ''
            }
            onValueChange={(value) => onValueChange !== undefined
                ? onValueChange(value)
                : field.handleChange(
                    value === ''
                        ? undefined
                        : value === 'true' || value === 'false'
                            ? value === 'true'
                            : typeof field.state.value === 'number' || !isNaN(Number(value)) && value !== null
                                ? Number(value)
                                : value
                )
            }
            errors={field.state.meta.errors}
            {...props}
        />
    );
}

export const RadioGroupFieldItem = Root.RadioGroupFieldItem;
