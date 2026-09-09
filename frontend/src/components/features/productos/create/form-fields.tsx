import { InputField, type InputFieldType } from "@/components/ui/input-field";

export type ProductoModeloFieldType = InputFieldType;
export function ProductoModeloField({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof InputField>) {
    return (
        <InputField
            fieldLayout={{
                label: "Modelo del Producto",
                ...fieldLayout
            }}
            placeholder="Ingresa el nombre del modelo del producto"
            {...props}
        />
    );
}
