import { DatePickerField, type DatePickerFieldType } from "@/components/ui/date-picker-field";
import { InputField, type InputFieldType } from "@/components/ui/input-field";

export type FacturaFechaEmisionFieldType = DatePickerFieldType;
export const FacturaFechaEmisionField = ({
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

export type FacturaFolioFieldType = InputFieldType;
export const FacturaFolioField = ({
    label = "Folio de factura",
    placeholder = "Ingresa el folio de la factura",
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <InputField
        label={label}
        placeholder={placeholder}
        {...props}
    />
)
