import { DatePickerField, type DatePickerFieldType } from "@/components/ui/date-picker-field";
import { InputField, NumberInputField, type InputFieldType, type NumberInputFieldType } from "@/components/ui/input-field";
import { NullableTextareaField, TextareaField, type NullableTextareaFieldType, type TextareaFieldType } from "@/components/ui/textarea-field";
import { ArchivoUploaderField, type ArchivoUploaderFieldType } from "@/components/features/archivos/uploader-field";
import React from "react";
import { useFieldContext } from "@/components/ui/form-context";
import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import { CirclePlusIcon, PlusCircleIcon } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormLayout } from "@/components/ui/form-layout";
import { useAppForm } from "@/components/ui/form.shared";
import { discoDefaultFormValues, DiscoFieldsGroup, discoFormValidator } from "../discos/field";
import { ProductoVarianteSpecFieldGroup } from "../productos/variante-spec-field-group";
import { Button } from "@/components/ui/button";
import type { ProductoTipoFieldType } from "../productos/tipo-field";
import type { ProductoMarcaFieldType } from "../productos/marca-field";

export type DictamenCantidadFieldType = NumberInputFieldType;
export const DictamenCantidadField = ({
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

export type DictamenFolioFieldType = InputFieldType;
export const DictamenFolioField = ({
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

export type DictamenFechaSolicitudFieldType = DatePickerFieldType;
export const DictamenFechaSolicitudField = ({
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

export type DictamenOficioArchivoFieldType = ArchivoUploaderFieldType;
export const DictamenOficioArchivoField = ({
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


export type DictamenCaracteristicasAdicionalesFieldType = NullableTextareaFieldType;
export function DictamenCaracteristicasAdicionalesField({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof TextareaField>) {
    return (
        <NullableTextareaField
            fieldLayout={{
                label: "Características adicionales",
                ...fieldLayout
            }}
            placeholder="Ingresa cualquier característica adicional"
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
);
