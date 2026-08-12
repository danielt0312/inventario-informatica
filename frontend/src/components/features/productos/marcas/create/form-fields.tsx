import { InputField, type InputFieldType } from "@/components/ui/input-field";
import type React from "react";

export type ProductoMarcaNombreFieldType = InputFieldType;
export function ProductoMarcaNombreField({
    label = "Marca del Producto",
    placeholder = "Ingresa el nombre de la marca del producto",
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
