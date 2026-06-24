import * as CatalogSchema from "../../common/forms/schemas";
import { NonEmptyString } from "@/lib/schemas/common";
import z from "zod";

export type Schema = {
    tipo_id: CatalogSchema.Field;
    marca_id: CatalogSchema.Field;
    nombre: string;
}

export const defaultValues: Schema = {
    tipo_id: CatalogSchema.defaultValue,
    marca_id: CatalogSchema.defaultValue,
    nombre: ''
}

export const validator = z.object({
    tipo_id: CatalogSchema.validator,
    marca_id: CatalogSchema.validator,
    nombre: NonEmptyString
});
