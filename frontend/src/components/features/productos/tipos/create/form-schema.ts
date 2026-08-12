import { requiredString, selectedNumberOption } from "@/lib/schemas/common";
import type { ProductoNombreFieldType } from "./form-fields";
import type { ProductoCategoriaFieldType } from "../../categorias/form-fields";
import z from "zod";

export type Schema = {
    categoria_id: ProductoCategoriaFieldType;
    nombre: ProductoNombreFieldType;
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
