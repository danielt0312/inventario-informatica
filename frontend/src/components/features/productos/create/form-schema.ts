import { requiredString, selectedNumberOption } from "@/lib/schemas/common";
import type { ProductoMarcaFieldType } from "../marcas/form-fields";
import type { ProductoTipoFieldType } from "../tipos/form-fields";
import type { ProductoNombreFieldType } from "./form-fields";
import z from "zod";

export type Schema = {
    tipo_id: ProductoTipoFieldType;
    marca_id: ProductoMarcaFieldType;
    nombre: ProductoNombreFieldType;
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
