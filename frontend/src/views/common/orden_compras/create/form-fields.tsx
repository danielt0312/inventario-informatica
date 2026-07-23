import { DatePickerField } from "@/components/composed/@tanstack/form/date-picker-field";
import { InputField } from "@/components/composed/@tanstack/form/input-field";

export type FechaSolicitudField = DatePickerField;
export const FechaSolicitudField = ({
    label = "Fecha de solicitud",
    ...props
}: React.ComponentProps<typeof DatePickerField>) => (
    <DatePickerField
        label={label}
        {...props}
    />
);

export type NumeroOrdenField = InputField;
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
