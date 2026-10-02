import {
    requiredIsoDateLTEToday,
    requiredArray,
    selectedNumberOption,
    positiveInteger,
    requiredString,
    nullableString,
    trimmedString,
} from "@/lib/schemas/common";
import type { ArticuloNullableNumeroInventarioFieldType } from "@/components/features/articulos/form-fields";
import type { EmpleadoFieldType } from "@/components/features/empleados/field";
import type { AdscripcionFieldType } from "@/components/features/adscripciones/field";
import type { DictamenCantidadFieldType, DictamenCaracteristicasAdicionalesFieldType, DictamenFechaSolicitudFieldType, DictamenFolioFieldType, DictamenOficioArchivoFieldType } from "../fields";
import { dictamenBorradorDefaultFieldValues, dictamenBorradorFieldValidator, type DictamenBorradorProductoVariante } from "../borrador-producto-variante-field";
import z from "zod";

type AdquisicionFields = {
    numero_inventario: ArticuloNullableNumeroInventarioFieldType;
    cantidad: DictamenCantidadFieldType;
    empleado_id: EmpleadoFieldType;
    caracteristicas_adicionales: DictamenCaracteristicasAdicionalesFieldType;
    borrador_producto_variante: DictamenBorradorProductoVariante;
}

const adquisicionFieldsDefaultValues: AdquisicionFields = {
    numero_inventario: null,
    cantidad: 1,
    empleado_id: undefined,
    caracteristicas_adicionales: null,
    borrador_producto_variante: dictamenBorradorDefaultFieldValues,
} as const;

type Schema = {
    folio: DictamenFolioFieldType;
    fecha_solicitud: DictamenFechaSolicitudFieldType;
    adscripcion_id: AdscripcionFieldType;
    archivo_uuid: DictamenOficioArchivoFieldType;
    adquisiciones: AdquisicionFields[];
}

const defaultValues: Schema = {
    folio: undefined,
    fecha_solicitud: undefined,
    adscripcion_id: undefined,
    archivo_uuid: undefined,
    adquisiciones: [adquisicionFieldsDefaultValues]
} as const;

const adquisicionFieldsValidator = z
    .object({
        cantidad: positiveInteger,
        empleado_id: selectedNumberOption,
        numero_inventario: nullableString,
        caracteristicas_adicionales: trimmedString().nullable(),
        borrador_producto_variante: dictamenBorradorFieldValidator,
    });

const validator = z.object({
    folio: requiredString,
    fecha_solicitud: requiredIsoDateLTEToday,
    adscripcion_id: selectedNumberOption,
    archivo_uuid: requiredString,
    adquisiciones: requiredArray(adquisicionFieldsValidator)
});

export {
    adquisicionFieldsDefaultValues as crearDictamenAdquisicionFieldsDefaultFormValues,
    defaultValues as crearDictamenFormDefaultValues,
    validator as crearDictamenFormValidator
}
