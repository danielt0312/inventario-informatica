import { TextareaField } from "@/components/composed/@tanstack/form/field-components";

export function CaracteristicasField({
    label = "Especificaciones técnicas",
    placeholder = "Ingresa las especificaciones técnicas",
    ...props
}: React.ComponentProps<typeof TextareaField>) {
    return (
        <TextareaField
            label={label}
            placeholder={placeholder}
            {...props}
        />
    );
}
