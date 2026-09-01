import { DatePickerField, type DatePickerFieldType } from "@/components/ui/date-picker-field";
import { InputField, NumberInputField, type InputFieldType, type NumberInputFieldType } from "@/components/ui/input-field";
import { TextareaField, type TextareaFieldType } from "@/components/ui/textarea-field";
import { ArchivoUploaderField, type ArchivoUploaderFieldType } from "@/components/features/archivos/uploader-field";
import React from "react";

export type CantidadFieldType = NumberInputFieldType;
export const CantidadField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <NumberInputField
        fieldLayout={{
            label: "Cantidad",
            ...fieldLayout
        }}
        placeholder="Ingresa la cantidad solicitada"
        required
        {...props}
    />
);

export type FolioFieldType = InputFieldType;
export const FolioField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <InputField
        fieldLayout={{
            label: "Folio del oficio de solicitud",
            ...fieldLayout
        }}
        placeholder="Ingresa el folio del oficio de la solicitud"
        required
        {...props}
    />
);

export type FechaSolicitudFieldType = DatePickerFieldType;
export const FechaSolicitudField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof DatePickerField>) => (
    <DatePickerField
        fieldLayout={{
            label: "Fecha de solicitud",
            ...fieldLayout
        }}
        placeholder="Selecciona la fecha de la solicitud"
        required
        {...props}
    />
);

export type OficioArchivoFieldType = ArchivoUploaderFieldType;
export const OficioArchivoField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof ArchivoUploaderField>) => (
    <ArchivoUploaderField
        fieldLayout={{
            label: "Adjuntar oficio de solicitud",
            required: true,
            ...fieldLayout
        }}
        {...props}
    />
);


export type DictamenEspecificacionesTecnicasFieldType = TextareaFieldType;
export function DictamenEspecificacionesTecnicasField({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof TextareaField>) {
    return (
        <TextareaField
            fieldLayout={{
                label: "Especificaciones técnicas",
                ...fieldLayout
            }}
            placeholder="Ingresa las especificaciones técnicas"
            required
            {...props}
        />
    );
}

export type DictamenArchivoFieldType = ArchivoUploaderFieldType;
export const DictamenArchivoField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof ArchivoUploaderField>) => (
    <ArchivoUploaderField
        fieldLayout={{
            label: "Adjuntar acuse de recibido del dictamen tecnológico",
            required: true,
            ...fieldLayout
        }}
        {...props}
    />
);

export type DictamenMotivoCambioFieldType = TextareaFieldType;
export const DictamenMotivoCambioField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof TextareaField>) => (
    <TextareaField
        fieldLayout={{
            label: "Motivo de Cambio",
            ...fieldLayout,
        }}
        placeholder="Ingresa alguna observacion o notación sobre el motivo de cambio"
        {...props}
    />
)
