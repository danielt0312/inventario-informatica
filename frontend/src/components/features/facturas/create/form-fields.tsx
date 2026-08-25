import { DatePickerField, type DatePickerFieldType } from "@/components/ui/date-picker-field";
import { InputField, type InputFieldType } from "@/components/ui/input-field";

export type FacturaFechaEmisionFieldType = DatePickerFieldType;
export const FacturaFechaEmisionField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof DatePickerField>) => (
    <DatePickerField
        placeholder="Ingresa la fecha de emisión"
        fieldLayout={{
            label: "Fecha de emisión",
            ...fieldLayout
        }}
        {...props}
    />
)

export type FacturaFolioFieldType = InputFieldType;
export const FacturaFolioField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <InputField
        placeholder="Ingresa el folio de la factura"
        fieldLayout={{
            label: "Folio de factura"
        }}
        {...props}
    />
)
