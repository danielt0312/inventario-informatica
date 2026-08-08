import { nullableNumber, nullableString, requiredArray, requiredString, selectedBooleanOption, selectedNumberOption } from "@/lib/schemas/common";
import { DictamenProducto } from "@/lib/utils";
import type { DetailedActionDictaminadoDictamen } from "@/routes/_auth/dictamenes/$uuid/-types";
import type { CostoUnitarioField, CuentaContable, EsContableField, NullableNumeroInventarioField, NumeroSerieField } from "@/views/common/articulos/form-fields";
import type { ProductoGroupField } from "@/views/common/productos/form-fields";
import type { OrdenCompraField } from "@/views/common/orden_compras/form-fields";
import { recepcionFieldGroupDefaultValues, RecepcionFieldGroup } from "@/views/common/articulos/recepciones/form-fields";
import type { FacturaFieldType } from "@/views/common/facturas/form-fields";
import z from "zod";

type AdquisicionFields = RecepcionFieldGroup & {
    id: number;
    cuenta_contable: CuentaContable;
    factura_uuid: FacturaFieldType;
    numero_inventario: NullableNumeroInventarioField;
    producto_tipo_id: NonNullable<ProductoGroupField['tipo_id']>;
    producto_id: NonNullable<ProductoGroupField['id']>;
    costo_unitario: CostoUnitarioField;
    es_contable: EsContableField;
    numero_serie: NumeroSerieField;
}

type Schema = {
    archivo_uuid: OrdenCompraField;
    adquisiciones: AdquisicionFields[];
}

export const defaultValues = (dictamen: DetailedActionDictaminadoDictamen): Schema => ({
    archivo_uuid: undefined,
    adquisiciones: dictamen.version_actual.adquisiciones.flatMap((adquisicion) =>
        Array.from({ length: adquisicion.cantidad }, (): AdquisicionFields => ({
            ...recepcionFieldGroupDefaultValues,
            es_contable: undefined,
            factura_uuid: undefined,
            cuenta_contable: undefined,
            numero_serie: null,
            costo_unitario: null,
            numero_inventario: null,
            id: adquisicion.id,
            producto_tipo_id: adquisicion.producto.tipo.id,
            producto_id: adquisicion.producto.id,
        }))
    )
});

const adquisicionValidator = z
    .object({
        id: selectedNumberOption,
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
    });

export const validator = z.object({
    archivo_uuid: requiredString,
    adquisiciones: requiredArray(adquisicionValidator
        .refine(
            ({ es_resultado_esperado, observaciones }) => !(
                es_resultado_esperado === false && (observaciones === null || observaciones.length === 0)
            ),
            {
                error: 'Este campo es requerido',
                path: ['observaciones'],
                when: ({ value }) =>
                    adquisicionValidator.pick({ es_resultado_esperado: true, observaciones: true })
                        .safeParse(value)
                        .success
            }
        )
        .refine(
            ({ producto_tipo_id, numero_inventario }) => !(
                DictamenProducto.tipoRequiereNumeroInventario(producto_tipo_id) && (numero_inventario === null || numero_inventario.length === 0)
            ),
            {
                error: 'Este campo es requerido',
                path: ['numero_inventario'],
                when: ({ value }) =>
                    adquisicionValidator.pick({ producto_id: true, numero_inventario: true })
                        .safeParse(value)
                        .success
            }
        )
        .refine(
            ({ es_contable, costo_unitario }) => !(
                es_contable === true && (costo_unitario === null || isNaN(costo_unitario))
            ),
            {
                error: 'Este campo es requerido',
                path: ['costo_unitario'],
                when: ({ value }) =>
                    adquisicionValidator.pick({ es_contable: true, costo_unitario: true })
                        .safeParse(value)
                        .success
            }
        )
    )
});
