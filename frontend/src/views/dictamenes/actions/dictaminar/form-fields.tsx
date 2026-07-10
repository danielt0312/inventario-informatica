import { TextareaField } from "@/components/composed/@tanstack/form/textarea-field";

export type CaracteristicasField = TextareaField;
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
