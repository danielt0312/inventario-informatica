import { DatePickerField, type DatePickerFieldType } from "@/components/ui/date-picker-field";

export type FechaEmisionFieldType = DatePickerFieldType;
export const FechaEmisionField = ({
    label = "Fecha de emisión",
    placeholder = "Ingresa la fecha de emisión",
    ...props
}: React.ComponentProps<typeof DatePickerField>) => (
    <DatePickerField
        label={label}
        placeholder={placeholder}
        {...props}
    />
)
