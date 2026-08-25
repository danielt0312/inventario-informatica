import { InputField, type InputFieldType } from "@/components/ui/input-field";

export type ProveedorNombreFieldType = InputFieldType;
export const ProveedorNombreField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <InputField
        placeholder="Ingresa el nombre del proveedor"
        fieldLayout={{
            label: "Nombre",
            ...fieldLayout
        }}
        {...props}
    />
);

export type ProveedorRfcFieldType = InputFieldType;
export const ProveedorRfcField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <InputField
        fieldLayout={{
            label: "RFC (con homoclave)",
            ...fieldLayout
        }}
        placeholder="Ingresa el RFC con homoclave del proveedor"
        {...props}
    />
);
