import { DatePickerField } from "@/components/composed/@tanstack/form/date-picker-field";
import { InputField, NumberInputField } from "@/components/composed/@tanstack/form/input-field";
import { AttachmentField } from "@/components/composed/@tanstack/form/attachment-field";
import { TextareaField } from "@/components/composed/@tanstack/form/textarea-field";
import React from "react";

export type CantidadField = NumberInputField;
export const CantidadField = ({
    label = "Cantidad",
    placeholder = "Ingresa la cantidad solicitada",
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <NumberInputField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);

export type FolioField = InputField;
export const FolioField = ({
    label = "Folio del oficio de solicitud",
    placeholder = "Ingresa el folio del oficio de la solicitud",
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <InputField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);

export type FechaSolicitudField = DatePickerField;
export const FechaSolicitudField = ({
    label = "Fecha de solicitud",
    placeholder = "Selecciona la fecha de la solicitud",
    ...props
}: React.ComponentProps<typeof DatePickerField>) => (
    <DatePickerField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);

export type OficioField = AttachmentField;
export const OficioField = ({
    label = "Adjuntar oficio de solicitud",
    ...props
}: React.ComponentProps<typeof AttachmentField>) => (
    <AttachmentField
        label={label}
        {...props}
    />
);


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

export type DictamenArchivoField = AttachmentField;
export const DictamenArchivoField = ({
    label = "Adjuntar evidencia de dictamen recibido",
    ...props
}: React.ComponentProps<typeof AttachmentField>) => (
    <AttachmentField
        label={label}
        {...props}
    />
);
