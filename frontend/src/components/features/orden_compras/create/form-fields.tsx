import { DatePickerField, type DatePickerFieldType } from "@/components/ui/date-picker-field";
import { InputField, type InputFieldType } from "@/components/ui/input-field";

export type OrdenCompraFechaSolicitudFieldType = DatePickerFieldType;
export const OrdenCompraFechaSolicitudField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof DatePickerField>) => (
    <DatePickerField
        fieldLayout={{
            label: "Fecha de Solicitud",
            ...fieldLayout
        }}
        {...props}
    />
);

export type OrdenCompraNumeroOrdenFieldType = InputFieldType;
export const OrdenCompraNumeroOrdenField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <InputField
        placeholder="Ingresa el número de la orden de compra"
        fieldLayout={{
            label: "Orden No.",
            ...fieldLayout
        }}
        {...props}
    />
);
