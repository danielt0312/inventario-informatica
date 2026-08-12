import { DatePickerField, type DatePickerFieldType } from "@/components/ui/date-picker-field";
import { InputField, NumberInputField, type InputFieldType, type NumberInputFieldType } from "@/components/ui/input-field";
import { TextareaField, type TextareaFieldType } from "@/components/ui/textarea-field";
import { ArchivoUploaderField, type ArchivoUploaderFieldType } from "@/components/features/archivos/uploader-field";
import React from "react";

export type CantidadFieldType = NumberInputFieldType;
export const CantidadField = ({
    label = "Cantidad",
    placeholder = "Ingresa la cantidad solicitada",
    required = true,
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <NumberInputField
        label={label}
        placeholder={placeholder}
        required={required}
        {...props}
    />
);

export type FolioFieldType = InputFieldType;
export const FolioField = ({
    label = "Folio del oficio de solicitud",
    placeholder = "Ingresa el folio del oficio de la solicitud",
    required = true,
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <InputField
        required={required}
        label={label}
        placeholder={placeholder}
        {...props}
    />
);

export type FechaSolicitudFieldType = DatePickerFieldType;
export const FechaSolicitudField = ({
    label = "Fecha de solicitud",
    placeholder = "Selecciona la fecha de la solicitud",
    required = true,
    ...props
}: React.ComponentProps<typeof DatePickerField>) => (
    <DatePickerField
        label={label}
        placeholder={placeholder}
        required={required}
        {...props}
    />
);

export type OficioFieldType = ArchivoUploaderFieldType;
export const OficioField = ({
    label = "Adjuntar oficio de solicitud",
    required = true,
    ...props
}: React.ComponentProps<typeof ArchivoUploaderField>) => (
    <ArchivoUploaderField
        label={label}
        required={required}
        {...props}
    />
);


export type CaracteristicasFieldType = TextareaFieldType;
export function CaracteristicasField({
    label = "Especificaciones técnicas",
    placeholder = "Ingresa las especificaciones técnicas",
    required = true,
    ...props
}: React.ComponentProps<typeof TextareaField>) {
    return (
        <TextareaField
            label={label}
            placeholder={placeholder}
            required={required}
            {...props}
        />
    );
}

export type DictamenArchivoFieldType = ArchivoUploaderFieldType;
export const DictamenArchivoField = ({
    label = "Adjuntar evidencia de dictamen recibido",
    required = true,
    ...props
}: React.ComponentProps<typeof ArchivoUploaderField>) => (
    <ArchivoUploaderField
        label={label}
        required={required}
        {...props}
    />
);
