import { nullableNumber, nullableString, requiredArray, requiredString, selectedBooleanOption, selectedNumberOption } from "@/lib/schemas/common";
import { recepcionFieldGroupDefaultValues, RecepcionFieldGroup } from "@/components/features/articulos/recepciones/form-fields";
import type { CostoUnitarioFieldType, CuentaContableType, EsContableFieldType, NumeroSerieFieldType } from "@/components/features/articulos/form-fields";
import type { FacturaFieldType } from "@/components/features/facturas/form-fields";
import type { ProductoFieldType } from "@/components/features/productos/form-fields";
import type { OrdenCompraFieldType } from "@/components/features/orden_compras/form-fields";
import z from "zod";

type AdquisicionFields = RecepcionFieldGroup & {
    id: number | undefined;
    cuenta_contable: CuentaContableType;
    factura_id: FacturaFieldType;
    producto_id: ProductoFieldType;
    costo_unitario: CostoUnitarioFieldType;
    es_contable: EsContableFieldType;
    numero_serie: NumeroSerieFieldType;
}

type Schema = {
    orden_compra_id: OrdenCompraFieldType;
    adquisiciones: AdquisicionFields[];
}

export const adquisicionFieldsDefaultValues: AdquisicionFields = {
    ...recepcionFieldGroupDefaultValues,
    es_contable: undefined,
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
        cuenta_contable: requiredString,
        numero_serie: requiredString,
        es_contable: selectedBooleanOption,
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


export {
    type Schema as InventariarDictamenSchema
}
