import { DatePickerField } from "@/components/composed/@tanstack/form/date-picker-field";

export type FechaEmisionField = DatePickerField;
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
