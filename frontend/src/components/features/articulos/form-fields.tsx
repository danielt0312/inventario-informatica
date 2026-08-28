import { InputField, NullableInputField, NullableNumberInputField, type InputFieldType, type NullableInputFieldType, type NullableNumberInputFieldType } from "@/components/ui/input-field";
import { useFieldContext } from "@/components/ui/form-context";
import { ScannerButton } from "@/components/ui/scanner-button";
import { FieldLayout } from "@/components/ui/field-layout";
import { ButtonGroup } from "@/components/ui/button-group";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { BarcodeIcon, DollarSignIcon, LandmarkIcon } from "lucide-react";
import { NullableTextareaField, type NullableTextareaFieldType } from "@/components/ui/textarea-field";
import { BooleanField, type BooleanFieldType } from "@/components/ui/boolean-field";
import React from "react";

export type ObservacionesFieldType = NullableTextareaFieldType;
export const ObservacionesField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof NullableTextareaField>) => (
    <NullableTextareaField
        fieldLayout={{
            label: "Observaciones/Aclaraciones",
            ...fieldLayout
        }}
        placeholder="Ingresa cualquier observación, aclaración, o nota importante a mencionar"
        {...props}
    />
);

export type EsResultadoEsperadoFieldType = BooleanFieldType;
export const EsResultadoEsperadoField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof BooleanField>) => (
    <BooleanField
        fieldLayout={{
            label: "¿Cumplió con las características solicitadas?",
            ...fieldLayout
        }}
        {...props}
    />
);


export type ArticuloCostoUnitarioFieldType = NullableNumberInputFieldType;
export const ArticuloCostoUnitarioField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof NullableNumberInputField>) => (
    <NullableNumberInputField
        fieldLayout={{
            label: "Costo Unitario",
            ...fieldLayout
        }}
        placeholder={"Ingresa el costo unitario"}
        {...props}
    >
        <InputGroupAddon>
            <DollarSignIcon />
        </InputGroupAddon>
    </NullableNumberInputField>
);

export type ArticuloNumeroInventarioFieldType = InputFieldType;
export const ArticuloNumeroInventarioField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <InputField
        fieldLayout={{
            label: "Número de Inventario",
            ...fieldLayout
        }}
        placeholder="Ingresa el número de inventario"
        {...props}
    />
);

export type ArticuloNullableNumeroInventarioFieldType = NullableInputFieldType;
export const ArticuloNullableNumeroInventarioField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof NullableInputField>) => (
    <NullableInputField
        fieldLayout={{
            label: "Número de Inventario",
            ...fieldLayout
        }}
        placeholder="Ingresa el número de inventario"
        {...props}
    />
);

export type ArticuloNumeroSerieFieldType = InputFieldType;
export const ArticuloNumeroSerieField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof NullableInputField>) => (
    <NullableInputField
        fieldLayout={{
            label: "Número de serie",
            ...fieldLayout
        }}
        placeholder="Ingresa el número de serie"
        {...props}
    >
        <InputGroupAddon>
            <BarcodeIcon />
        </InputGroupAddon>
    </NullableInputField>
);

export type ArticuloCuentaContableType = InputFieldType;
export const ArticuloCuentaContable = ({
    className,
    fieldLayout,
    required,
    disabled,
    placeholder = "Ingresa o escanea la cuenta contable",
    timeout = 3500,
    ...props
}: React.ComponentProps<typeof InputField> & {
    timeout?: number;
}) => {
    const field = useFieldContext<ArticuloCuentaContableType>();

    return (
        <>
            <FieldLayout
                className={className}
                fieldLayout={{
                    required,
                    disabled,
                    label: "Cuenta contable",
                    errors: field.state.meta.errors,
                    ...fieldLayout
                }}
            >
                <ButtonGroup>
                    <InputGroup>
                        <InputGroupInput
                            name={field.name}
                            value={field.state.value ?? ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                field.handleChange(value.trim() === ''
                                    ? undefined
                                    : value.trim());
                            }}
                            placeholder={placeholder}
                            {...props}
                        >
                        </InputGroupInput>
                        <InputGroupAddon>
                            <LandmarkIcon />
                        </InputGroupAddon>
                    </InputGroup>

                    <ScannerButton
                        onScannedCode={(code) => {
                            const value = code.trim();
                            field.handleChange(value.trim() === ''
                                ? undefined
                                : value)
                        }}
                    />
                </ButtonGroup>
            </FieldLayout>
        </>
    );
}
