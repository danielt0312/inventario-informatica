import { requiredString, selectedNumberOption } from "@/lib/schemas/common";
import type { NombreField } from "./form-fields";
import type { ProductoCategoriaField } from "../../categorias/form-fields";
import z from "zod";

export type Schema = {
    categoria_id: ProductoCategoriaField;
    nombre: NombreField;
}

export const defaultValues: Schema = {
    categoria_id: undefined,
    nombre: undefined
}

export const validator = z.object({
    categoria_id: selectedNumberOption,
    nombre: requiredString
});

export type OutputSchema = z.output<typeof validator>;
