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
import z from "zod";
import { ProductoTipoEnum } from "@/lib/constants";
import type { ProductoMarcaFieldType } from "../../productos/marca-field";
import type { ProductoModeloFieldType } from "../../productos/variante-spec-field-group";

const {
    Computadora,
    Disco,
    Ram,
    Camara,
    Licencia,
    ...otrosProductoTipo
} = ProductoTipoEnum;

type SchemaBase = {
    marca_id?: ProductoMarcaFieldType<undefined, false>;
    modelo?: ProductoModeloFieldType;
}

type BorradorFields = SchemaBase & (
    | { tipo_id: typeof Computadora; spec?: z.input<typeof specComputadoraValidator> }
    | { tipo_id: typeof Disco; spec?: z.input<typeof specDiscoValidator> }
    | { tipo_id: typeof Ram; spec?: z.input<typeof specRamValidator> }
    | { tipo_id: typeof Camara; spec?: z.input<typeof specCamaraValidator> }
    | { tipo_id: typeof Licencia; spec?: z.input<typeof specLicenciaValidator> }
    | {
        tipo_id: Exclude<
            ProductoTipoEnum,
            | typeof Computadora
            | typeof Disco
            | typeof Ram
            | typeof Camara
            | typeof Licencia
        > | undefined
        spec?: undefined;
    }
)

const borradorDefaultFieldsValues: BorradorFields = {
    tipo_id: undefined
}

const specLicenciaValidator = z.object({
    tipo_id: selectedNumberOption,
}).partial();

const specComputadoraValidator = z.object({
    tipo_id: selectedNumberOption,
}).partial();

const specCamaraValidator = z.object({
    tipo_id: selectedNumberOption,
}).partial();

const specDiscoValidator = z.object({
    tipo_id: selectedNumberOption,
    capacidad_id: selectedNumberOption,
    factor_forma_id: selectedNumberOption,
    interfaz_id: selectedNumberOption,
}).partial();

const specRamValidator = z.object({
    tipo_id: selectedNumberOption,
    capacidad_id: selectedNumberOption,
    velocidad_id: selectedNumberOption,
}).partial();

const validatorBase = {
    marca_id: selectedNumberOption.optional(),
    modelo: trimmedString().optional()
}

const borradorFieldsValidator = z.discriminatedUnion("tipo_id", [
    z.object({ ...validatorBase, tipo_id: z.literal(Computadora), spec: specComputadoraValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(Disco), spec: specDiscoValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(Ram), spec: specRamValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(Camara), spec: specCamaraValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(Licencia), spec: specLicenciaValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(Object.values(otrosProductoTipo)) }),
], { error: "Debes de seleccionar un tipo de producto válido" });

type AdquisicionFields = {
    numero_inventario: ArticuloNullableNumeroInventarioFieldType;
    cantidad: DictamenCantidadFieldType;
    empleado_id: EmpleadoFieldType;
    caracteristicas_adicionales: DictamenCaracteristicasAdicionalesFieldType;
    borrador_producto_variante: BorradorFields;
}

const adquisicionFieldsDefaultValues: AdquisicionFields = {
    numero_inventario: null,
    cantidad: 1,
    empleado_id: undefined,
    caracteristicas_adicionales: null,
    borrador_producto_variante: borradorDefaultFieldsValues,
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
        borrador_producto_variante: borradorFieldsValidator,
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
    validator as crearDictamenFormValidator,
    type BorradorFields as DictamenBorradorProductoVarianteFields
}
