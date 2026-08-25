import { InputField, type InputFieldType } from "@/components/ui/input-field";

export type ProductoNombreFieldType = InputFieldType;
export function ProductoNombreField({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof InputField>) {
    return (
        <InputField
            fieldLayout={{
                label: "Tipo de Producto",
                ...fieldLayout
            }}
            placeholder="Ingresa el nombre del tipo de producto"
            {...props}
        />
    );
}
