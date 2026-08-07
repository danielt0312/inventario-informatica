import { requiredIsoDateLTEToday, requiredString } from "@/lib/schemas/common";
import type { FechaEmisionField } from "./form-fields";
import type { ArchivoUploaderFieldType } from "@/components/features/archivos/uploader-field";
import type { ArchivoAttachmentFieldType } from "@/components/features/archivos/attachment-field";
import z from "zod";

export type Schema = {
    orden_compra_uuid: ArchivoAttachmentFieldType;
    fecha_emision: FechaEmisionField;
    archivo_uuid: ArchivoUploaderFieldType;
}

export const defaultValues: Schema = {
    orden_compra_uuid: undefined,
    fecha_emision: undefined,
    archivo_uuid: undefined
}

export const validator = z.object({
    orden_compra_uuid: requiredString,
    fecha_emision: requiredIsoDateLTEToday,
    archivo_uuid: requiredString
});

export type FacturaCreateSchemaOutput = z.output<typeof validator>;
