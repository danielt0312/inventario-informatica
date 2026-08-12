import { requiredString } from "@/lib/schemas/common";
import type { ProductoCategoriaNombreFieldType } from "./form-fields";
import z from "zod";

export type ProductoCategoriaSchema = {
    nombre: ProductoCategoriaNombreFieldType;
}

export const productoCategoriaDefaultValues: ProductoCategoriaSchema = {
    nombre: undefined
}

export const productoCategoriaValidator = z.object({
    nombre: requiredString
});

export type ProductoCategoriaCreateOutputSchema = z.output<typeof productoCategoriaValidator>;
