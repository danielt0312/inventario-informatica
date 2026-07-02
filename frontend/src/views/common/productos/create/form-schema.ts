import { NonEmptyString, NonEmptyStringToNumber } from "@/lib/schemas/common";
import type { ProductoTipoField } from "../tipos/partials/form-fields";
import type { ProductoMarcaField } from "../marcas/partials/form-fields";
import z from "zod";

export type Schema = {
    tipo_id: ProductoTipoField;
    marca_id: ProductoMarcaField;
    nombre: string;
}

export const defaultValues: Schema = {
    tipo_id: '',
    marca_id: '',
    nombre: ''
}

export const validator = z.object({
    tipo_id: NonEmptyStringToNumber,
    marca_id: NonEmptyStringToNumber,
    nombre: NonEmptyString
});
