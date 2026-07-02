import {
    NonEmptyString,
    NonEmptyStringToNumber,
    RequiredArray
} from "@/lib/schemas/common";
import z from "zod";

import {
    type Schema as ProductoSchema,
    validator as productoValidator
} from "@/views/common/productos/modelos/partials/form-schema";

export interface Schema {
    productos: {
        id: string;
        caracteristicas: string;
        producto_id: ProductoSchema['id'];
    }[];
}

export const validator = z.object({
    productos: RequiredArray(
        z.object({
            id: NonEmptyStringToNumber,
            caracteristicas: NonEmptyString,
            producto_id: productoValidator.shape.id
        })
    )
});
