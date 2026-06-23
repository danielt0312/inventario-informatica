import { NonEmptyStringToNumber, RequiredArray, TrimmedString } from "@/lib/schemas/common";
import type { ActionDictamen as ActionValidatedDictamen } from "@/routes/_auth/dictamenes/$uuid/$action";
import z from "zod";

export interface ValidatedDictamen
    extends ActionValidatedDictamen {}

export interface Schema {
    productos: {
        id: string;
        archivo_uuid: string;
    }[]
}

export const validator = z.object({
    productos: RequiredArray(z.object({
        id: NonEmptyStringToNumber,
        archivo_uuid: TrimmedString
            .min(1, 'Debes de seleccionar un archivo')
    }))
});

