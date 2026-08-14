import { InputField, NullableInputField, NullableNumberInputField, type InputFieldType, type NullableInputFieldType, type NullableNumberInputFieldType } from "@/components/ui/input-field";
import { BooleanField, type BooleanFieldType } from "@/components/ui/boolean-field";
import { FieldLayout, type CoreFieldLayoutProps } from "@/components/ui/field-layout";
import { Field } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useFieldContext } from "@/components/ui/form-context";
import { Button } from "@/components/ui/button";
import { ScanQrCodeIcon } from "lucide-react";
import React from "react";
import { Spinner } from "@/components/ui/spinner";

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

export type NumeroSerieFieldType = NullableInputFieldType;
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
    withSearchableButton = true,
    className, description, disabled, required, orientation,
}: Omit<CoreFieldLayoutProps, 'errors'> & {
    withSearchableButton?: boolean;
}) => {
    const field = useFieldContext<CuentaContableType>();

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
                    maxLength={9}
                    pattern={REGEXP_ONLY_DIGITS}
                    onChange={(value) => {
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
                {withSearchableButton && (
                    <Button variant="outline">
                        <ScanQrCodeIcon />Escanear QR
                    </Button>
                )}
            </Field>
        </FieldLayout>
    );
}
