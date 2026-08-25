import { FieldLayout, type FieldLayoutProps } from "@/components/ui/field-layout";
import { useFieldContext } from "./form-context";
import { InputGroup, InputGroupInput } from "./input-group";
import { isStringNumber } from "@/lib/utils";
import React from "react";

interface CoreInputFieldProps extends React.ComponentProps<typeof InputGroupInput>, FieldLayoutProps {
}

type CoreInputFieldType = string | number | undefined | null;

function CoreInputField({
    children,
    className,
    required,
    disabled,
    fieldLayout = {},
    ...props
}: CoreInputFieldProps) {
    const field = useFieldContext<CoreInputFieldType>();

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
            <InputGroup>
                <InputGroupInput
                    // required={required}
                    disabled={disabled}
                    name={field.name}
                    value={field.state.value ?? ''}
                    {...props}
                />
                {children}
            </InputGroup>
        </FieldLayout>
    );
}

type InputFieldType = string | undefined;
function InputField(props: CoreInputFieldProps) {
    const field = useFieldContext<InputFieldType>();

    return (
        <CoreInputField
            onChange={(e) => {
                const value = e.target.value.trim();
                field.handleChange(value === ''
                    ? undefined
                    : value
                );
            }}
            {...props}
        />
    );
}

type NullableInputFieldType = string | null;
function NullableInputField(props: CoreInputFieldProps) {
    const field = useFieldContext<NullableInputFieldType>();

    return (
        <CoreInputField
            onChange={(e) => {
                const value = e.target.value.trim();
                field.handleChange(value === ''
                    ? null
                    : value
                );
            }}
            {...props}
        />
    );
}

type NumberInputFieldType = number | undefined;
function NumberInputField(props: CoreInputFieldProps) {
    const field = useFieldContext<NumberInputFieldType>();
    const [rawValue, setRawValue] = React.useState(
        field.state.value === undefined ? '' : String(field.state.value)
    );

    return (
        <CoreInputField
            value={rawValue}
            onChange={(e) => {
                const value = e.target.value.trim();
                setRawValue(value);
                field.handleChange(isStringNumber(value)
                    ? Number(value)
                    : undefined
                );
            }}
            {...props}
        />
    );
}

type NullableNumberInputFieldType = number | null;
function NullableNumberInputField(props: CoreInputFieldProps) {
    const field = useFieldContext<NullableNumberInputFieldType>();
    const [rawValue, setRawValue] = React.useState(
        field.state.value === null ? '' : String(field.state.value)
    );

    return (
        <CoreInputField
            value={rawValue}
            onChange={(e) => {
                const value = e.target.value.trim();
                setRawValue(value);
                field.handleChange(isStringNumber(value)
                    ? Number(value)
                    : null
                );
            }}
            {...props}
        />
    );
}

export {
    InputField,
    NumberInputField,
    NullableInputField,
    NullableNumberInputField,
    type InputFieldType,
    type NumberInputFieldType,
    type NullableInputFieldType,
    type NullableNumberInputFieldType,
}
