import { requiredString } from "@/lib/schemas/common";
import type { DictamenArchivoFieldType } from "../../partials/form-fields";
import z from "zod";

export type Schema = {
    archivo_uuid: DictamenArchivoFieldType;
}

export const defaultValues: Schema = {
    archivo_uuid: undefined
}

export const validator = z.object({
    archivo_uuid: requiredString
});

