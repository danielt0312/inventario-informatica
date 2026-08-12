import { requiredIsoDateLTEToday, requiredString, selectedNumberOption } from "@/lib/schemas/common";
import type { ProveedorField } from "../../proveedores/form-fields";
import type { ArchivoUploaderFieldType } from "@/components/features/archivos/uploader-field";
import type { FechaSolicitudFieldType, NumeroOrdenFieldType } from "./form-fields";
import z from "zod";

export type Schema = {
    proveedor_id: ProveedorField;
    archivo_uuid: ArchivoUploaderFieldType;
    fecha_solicitud: FechaSolicitudFieldType;
    numero_orden: NumeroOrdenFieldType;
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
