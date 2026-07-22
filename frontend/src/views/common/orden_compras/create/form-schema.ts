import z from "zod";
import type { PdfFileField } from "../../archivos/form-fields"
import type { ProveedorField } from "../../proveedores/form-fields";
import type { FechaSolicitudField, NumeroOrdenField } from "./form-fields";
import { requiredIsoDateLTEToday, requiredString, selectedNumberOption, standardPdfFile } from "@/lib/schemas/common";

export type Schema = {
    proveedor_id: ProveedorField;
    archivo: PdfFileField;
    fecha_solicitud: FechaSolicitudField;
    numero_orden: NumeroOrdenField;
}

export const defaultValues: Schema = {
    proveedor_id: undefined,
    archivo: undefined,
    fecha_solicitud: undefined,
    numero_orden: undefined
}

export const validator = z.object({
    proveedor_id: selectedNumberOption,
    archivo: standardPdfFile(),
    fecha_solicitud: requiredIsoDateLTEToday,
    numero_orden: requiredString
});

export type OutputSchema = z.output<typeof validator>;
