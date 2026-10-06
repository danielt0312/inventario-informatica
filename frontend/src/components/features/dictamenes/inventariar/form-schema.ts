import type { ArticuloCostoUnitarioFieldType, ArticuloCuentaContableType, ArticuloNumeroSerieFieldType, EsResultadoEsperadoFieldType, ObservacionesFieldType } from "@/components/features/articulos/form-fields";
import type { FacturaFieldType } from "@/components/features/facturas/form-fields";
import type { OrdenCompraFieldType } from "@/components/features/orden_compras/form-fields";
import type { DictamenAdquisicionFieldType } from "./fields";
import type { DictamenCaracteristicasAdicionalesFieldType } from "../fields";
import { dictaminarDictamenProductoVarianteFieldsValidator, type DictaminarDictamenProductoVarianteFields } from "../dictaminar/form-schema";
import { nullableNumber, nullableString, requiredArray, requiredString, selectedBooleanOption, selectedNumberOption } from "@/lib/schemas/common";
import { esCuentaContable, esCuentaContableInventariable } from "@/lib/utils";
import z from "zod";

type ArticuloFields = {
    dictamen_adquisicion_id: DictamenAdquisicionFieldType;
    cuenta_contable: ArticuloCuentaContableType;
    factura_id: FacturaFieldType;
    costo_unitario: ArticuloCostoUnitarioFieldType;
    numero_serie: ArticuloNumeroSerieFieldType;
    es_resultado_esperado: EsResultadoEsperadoFieldType;
    observaciones: ObservacionesFieldType;
    producto_variante: DictaminarDictamenProductoVarianteFields | undefined;
    caracteristicas_adicionales: DictamenCaracteristicasAdicionalesFieldType;
}

type Schema = {
    orden_compra_id: OrdenCompraFieldType;
    articulos: ArticuloFields[];
}

const articuloFieldsDefaultValues: ArticuloFields = {
    es_resultado_esperado: undefined,
    factura_id: undefined,
    cuenta_contable: undefined,
    numero_serie: null,
    costo_unitario: null,
    dictamen_adquisicion_id: undefined,
    observaciones: null,
    producto_variante: undefined,
    caracteristicas_adicionales: null,
}

const defaultValues: Schema = {
    orden_compra_id: undefined,
    articulos: [articuloFieldsDefaultValues]
};

const articuloValidator = z.object({
    dictamen_adquisicion_id: selectedNumberOption,
    factura_id: selectedNumberOption,
    cuenta_contable: requiredString
        .refine(
            v => esCuentaContable(v),
            {
                error: "Debes de ingresar una cuenta contable válida",
                when: ({ value }) => requiredString
                    .safeParse(value)
                    .success
            }
        ),
    numero_serie: nullableString,
    costo_unitario: nullableNumber,
    observaciones: nullableString,
    producto_variante: dictaminarDictamenProductoVarianteFieldsValidator,
    es_resultado_esperado: selectedBooleanOption,
    caracteristicas_adicionales: nullableString
});

const validator = z.object({
    orden_compra_id: selectedNumberOption,
    articulos: requiredArray(articuloValidator
        .refine(
            ({ es_resultado_esperado, producto_variante }) => !(
                es_resultado_esperado && producto_variante === undefined
            ),
            {
                when: (values) => articuloValidator.pick({ es_resultado_esperado: true, producto_variante: true })
                    .safeParse(values)
                    .success
            }
        )
        .refine(
            ({ cuenta_contable, costo_unitario }) => !(
                esCuentaContableInventariable(cuenta_contable) && (costo_unitario === null || isNaN(costo_unitario))
            ),
            {
                error: 'Este campo es requerido',
                path: ['costo_unitario'],
                when: ({ value }) =>
                    articuloValidator.pick({ cuenta_contable: true, costo_unitario: true })
                        .safeParse(value)
                        .success
            }
        )
    )
});

export {
    type Schema as InventariarDictamenSchema,
    validator as inventariarDictamenFormValidator,
    defaultValues as inventariarDictamenFormDefaultValues,
    articuloFieldsDefaultValues as inventariarDictamenArticuloFieldsDefaultValues
}
