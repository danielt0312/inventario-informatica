import { nullableNumber, nullableString, requiredArray, requiredString, selectedBooleanOption, selectedNumberOption } from "@/lib/schemas/common";
import type { ArticuloCostoUnitarioFieldType, ArticuloCuentaContableType, ArticuloNumeroSerieFieldType, EsResultadoEsperadoFieldType, ObservacionesFieldType } from "@/components/features/articulos/form-fields";
import type { FacturaFieldType } from "@/components/features/facturas/form-fields";
import type { ProductoFieldType } from "@/components/features/productos/form-fields";
import type { OrdenCompraFieldType } from "@/components/features/orden_compras/form-fields";
import { esCuentaContable } from "@/lib/utils";
import z from "zod";

type AdquisicionFields = {
    es_resultado_esperado: EsResultadoEsperadoFieldType;
    observaciones: ObservacionesFieldType;
    id: number | undefined;
    cuenta_contable: ArticuloCuentaContableType;
    factura_id: FacturaFieldType;
    producto_id: ProductoFieldType;
    costo_unitario: ArticuloCostoUnitarioFieldType;
    numero_serie: ArticuloNumeroSerieFieldType;
}

type Schema = {
    orden_compra_id: OrdenCompraFieldType;
    adquisiciones: AdquisicionFields[];
}

export const adquisicionFieldsDefaultValues: AdquisicionFields = {
    es_resultado_esperado: undefined,
    observaciones: null,
    factura_id: undefined,
    cuenta_contable: undefined,
    numero_serie: undefined,
    costo_unitario: null,
    id: undefined,
    producto_id: undefined,
}

export const defaultValues: Schema = {
    orden_compra_id: undefined,
    adquisiciones: [adquisicionFieldsDefaultValues]
};

const adquisicionValidator = z
    .object({
        id: selectedNumberOption,
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
        numero_serie: requiredString,
        costo_unitario: nullableNumber,
        es_resultado_esperado: selectedBooleanOption,
        observaciones: nullableString,
    });

export const validator = z.object({
    orden_compra_id: selectedNumberOption,
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
            ({ cuenta_contable, costo_unitario }) => !(
                esCuentaContable(cuenta_contable) && (costo_unitario === null || isNaN(costo_unitario))
            ),
            {
                error: 'Este campo es requerido',
                path: ['costo_unitario'],
                when: ({ value }) =>
                    adquisicionValidator.pick({ cuenta_contable: true, costo_unitario: true })
                        .safeParse(value)
                        .success
            }
        )
    )
});


export {
    type Schema as InventariarDictamenSchema
}
