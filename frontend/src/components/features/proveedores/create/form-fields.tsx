import { InputField, type InputFieldType } from "@/components/ui/input-field";

export type ProveedorNombreFieldType = InputFieldType;
export const ProveedorNombreField = ({
    label = "Nombre",
    placeholder = "Ingresa el nombre del proveedor",
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <InputField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);

export type ProveedorRfcFieldType = InputFieldType;
export const ProveedorRfcField = ({
    label = "RFC (con homoclave)",
    placeholder = "Ingresa el RFC con homoclave del proveedor",
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <InputField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);
