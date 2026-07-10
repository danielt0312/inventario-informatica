import { requiredArray, requiredString, selectedNumberOption } from "@/lib/schemas/common";
import type { ProductoModeloField } from "@/views/common/productos/modelos/form-fields";
import type { CaracteristicasField } from "./form-fields";
import z from "zod";
import type { ActionDictaminarDictamenWithDictamenProductos } from "@/routes/_auth/dictamenes/$uuid/-types";

export type Schema = {
    productos: {
        id: ProductoModeloField;
        caracteristicas: CaracteristicasField;
        producto_id: ProductoModeloField;
    }[];
}

export const defaultValues = (dictamen: ActionDictaminarDictamenWithDictamenProductos): Schema => ({
    productos: dictamen.dictamen_productos.map((dictamenProducto) => ({
        id: dictamenProducto.id,
        caracteristicas: '',
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
