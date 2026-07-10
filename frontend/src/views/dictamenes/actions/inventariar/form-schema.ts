import { nullableString, requiredArray, requiredString, selectedBooleanOption, selectedNumberOption } from "@/lib/schemas/common";
import { DictamenProducto } from "@/lib/utils";
import type { ActionDictaminadoDictamenWithDictamenProductos } from "@/routes/_auth/dictamenes/$uuid/-types";
import type { NumeroInventarioField } from "@/views/common/articulos/form-fields";
import type { ResultadoEsperadoFieldGroup } from "@/views/common/articulos/recepciones/form-schema";
import type { ProductoGroupField } from "@/views/common/productos/modelos/form-fields";
import type { CuentaContable } from "./form-fields";
import z from "zod";

export type ProductoField = ResultadoEsperadoFieldGroup & {
    dictamen_producto_id: number | undefined;
    cuenta_contable: CuentaContable;
    factura_uuid: string | undefined;
    producto_tipo_id: ProductoGroupField['tipo_id'];
    producto_id: ProductoGroupField['modelo_id'];
    numero_inventario: NumeroInventarioField | null;
}

export const defaultValuesProductoField: ProductoField = {
    factura_uuid: undefined,
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
    productos: requiredArray(z
        .object({
            dictamen_producto_id: selectedNumberOption,
            producto_tipo_id: selectedNumberOption,
            producto_id: selectedNumberOption,
            factura_uuid: requiredString,
            cuenta_contable: requiredString,
            observaciones: nullableString,
            resultado_esperado: selectedBooleanOption,
            numero_inventario: nullableString
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
