import { InputField, NullableInputField, NullableNumberInputField, type InputFieldType, type NullableInputFieldType, type NullableNumberInputFieldType } from "@/components/ui/input-field";
import { BooleanField, type BooleanFieldType } from "@/components/ui/boolean-field";
import { FieldLayout, type CoreFieldLayoutProps } from "@/components/ui/field-layout";
import { Field } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useFieldContext } from "@/components/ui/form-context";
import { ScannerButton } from "@/components/ui/scanner-button";
import { isStringNumber } from "@/lib/utils";
import React from "react";

export type CostoUnitarioFieldType = NullableNumberInputFieldType;
export const CostoUnitarioField = ({
    label = "Costo unitario",
    placeholder = "Ingresa el costo unitario",
    ...props
}: React.ComponentProps<typeof NullableNumberInputField>) => (
    <NullableNumberInputField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);

export type NumeroInventarioFieldType = InputFieldType;
export const NumeroInventarioField = ({
    label = "Número de Inventario",
    placeholder = "Ingresa el número de inventario",
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <InputField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);

export type NullableNumeroInventarioFieldType = NullableInputFieldType;
export const NullableNumeroInventarioField = ({
    label = "Número de Inventario",
    placeholder = "Ingresa el número de inventario",
    ...props
}: React.ComponentProps<typeof NullableInputField>) => (
    <NullableInputField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);

export type EsContableFieldType = BooleanFieldType;
export const EsContableField = ({
    label = "¿Es contable?",
    ...props
}: React.ComponentProps<typeof BooleanField>) => (
    <BooleanField
        label={label}
        {...props}
    />
);

export type NumeroSerieFieldType = InputFieldType;
export const NumeroSerieField = ({
    label = "Número de serie",
    placeholder = "Ingresa el número de serie",
    ...props
}: React.ComponentProps<typeof NullableInputField>) => (
    <NullableInputField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);

const formatCuentaContable = (value: string) =>
    value.length === 9
        ? `${value.slice(0, 4)}-${value.charAt(4)}-${value.slice(5, 9)}`
        : undefined

export type CuentaContableType = InputFieldType;
export const CuentaContable = ({
    label = 'Cuenta contable',
    withScannerButton = true,
    className, description, disabled, required, orientation,
}: Omit<CoreFieldLayoutProps, 'errors'> & {
    withScannerButton?: boolean;
}) => {
    const field = useFieldContext<CuentaContableType>();
    const [inputValue, setInputValue] = React.useState<string | undefined>();

    return (
        <FieldLayout
            label={label}
            className={className}
            description={description}
            disabled={disabled}
            required={required}
            orientation={orientation}
            errors={field.state.meta.errors}
        >
            <Field orientation="horizontal">
                <InputOTP
                    value={inputValue}
                    maxLength={9}
                    pattern={REGEXP_ONLY_DIGITS}
                    onChange={(value) => {
                        setInputValue(value);
                        const format = formatCuentaContable(value);
                        if (format !== undefined) {
                            field.handleChange(format);
                        } else if (field.state.value !== undefined) {
                            field.handleChange(undefined);
                        }
                    }}
                    disabled={disabled}
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={4} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                        <InputOTPSlot index={8} />
                    </InputOTPGroup>
                </InputOTP>
                {withScannerButton && (
                    <ScannerButton
                        timeout={5000}
                        onScannedCode={(code) => {
                            const trimmedCode = code.trim();
                            const value = trimmedCode.slice(0, 4) + trimmedCode.slice(5, 6) + trimmedCode.slice(7, 11)
                            if (trimmedCode === '' || trimmedCode.length !== 11 || !isStringNumber(value)) {
                                field.setErrorMap({
                                    onSubmit: 'El código escaneado es inválido'
                                });
                                return;
                            }
                            setInputValue(value);
                            field.handleChange(trimmedCode);
                        }}
                    />
                )}
            </Field>
        </FieldLayout>
    );
}
