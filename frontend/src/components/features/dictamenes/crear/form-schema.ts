import {
    requiredIsoDateLTEToday,
    requiredArray,
    selectedNumberOption,
    positiveInteger,
    requiredString,
    nullableString
} from "@/lib/schemas/common";
import type { ProductoTipoFieldType } from "@/components/features/productos/tipos/form-fields";
import type { ArticuloNullableNumeroInventarioFieldType } from "@/components/features/articulos/form-fields";
import type { EmpleadoFieldType } from "@/components/features/empleados/field";
import type { AdscripcionFieldType } from "@/components/features/adscripciones/field";
import type { DictamenCantidadFieldType, DictamenFechaSolicitudFieldType, DictamenFolioFieldType, DictamenOficioArchivoFieldType } from "../fields";
import z from "zod";

type AdquisicionFields = {
    producto_tipo_id: ProductoTipoFieldType;
    numero_inventario: ArticuloNullableNumeroInventarioFieldType;
    cantidad: DictamenCantidadFieldType;
    empleado_id: EmpleadoFieldType;
}

const adquisicionFieldsDefaultValues: AdquisicionFields = {
    numero_inventario: null,
    producto_tipo_id: undefined,
    cantidad: 1,
    empleado_id: undefined,
} as const;

export type Schema = {
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

const validator = z.object({
    folio: requiredString,
    fecha_solicitud: requiredIsoDateLTEToday,
    adscripcion_id: selectedNumberOption,
    archivo_uuid: requiredString,
    adquisiciones: requiredArray(z
        .object({
            cantidad: positiveInteger,
            empleado_id: selectedNumberOption,
            producto_tipo_id: selectedNumberOption,
            numero_inventario: nullableString
        })
    )
});

export { adquisicionFieldsDefaultValues as createDictamenFormAdquisicionFieldsDefaultValues, defaultValues as createDictamenFormDefaultValues, validator as createDictamenFormValidator }
