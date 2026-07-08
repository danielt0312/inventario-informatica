import { ArrayStandardFile } from "@/lib/schemas/common";
import type { PdfArchivoField } from "@/views/common/archivos/form-fields";
import z from "zod";

export type Schema = {
    archivo: PdfArchivoField;
}

export const validator = z.object({
    archivo: ArrayStandardFile
});

