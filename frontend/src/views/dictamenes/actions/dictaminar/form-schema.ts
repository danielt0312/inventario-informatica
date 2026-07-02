import {
    NonEmptyString,
    RequiredArray,
    RequiredNumber
} from "@/lib/schemas/common";
import type { ProductoModeloField } from "@/views/common/productos/modelos/form-fields";
import z from "zod";

export interface Schema {
    productos: {
        id: number;
        caracteristicas: string;
        producto_id: ProductoModeloField;
    }[];
}

export const validator = z.object({
    productos: RequiredArray(
        z.object({
            id: RequiredNumber,
            caracteristicas: NonEmptyString,
            producto_id: RequiredNumber
        })
    )
});
