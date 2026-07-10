import { useState } from "react";
import * as Root from "../../input-field";
import { useFieldContext } from "./form";

export type InputField = string | undefined;
export const InputField = (props: Root.InputFieldProps) => {
    const field = useFieldContext<InputField>();

    return (
        <Root.InputField
            name={field.name}
            value={field.state.value ?? ''}
            onChange={(e) => field.handleChange(
                e.target.value.trim() !== ''
                    ? e.target.value
                    : undefined
            )}
            errors={field.state.meta.errors}
            {...props}
        />
    );
};

export type NumberInputField = number | undefined;
export const NumberInputField = (props: Omit<Root.InputFieldProps, 'type' | 'inputMode'>) => {
    const field = useFieldContext<NumberInputField>();
    const [rawValue, setRawValue] = useState(
        field.state.value === undefined ? '' : String(field.state.value)
    );

    return (
        <Root.InputField
            name={field.name}
            value={rawValue}
            onChange={(e) => {
                const value = e.target.value;
                setRawValue(value);
                field.handleChange(
                    value.trim() !== '' && !isNaN(Number(value)) && !/[.,]$/.test(value)
                        ? Number(value)
                        : undefined
                );
            }}
            errors={field.state.meta.errors}
            {...props}
            inputMode="decimal"
        />
    );
}
