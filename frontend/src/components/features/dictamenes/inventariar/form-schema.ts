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
    cuenta_contable: ArticuloCuentaContableType;
    factura_id: FacturaFieldType;
    costo_unitario: ArticuloCostoUnitarioFieldType;
    numero_serie: ArticuloNumeroSerieFieldType;
    producto_variante: DictaminarDictamenProductoVarianteFields | undefined;
    caracteristicas_adicionales: DictamenCaracteristicasAdicionalesFieldType;
}

type AdquisicionFields = {
    id: DictamenAdquisicionFieldType;
    es_resultado_esperado: EsResultadoEsperadoFieldType;
    observaciones: ObservacionesFieldType;
    articulo: ArticuloFields;
}

type Schema = {
    orden_compra_id: OrdenCompraFieldType;
    adquisiciones: AdquisicionFields[];
}

const articuloFieldsDefaultValues: ArticuloFields = {
    factura_id: undefined,
    cuenta_contable: undefined,
    numero_serie: null,
    costo_unitario: null,
    producto_variante: undefined,
    caracteristicas_adicionales: null,
}

const adquisicionFieldsDefaultValues: AdquisicionFields = {
    id: undefined,
    es_resultado_esperado: undefined,
    observaciones: null,
    articulo: articuloFieldsDefaultValues
}

const defaultValues: Schema = {
    orden_compra_id: undefined,
    adquisiciones: [adquisicionFieldsDefaultValues]
};

const articuloValidator = z.object({
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
    producto_variante: dictaminarDictamenProductoVarianteFieldsValidator,
    caracteristicas_adicionales: nullableString,
})

const adquisicionValidator = z.object({
    id: selectedNumberOption,
    observaciones: nullableString,
    es_resultado_esperado: selectedBooleanOption,
    articulo: articuloValidator
});

const validator = z.object({
    orden_compra_id: selectedNumberOption,
    adquisiciones: requiredArray(adquisicionValidator
        // .refine(
        //     ({ cuenta_contable, costo_unitario }) => !(
        //         esCuentaContableInventariable(cuenta_contable) && (costo_unitario === null || isNaN(costo_unitario))
        //     ),
        //     {
        //         error: 'Este campo es requerido',
        //         path: ['costo_unitario'],
        //         when: ({ value }) =>
        //             adquisicionValidator.pick({ cuenta_contable: true, costo_unitario: true })
        //                 .safeParse(value)
        //                 .success
        //     }
        // )
    )
});

export {
    type Schema as InventariarDictamenSchema,
    validator as inventariarDictamenFormValidator,
    defaultValues as inventariarDictamenFormDefaultValues,
    adquisicionFieldsDefaultValues as inventariarDictamenArticuloFieldsDefaultValues
}
