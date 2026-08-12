import { DatePickerField, type DatePickerFieldType } from "@/components/ui/date-picker-field";
import { InputField, type InputFieldType } from "@/components/ui/input-field";

export type FechaSolicitudFieldType = DatePickerFieldType;
export const FechaSolicitudField = ({
    label = "Fecha de solicitud",
    ...props
}: React.ComponentProps<typeof DatePickerField>) => (
    <DatePickerField
        label={label}
        {...props}
    />
);

export type NumeroOrdenFieldType = InputFieldType;
export const NumeroOrdenField = ({
    label = "Orden No.",
    placeholder = "Ingresa el número de la orden de compra",
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <InputField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);
