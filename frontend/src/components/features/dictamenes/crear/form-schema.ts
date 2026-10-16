import {
    requiredIsoDateLTEToday,
    requiredArray,
    selectedNumberOption,
    positiveInteger,
    requiredString,
    nullableString,
    trimmedString,
    validNumber,
} from "@/lib/schemas/common";
import type { ArticuloNullableNumeroInventarioFieldType } from "@/components/features/articulos/form-fields";
import type { EmpleadoFieldType } from "@/components/features/empleados/field";
import type { AreaFieldType } from "@/components/features/areas/field";
import type { DictamenCantidadFieldType, DictamenCaracteristicasAdicionalesFieldType, DictamenFechaSolicitudFieldType, DictamenFolioFieldType, DictamenOficioArchivoFieldType } from "../fields";
import type { ProductoMarcaFieldType } from "../../productos/marca-field";
import type { ProductoModeloFieldType } from "../../productos/variante-spec-field-group";
import { ProductoTipoEnum, ProductoTipoGenericos, ProductoTipoSpec } from "@/lib/constants";
import z from "zod";

type SchemaBase = {
    marca_id?: ProductoMarcaFieldType<undefined, false>;
    modelo?: ProductoModeloFieldType;
}

type BorradorFields = SchemaBase & (
    | { tipo_id: typeof ProductoTipoSpec.Computadora; spec?: z.input<typeof specComputadoraValidator> }
    | { tipo_id: typeof ProductoTipoSpec.Disco; spec?: z.input<typeof specDiscoValidator> }
    | { tipo_id: typeof ProductoTipoSpec.Ram; spec?: z.input<typeof specRamValidator> }
    | { tipo_id: typeof ProductoTipoSpec.Camara; spec?: z.input<typeof specCamaraValidator> }
    | { tipo_id: typeof ProductoTipoSpec.Licencia; spec?: z.input<typeof specLicenciaValidator> }
    | { tipo_id: typeof ProductoTipoSpec.Procesador; spec?: z.input<typeof specProcesadorValidator> }
    | {
        tipo_id: Exclude<
            ProductoTipoEnum,
            | typeof ProductoTipoSpec.Computadora
            | typeof ProductoTipoSpec.Disco
            | typeof ProductoTipoSpec.Ram
            | typeof ProductoTipoSpec.Camara
            | typeof ProductoTipoSpec.Licencia
            | typeof ProductoTipoSpec.Procesador
        > | undefined
        spec?: undefined;
    }
)

const borradorDefaultFieldsValues: BorradorFields = {
    tipo_id: undefined
}

const specProcesadorValidator = z.object({
    nucleos: positiveInteger,
    hilos: positiveInteger,
    frecuencia_maxima_ghz: validNumber
}).partial();

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
    z.object({ ...validatorBase, tipo_id: z.literal(ProductoTipoSpec.Computadora), spec: specComputadoraValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(ProductoTipoSpec.Disco), spec: specDiscoValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(ProductoTipoSpec.Ram), spec: specRamValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(ProductoTipoSpec.Camara), spec: specCamaraValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(ProductoTipoSpec.Licencia), spec: specLicenciaValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(ProductoTipoSpec.Procesador), spec: specProcesadorValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(Object.values(ProductoTipoGenericos)) }),
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
    area_id: AreaFieldType;
    archivo_uuid: DictamenOficioArchivoFieldType;
    adquisiciones: AdquisicionFields[];
}

const defaultValues: Schema = {
    folio: undefined,
    fecha_solicitud: undefined,
    area_id: undefined,
    archivo_uuid: undefined,
    adquisiciones: [adquisicionFieldsDefaultValues]
} as const;

const adquisicionFieldsValidator = z
    .object({
        cantidad: positiveInteger,
        empleado_id: selectedNumberOption,
        numero_inventario: nullableString,
        caracteristicas_adicionales: nullableString,
        borrador_producto_variante: borradorFieldsValidator,
    });

const validator = z.object({
    folio: requiredString,
    fecha_solicitud: requiredIsoDateLTEToday,
    area_id: selectedNumberOption,
    archivo_uuid: requiredString,
    adquisiciones: requiredArray(adquisicionFieldsValidator)
});

export {
    adquisicionFieldsDefaultValues as crearDictamenAdquisicionFieldsDefaultFormValues,
    defaultValues as crearDictamenFormDefaultValues,
    validator as crearDictamenFormValidator,
    type BorradorFields as DictamenBorradorProductoVarianteFields
}
