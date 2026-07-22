import { nullableNumber, nullableString, requiredArray, requiredString, selectedBooleanOption, selectedNumberOption } from "@/lib/schemas/common";
import { DictamenProducto } from "@/lib/utils";
import type { DetailedActionDictaminado as DetailedActionDictaminadoDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";
import type { CostoUnitarioField, EsContableField, NullableNumeroInventarioField, NumeroSerieField } from "@/views/common/articulos/form-fields";
import { recepcionFieldGroupDefaultValues, RecepcionFieldGroup } from "@/views/common/articulos/recepciones/form-fields";
import type { ProductoGroupField } from "@/views/common/productos/form-fields";
import type { CuentaContable } from "./form-fields";
import z from "zod";
import type { OrdenCompraField } from "@/views/common/orden_compras/form-fields";

type AdquisicionFields = RecepcionFieldGroup & {
    dictamen_producto_id: number;
    cuenta_contable: CuentaContable;
    factura_uuid: string | undefined;
    numero_inventario: NullableNumeroInventarioField;
    producto_tipo_id: NonNullable<ProductoGroupField['tipo_id']>;
    producto_id: NonNullable<ProductoGroupField['id']>;
    costo_unitario: CostoUnitarioField;
    es_contable: EsContableField;
    numero_serie: NumeroSerieField;
}

type Schema = {
    orden_compra: OrdenCompraField;
    adquisiciones: AdquisicionFields[];
}

export const defaultValues = (dictamen: DetailedActionDictaminadoDictamen): Schema => ({
    orden_compra: undefined,
    adquisiciones: dictamen.version_actual.adquisiciones.map((adquisicion): AdquisicionFields => ({
        ...recepcionFieldGroupDefaultValues,
        es_contable: undefined,
        factura_uuid: undefined,
        cuenta_contable: undefined,
        numero_serie: null,
        costo_unitario: null,
        numero_inventario: null,
        dictamen_producto_id: adquisicion.id,
        producto_tipo_id: adquisicion.producto.tipo.id,
        producto_id: adquisicion.producto.id,
    }))
});

export const validator = z.object({
    orden_compra: requiredString,
    adquisiciones: requiredArray(z
        .object({
            dictamen_producto_id: selectedNumberOption,
            producto_tipo_id: selectedNumberOption,
            producto_id: selectedNumberOption,
            factura_uuid: requiredString,
            cuenta_contable: requiredString,
            numero_serie: nullableString,
            es_contable: selectedBooleanOption,
            costo_unitario: nullableNumber,
            numero_inventario: nullableString,
            es_resultado_esperado: selectedBooleanOption,
            observaciones: nullableString,
        })
        .superRefine(({
            es_resultado_esperado,
            observaciones,
            producto_tipo_id,
            numero_inventario,
            costo_unitario,
            es_contable,
        }, ctx) => {
            if (es_resultado_esperado === false && (observaciones === null || observaciones.length === 0)) {
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

            if (es_contable === true && (costo_unitario === null || isNaN(costo_unitario))) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Este campo es requerido',
                    path: ['costo_unitario']
                });
            }
        })
    )
});
