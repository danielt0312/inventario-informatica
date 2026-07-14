import { requiredArray, requiredString, selectedNumberOption } from "@/lib/schemas/common";
import type { ProductoField } from "@/views/common/productos/form-fields";
import type { CaracteristicasField } from "./form-fields";
import z from "zod";
import type { DetailedActionDictaminarDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";

export type Schema = {
    productos: {
        id: number;
        caracteristicas: CaracteristicasField;
        producto_id: ProductoField;
    }[];
}

export const defaultValues = (dictamen: DetailedActionDictaminarDictamen): Schema => ({
    productos: dictamen.dictamen_productos.map((dictamenProducto) => ({
        id: dictamenProducto.id,
        caracteristicas: undefined,
        producto_id: undefined,
    }))
});

export const validator = z.object({
    productos: requiredArray(
        z.object({
            id: selectedNumberOption,
            caracteristicas: requiredString,
            producto_id: selectedNumberOption
        })
    )
});
