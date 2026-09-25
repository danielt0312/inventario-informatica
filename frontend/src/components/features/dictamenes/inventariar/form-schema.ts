import { nullableNumber, nullableString, requiredArray, requiredString, selectedBooleanOption, selectedNumberOption, trimmedString } from "@/lib/schemas/common";
import { esCuentaContable, esCuentaContableInventariable } from "@/lib/utils";
import type { ArticuloCostoUnitarioFieldType, ArticuloCuentaContableType, ArticuloNumeroSerieFieldType, EsResultadoEsperadoFieldType, ObservacionesFieldType } from "@/components/features/articulos/form-fields";
import type { FacturaFieldType } from "@/components/features/facturas/form-fields";
import type { ProductoFieldType } from "@/components/features/productos/generica-field";
import type { OrdenCompraFieldType } from "@/components/features/orden_compras/form-fields";
import type { DictamenAdquisicionFieldType } from "./fields";
import z from "zod";

type ArticuloFields = {
    es_resultado_esperado: EsResultadoEsperadoFieldType;
    observaciones: ObservacionesFieldType;
    dictamen_adquisicion_id: DictamenAdquisicionFieldType;
    cuenta_contable: ArticuloCuentaContableType;
    factura_id: FacturaFieldType;
    producto_id: ProductoFieldType;
    costo_unitario: ArticuloCostoUnitarioFieldType;
    numero_serie: ArticuloNumeroSerieFieldType;
}

type Schema = {
    orden_compra_id: OrdenCompraFieldType;
    articulos: ArticuloFields[];
}

const articuloFieldsDefaultValues: ArticuloFields = {
    es_resultado_esperado: undefined,
    observaciones: null,
    factura_id: undefined,
    cuenta_contable: undefined,
    numero_serie: null,
    costo_unitario: null,
    dictamen_adquisicion_id: undefined,
    producto_id: undefined,
}

const defaultValues: Schema = {
    orden_compra_id: undefined,
    articulos: [articuloFieldsDefaultValues]
};

const articuloValidator = z
    .object({
        dictamen_adquisicion_id: selectedNumberOption,
        producto_id: selectedNumberOption,
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
        numero_serie: trimmedString().nullable(),
        costo_unitario: nullableNumber,
        es_resultado_esperado: selectedBooleanOption,
        observaciones: nullableString,
    });

const validator = z.object({
    orden_compra_id: selectedNumberOption,
    articulos: requiredArray(articuloValidator
        .refine(
            ({ es_resultado_esperado, observaciones }) => !(
                es_resultado_esperado === false && (observaciones === null || observaciones.length === 0)
            ),
            {
                error: 'Este campo es requerido',
                path: ['observaciones'],
                when: ({ value }) =>
                    articuloValidator.pick({ es_resultado_esperado: true, observaciones: true })
                        .safeParse(value)
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
