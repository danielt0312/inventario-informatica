import {
    requiredIsoDateLTEToday,
    requiredArray,
    selectedNumberOption,
    positiveInteger,
    requiredString,
    nullableString,
    trimmedString
} from "@/lib/schemas/common";
import type { ArticuloNullableNumeroInventarioFieldType } from "@/components/features/articulos/form-fields";
import type { EmpleadoFieldType } from "@/components/features/empleados/field";
import type { AdscripcionFieldType } from "@/components/features/adscripciones/field";
import type { DictamenCantidadFieldType, DictamenFechaSolicitudFieldType, DictamenFolioFieldType, DictamenOficioArchivoFieldType } from "../fields";
import type { ProductoTipoFieldType } from "../../productos/tipo-field";
import type { ProductoMarcaFieldType } from "../../productos/marca-field";
import z from "zod";

type BorradorFields = {
    producto: {
        tipo_id: ProductoTipoFieldType;
        marca_id: ProductoMarcaFieldType<null>;
        modelo: string | null;
    };
    spec: Record<string, unknown> | null;
    caracteristicas_adicionales: string | null;
}

const borradorFieldsDefaultValues: BorradorFields = {
    producto: {
        tipo_id: undefined,
        marca_id: null,
        modelo: null,
    },
    spec: null,
    caracteristicas_adicionales: null
}

type AdquisicionFields = {
    numero_inventario: ArticuloNullableNumeroInventarioFieldType;
    cantidad: DictamenCantidadFieldType;
    empleado_id: EmpleadoFieldType;
    borrador: BorradorFields;
}

const adquisicionFieldsDefaultValues: AdquisicionFields = {
    numero_inventario: null,
    cantidad: 1,
    empleado_id: undefined,
    borrador: borradorFieldsDefaultValues
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

const borradorFieldsValidator = z.object({
    producto: z.object({
        tipo_id: selectedNumberOption,
        marca_id: selectedNumberOption.nullable(),
        modelo: trimmedString().nullable()
    }),
    spec: z.object().nullable(),
    caracteristicas_adicionales: trimmedString().nullable()
})

const adquisicionFieldsValidator = z
    .object({
        cantidad: positiveInteger,
        empleado_id: selectedNumberOption,
        numero_inventario: nullableString,
        borrador: borradorFieldsValidator
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
