import { ArrayStandardFile } from "@/lib/schemas/common";
import { type ValidatedDictamen as ActionValidatedDictamen } from "@/routes/_auth/dictamenes/$uuid/$action";
import z from "zod";

export interface Schema {
    archivo: File[] | undefined;
}

export const submitValidator = z.object({
    archivo: ArrayStandardFile
});

export type ValidatedDictamen = Omit<ActionValidatedDictamen, 'documento'> & {
    documento: NonNullable<ActionValidatedDictamen['documento']>;
}
