import { NonEmptyString, RequiredNumber } from "@/lib/schemas/common";
import type { ProductoTipoField } from "../../tipos/form-fields";
import type { ProductoMarcaField } from "../../marcas/form-fields";
import z from "zod";

export type Schema = {
    tipo_id: ProductoTipoField;
    marca_id: ProductoMarcaField;
    nombre: string;
}

export const defaultValues: Schema = {
    tipo_id: undefined,
    marca_id: undefined,
    nombre: ''
}

export const validator = z.object({
    tipo_id: RequiredNumber,
    marca_id: RequiredNumber,
    nombre: NonEmptyString
});

export type OutputSchema = z.output<typeof validator>;
