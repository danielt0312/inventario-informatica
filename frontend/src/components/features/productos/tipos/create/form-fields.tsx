import { InputField, type InputFieldType } from "@/components/ui/input-field";
import React from "react";

export type ProductoNombreFieldType = InputFieldType;
export function ProductoNombreField({
    label = "Tipo de Producto",
    placeholder = "Ingresa el nombre del tipo de producto",
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
