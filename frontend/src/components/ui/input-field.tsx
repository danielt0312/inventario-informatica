import { useFieldContext } from "../composed/@tanstack/form/form";
import { FieldLayout, type CoreFieldLayoutProps } from "@/components/ui/field-layout";
import { Input } from "@/components/ui/input";
import React from "react";

interface CoreInputFieldProps extends Omit<React.ComponentProps<typeof Input>, 'children'>, CoreFieldLayoutProps {
}

type InputFieldType = string | undefined;
function InputField({
    className, description, disabled, label, errors, required, orientation, ...inputProps
}: CoreInputFieldProps) {
    const field = useFieldContext<InputFieldType>();

    return (
        <FieldLayout
            className={className}
            description={description}
            disabled={disabled}
            label={label}
            errors={errors !== undefined ? errors : field.state.meta.errors}
            required={required}
            orientation={orientation}
        >
            <Input
                name={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(
                    e.target.value.trim() !== ''
                        ? e.target.value
                        : undefined
                )}
                {...inputProps}
            />
        </FieldLayout>
    );
};

type NullableInputFieldType = string | null;
function NullableInputField({
    className, description, disabled, label, errors, required, orientation, ...inputProps
}: CoreInputFieldProps) {
    const field = useFieldContext<NullableInputFieldType>();

    return (
        <FieldLayout
            className={className}
            description={description}
            disabled={disabled}
            label={label}
            errors={errors !== undefined ? errors : field.state.meta.errors}
            required={required}
            orientation={orientation}
        >
            <Input
                name={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(
                    e.target.value.trim() !== ''
                        ? e.target.value
                        : null
                )}
                {...inputProps}
            />
        </FieldLayout>

    );
};

const hasNumberValue = (value: string) =>
    value.trim() !== '' && !isNaN(Number(value)) && !/[.,]$/.test(value);

type NumberInputFieldType = number | undefined;
function NumberInputField({
    className, description, disabled, label, errors, required, orientation, ...inputProps
}: CoreInputFieldProps) {
    const field = useFieldContext<NumberInputFieldType>();
    const [rawValue, setRawValue] = React.useState(
        field.state.value === undefined ? '' : String(field.state.value)
    );

    return (
        <FieldLayout
            className={className}
            description={description}
            disabled={disabled}
            label={label}
            errors={errors !== undefined ? errors : field.state.meta.errors}
            required={required}
            orientation={orientation}
        >
            <Input
                name={field.name}
                value={rawValue}
                onChange={(e) => {
                    const value = e.target.value;
                    setRawValue(value);
                    field.handleChange(hasNumberValue(value)
                        ? Number(value)
                        : undefined
                    );
                }}
                inputMode="decimal"
                {...inputProps}
            />
        </FieldLayout>
    );
}

type NullableNumberInputFieldType = number | null;
function NullableNumberInputField({
    className, description, disabled, label, errors, required, orientation, ...inputProps
}: CoreInputFieldProps) {
    const field = useFieldContext<NullableNumberInputFieldType>();
    const [rawValue, setRawValue] = React.useState(
        field.state.value === undefined ? '' : String(field.state.value)
    );

    return (
        <FieldLayout
            className={className}
            description={description}
            disabled={disabled}
            label={label}
            errors={errors !== undefined ? errors : field.state.meta.errors}
            required={required}
            orientation={orientation}
        >
            <Input
                name={field.name}
                value={rawValue}
                onChange={(e) => {
                    const value = e.target.value;
                    setRawValue(value);
                    field.handleChange(hasNumberValue(value)
                        ? Number(value)
                        : null
                    );
                }}
                inputMode="decimal"
                {...inputProps}
            />
        </FieldLayout>
    );
}

export {
    type CoreInputFieldProps,
    type InputFieldType,
    type NumberInputFieldType,
    type NullableInputFieldType,
    type NullableNumberInputFieldType,
    InputField,
    NumberInputField,
    NullableInputField,
    NullableNumberInputField
}
