import { requiredString, selectedNumberOption } from "@/lib/schemas/common";
import type { NombreField } from "./form-fields";
import z from "zod";
import type { ProductoTipoField } from "../tipos/form-fields";
import type { ProductoMarcaField } from "../marcas/form-fields";

export type Schema = {
    tipo_id: ProductoTipoField;
    marca_id: ProductoMarcaField;
    nombre: NombreField;
}

export const defaultValues: Schema = {
    tipo_id: undefined,
    marca_id: undefined,
    nombre: undefined
}

export const validator = z.object({
    tipo_id: selectedNumberOption,
    marca_id: selectedNumberOption,
    nombre: requiredString
});

export type OutputSchema = z.output<typeof validator>;
