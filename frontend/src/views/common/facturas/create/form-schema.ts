import { requiredIsoDateLTEToday, standardPdfFile } from "@/lib/schemas/common";
import type { PdfFileField } from "../../archivos/form-fields";
import type { FechaEmisionField } from "./form-fields";
import z from "zod";

export type Schema = {
    fecha_emision: FechaEmisionField;
    archivo: PdfFileField;
}

export const defaultValues: Schema = {
    fecha_emision: undefined,
    archivo: undefined
}

export const validator = z.object({
    fecha_emision: requiredIsoDateLTEToday,
    archivo: standardPdfFile()
});
