import { NonEmptyString, RequiredArray, RequiredNumber, TrimmedString } from "@/lib/schemas/common";
import { DictamenProducto } from "@/lib/utils";
import type { ActionDictaminadoDictamenWithDictamenProductos } from "@/routes/_auth/dictamenes/$uuid/-types";
import type { NumeroInventarioField } from "@/views/common/articulos/form-fields";
import type { ResultadoEsperadoFieldGroup } from "@/views/common/articulos/recepciones/form-schema";
import type { ProductoModeloField } from "@/views/common/productos/modelos/form-fields";
import type { ProductoTipoField } from "@/views/common/productos/tipos/form-fields";
import z from "zod";

export type ProductoField = ResultadoEsperadoFieldGroup & {
    dictamen_producto_id: number | undefined;
    cuenta_contable: string | undefined;
    archivo_id: number | undefined;
    producto_tipo_id: ProductoTipoField;
    producto_id: ProductoModeloField;
    numero_inventario: NumeroInventarioField | null;
}

export const defaultValuesProductoField: ProductoField = {
    archivo_id: undefined,
    cuenta_contable: undefined,
    dictamen_producto_id: undefined,
    numero_inventario: null,
    observaciones: null,
    producto_id: undefined,
    producto_tipo_id: undefined,
    resultado_esperado: undefined
}

export type InventariarDictamenSchema = {
    productos: ProductoField[];
}

export const defaultValues = (dictamen: ActionDictaminadoDictamenWithDictamenProductos): InventariarDictamenSchema => ({
    productos: dictamen.dictamen_productos.map((dictamenProducto): ProductoField => ({
        ...defaultValuesProductoField,
        dictamen_producto_id: dictamenProducto.id,
        producto_tipo_id: dictamenProducto.producto.tipo.id,
        producto_id: dictamenProducto.producto.modelo.id,
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
            resultado_esperado: z.boolean('Debes de seleccionar una opción'),
            numero_inventario: TrimmedString.nullable()
        })
        .superRefine(({
            resultado_esperado,
            observaciones,
            producto_tipo_id,
            numero_inventario
        }, ctx) => {
            if (resultado_esperado === false && (observaciones === null || observaciones.length === 0)) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Este campo es requerido',
                    path: ['observaciones']
                });
            }

            if (DictamenProducto.tipoRequiereNumeroInventario(producto_tipo_id) && (numero_inventario === null || numero_inventario.length === 0)) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Este campo es requerido',
                    path: ['numero_inventario']
                });
            }
        })
    )
});
