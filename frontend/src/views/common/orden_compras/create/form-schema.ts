import z from "zod";
import type { ProveedorField } from "../../proveedores/form-fields";
import type { FechaSolicitudField, NumeroOrdenField } from "./form-fields";
import { requiredIsoDateLTEToday, requiredString, selectedNumberOption, standardPdfFile } from "@/lib/schemas/common";
import type { ArchivoUploaderFieldType } from "@/components/features/archivos/uploader-field";

export type Schema = {
    proveedor_id: ProveedorField;
    archivo_uuid: ArchivoUploaderFieldType;
    fecha_solicitud: FechaSolicitudField;
    numero_orden: NumeroOrdenField;
}

export const defaultValues: Schema = {
    proveedor_id: undefined,
    archivo_uuid: undefined,
    fecha_solicitud: undefined,
    numero_orden: undefined
}

export const validator = z.object({
    proveedor_id: selectedNumberOption,
    archivo_uuid: requiredString,
    fecha_solicitud: requiredIsoDateLTEToday,
    numero_orden: requiredString
});

export type OutputSchema = z.output<typeof validator>;
