import { requiredString, selectedNumberOption } from "@/lib/schemas/common";
import type { ProductoMarcaFieldType } from "../marcas/form-fields";
import type { ProductoTipoFieldType } from "../tipos/form-fields";
import type { ProductoModeloFieldType } from "./form-fields";
import z from "zod";

export type Schema = {
    tipo_id: ProductoTipoFieldType;
    marca_id: ProductoMarcaFieldType;
    modelo: ProductoModeloFieldType;
}

export const defaultValues: Schema = {
    tipo_id: undefined,
    marca_id: undefined,
    modelo: undefined
}

export const validator = z.object({
    tipo_id: selectedNumberOption,
    marca_id: selectedNumberOption,
    modelo: requiredString
});

export type OutputSchema = z.output<typeof validator>;
