import { InputField, NullableInputField, NullableNumberInputField, type InputFieldType, type NullableInputFieldType, type NullableNumberInputFieldType } from "@/components/ui/input-field";
import { BooleanField, type BooleanFieldType } from "@/components/ui/boolean-field";

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
    label= "Número de serie",
    placeholder= "Ingresa el número de serie",
    ...props
}: React.ComponentProps<typeof NullableInputField>) => (
    <NullableInputField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);

export type CuentaContableType = InputFieldType;
export const CuentaContable = ({
    label = 'Cuenta contable',
    placeholder = 'Ingresa la cuenta contable',
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <InputField
        label={label}
        placeholder={placeholder}
        {...props}
    />
)
