import { NonEmptyString, RequiredNumber } from "@/lib/schemas/common";
import type { NombreField } from "./form-fields";
import type { ProductoCategoriaField } from "../../categorias/form-fields";
import z from "zod";

export type Schema = {
    categoria_id: ProductoCategoriaField;
    nombre: NombreField;
}

export const defaultValues: Schema = {
    categoria_id: undefined,
    nombre: ''
}

export const validator = z.object({
    categoria_id: RequiredNumber,
    nombre: NonEmptyString
});

export type OutputSchema = z.output<typeof validator>;
