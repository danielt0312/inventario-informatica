import { InputField } from "@/components/composed/@tanstack/form/input-field";

export type NombreField = InputField;
export const NombreField = ({
    label = "Nombre del proveedor",
    placeholder = "Ingresa el nombre del proveedor",
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <InputField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);
