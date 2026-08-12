import { InputField, type InputFieldType } from "@/components/ui/input-field";
import type React from "react";

export type ProductoCategoriaNombreFieldType = InputFieldType;
export function ProductoCategoriaNombreField({
    label = "Categoría de Producto",
    placeholder = "Ingresa el nombre de la categoría de producto",
    ...props
}: React.ComponentProps<typeof InputField>) {
    return (
        <InputField
            label={label}
            placeholder={placeholder}
            {...props}
        />
    );
}
