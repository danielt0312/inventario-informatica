import { NonEmptyString } from "@/lib/schemas/common";
import z from "zod";
import {
    defaultValues as categoriaDefaultValues,
    type Schema as CategoriaSchema,
    validator as categoriaValidator
} from "../../categorias/partials/form-schema";

export type Schema = {
    categoria_id: CategoriaSchema['id'];
    nombre: string;
}

export const defaultValues: Schema = {
    categoria_id: categoriaDefaultValues.id,
    nombre: ''
}

export const validator = z.object({
    categoria_id: categoriaValidator.shape.id,
    nombre: NonEmptyString
});
