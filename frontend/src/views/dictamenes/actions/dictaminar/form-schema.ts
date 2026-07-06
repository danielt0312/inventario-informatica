import {
    NonEmptyString,
    RequiredArray,
    RequiredNumber
} from "@/lib/schemas/common";
import type { ProductoModeloField } from "@/views/common/productos/modelos/form-fields";
import type { CaracteristicasField } from "./form-fields";
import z from "zod";

export interface Schema {
    productos: {
        id: ProductoModeloField;
        caracteristicas: CaracteristicasField;
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
