import { InputField, type InputFieldType } from "@/components/ui/input-field";
import type React from "react";

export type ProductoMarcaNombreFieldType = InputFieldType;
export function ProductoMarcaNombreField({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof InputField>) {
    return (
        <InputField
            fieldLayout={{
                label: "Marca del Producto",
                ...fieldLayout
            }}
            placeholder="Ingresa el nombre de la marca del producto"
            {...props}
        />
    );
}
