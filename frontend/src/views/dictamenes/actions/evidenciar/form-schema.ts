import { standardPdfFile } from "@/lib/schemas/common";
import type { PdfFileField } from "@/views/common/archivos/form-fields";
import z from "zod";

export type Schema = {
    archivo: PdfFileField;
}

export const defaultValues: Schema = {
    archivo: undefined
}

export const validator = z.object({
    archivo: standardPdfFile
});

