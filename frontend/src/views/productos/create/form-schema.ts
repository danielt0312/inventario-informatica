import {
    type Schema as TipoSchema,
    validator as tipoValidator
} from "../tipos/partials/form-schema";
import {
    type Schema as MarcaSchema,
    validator as marcaValidator
} from "../marcas/partials/form-schema";

import {
    NonEmptyString,
} from "@/lib/schemas/common";
import z from "zod";

export type Schema = {
    tipo_id: TipoSchema['id'];
    marca_id: MarcaSchema['id'];
    nombre: string;
}

export const defaultValues: Schema = {
    tipo_id: '',
    marca_id: '',
    nombre: ''
}

export const validator = z.object({
    tipo_id: tipoValidator.shape.id,
    marca_id: marcaValidator.shape.id,
    nombre: NonEmptyString
});
