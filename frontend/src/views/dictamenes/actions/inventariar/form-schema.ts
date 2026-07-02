import { NonEmptyString, RequiredArray, RequiredNumber, TrimmedString } from "@/lib/schemas/common";
import type { DictaminadoDictamenWithDictaminadoDictamenProductos } from "@/routes/_auth/dictamenes/$uuid/-types";
import type { ResultadoEsperadoFieldGroup } from "@/views/common/articulos/recepciones/form-schema";
import type { ProductoField } from "@/views/common/productos/modelos/partials/form-fields";
import type { ProductoTipoField } from "@/views/common/productos/tipos/partials/form-fields";
import z from "zod";

export type ProductoFields = ResultadoEsperadoFieldGroup & {
    dictamen_producto_id: number;
    cuenta_contable: string | null;
    archivo_id: number | null;
    producto_tipo_id: number;
    producto_id: number;
}

export type InventariarDictamenSchema = {
    productos: ProductoFields[];
}

export const defaultValues: (dictamen: DictaminadoDictamenWithDictaminadoDictamenProductos) => InventariarDictamenSchema = (dictamen) => ({
    productos: dictamen.dictamen_productos.map((dictamenProducto) => ({
        dictamen_producto_id: dictamenProducto.id,
        archivo_id: null,
        cuenta_contable: null,
        observaciones: null,
        resultado_esperado: null,
        producto_tipo_id: dictamenProducto.producto.tipo.id,
        producto_id: dictamenProducto.producto.modelo.id
    }))
});

export const validator = z.object({
    productos: RequiredArray(z
        .object({
            dictamen_producto_id: RequiredNumber,
            producto_tipo_id: RequiredNumber,
            producto_id: RequiredNumber,
            archivo_id: RequiredNumber,
            cuenta_contable: NonEmptyString,
            observaciones: TrimmedString.nullable(),
            resultado_esperado: z.boolean('Debes de seleccionar una opción')
        })
        .superRefine(({ resultado_esperado, observaciones }, ctx) => {
            if (resultado_esperado === false && (observaciones === null || observaciones.length === 0)) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Este campo es requerido',
                    path: ['observaciones']
                });
            }
        })
    )
});
