import { InputField } from "@/components/composed/@tanstack/form/input-field";

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
