import { requiredString } from "@/lib/schemas/common";
import type { ProductoMarcaNombreFieldType } from "./form-fields";
import z from "zod";

export type Schema = {
    nombre: ProductoMarcaNombreFieldType;
}

export const defaultValues: Schema = {
    nombre: undefined
}

export const validator = z.object({
    nombre: requiredString
});

export type OutputSchema = z.output<typeof validator>;
