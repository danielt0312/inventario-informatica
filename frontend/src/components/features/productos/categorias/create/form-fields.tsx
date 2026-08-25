import { InputField, type InputFieldType } from "@/components/ui/input-field";
import type React from "react";

export type ProductoCategoriaNombreFieldType = InputFieldType;
export function ProductoCategoriaNombreField({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof InputField>) {
    return (
        <InputField
            placeholder="Ingresa el nombre de la categoría de producto"
            fieldLayout={{
                label: "Categoría de Producto",
                ...fieldLayout
            }}
            {...props}
        />
    );
}
