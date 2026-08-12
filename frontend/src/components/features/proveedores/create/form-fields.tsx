import { InputField, type InputFieldType } from "@/components/ui/input-field";

export type ProveedorNombreFieldType = InputFieldType;
export const ProveedorNombreField = ({
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
