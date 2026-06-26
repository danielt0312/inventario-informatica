import { ArrayStandardFile } from "@/lib/schemas/common";
import type { ArchivoField } from "@/views/common/archivos/form-fields";
import z from "zod";

export type Schema = {
    archivo: ArchivoField;
}

export const validator = z.object({
    archivo: ArrayStandardFile
});

