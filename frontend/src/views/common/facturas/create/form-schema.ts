import { requiredIsoDateLTEToday, requiredString } from "@/lib/schemas/common";
import type { FechaEmisionField } from "./form-fields";
import type { ArchivoUploaderFieldType } from "@/components/features/archivos/uploader-field";
import z from "zod";

export type Schema = {
    fecha_emision: FechaEmisionField;
    archivo_uuid: ArchivoUploaderFieldType;
}

export const defaultValues: Schema = {
    fecha_emision: undefined,
    archivo_uuid: undefined
}

export const validator = z.object({
    fecha_emision: requiredIsoDateLTEToday,
    archivo_uuid: requiredString
});

export type FacturaCreateSchemaOutput = z.output<typeof validator>;
