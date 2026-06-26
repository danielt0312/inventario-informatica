import { NonEmptyString, NonEmptyStringToNumber } from "@/lib/schemas/common";
import type { NombreField } from "./form-fields";
import type { CategoriaField } from "../../categorias/partials/form-fields";
import z from "zod";

export type Schema = {
    categoria_id: CategoriaField;
    nombre: NombreField;
}

export const defaultValues: Schema = {
    categoria_id: '',
    nombre: ''
}

export const validator = z.object({
    categoria_id: NonEmptyStringToNumber,
    nombre: NonEmptyString
});
