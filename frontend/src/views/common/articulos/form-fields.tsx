import { InputField, NullableInputField, NullableNumberInputField } from "@/components/composed/@tanstack/form/input-field";
import { BooleanField } from "@/components/ui/forms/boolean-field";

export type CostoUnitarioField = NullableNumberInputField;
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

export type NumeroInventarioField = InputField;
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

export type NullableNumeroInventarioField = NullableInputField;
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

export type EsContableField = BooleanField;
export const EsContableField = ({
    label = "¿Es contable?",
    ...props
}: React.ComponentProps<typeof BooleanField>) => (
    <BooleanField
        label={label}
        {...props}
    />
);

export type NumeroSerieField = NullableInputField;
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

export type CuentaContable = InputField;
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
