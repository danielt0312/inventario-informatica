import type { DetailedPorDictaminarDictamen } from "@/types/dictamenes";
import type { DictamenCaracteristicasAdicionalesFieldType } from "../fields";
import type { ProductoMarcaFieldType } from "../../productos/marca-field";
import type { ProductoModeloFieldType } from "../../productos/variante-spec-field-group";
import { nullableString, positiveInteger, requiredArray, requiredString, selectedNumberOption, validNumber } from "@/lib/schemas/common";
import { ProductoTipoEnum, ProductoTipoGenericos, ProductoTipoSpec } from "@/lib/constants";
import z from "zod";

type BaseProductoVarianteFields = {
    marca_id: ProductoMarcaFieldType<undefined, false>;
    modelo: ProductoModeloFieldType;
}

type ProductoVarianteFields = BaseProductoVarianteFields & (
    | { tipo_id: typeof ProductoTipoSpec.Computadora; spec: z.input<typeof specComputadoraValidator> }
    | { tipo_id: typeof ProductoTipoSpec.Disco; spec: z.input<typeof specDiscoValidator> }
    | { tipo_id: typeof ProductoTipoSpec.Ram; spec: z.input<typeof specRamValidator> }
    | { tipo_id: typeof ProductoTipoSpec.Camara; spec: z.input<typeof specCamaraValidator> }
    | { tipo_id: typeof ProductoTipoSpec.Licencia; spec: z.input<typeof specLicenciaValidator> }
    | { tipo_id: typeof ProductoTipoSpec.Procesador; spec: z.input<typeof specProcesadorValidator> }
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
    }
)

const specProcesadorValidator = z.object({
    nucleos: positiveInteger.nullable().optional(),
    hilos: positiveInteger.nullable().optional(),
    frecuencia_maxima_ghz: validNumber.nullable().optional()
});

const specLicenciaValidator = z.object({
    tipo_id: selectedNumberOption,
});

const specComputadoraValidator = z.object({
    tipo_id: selectedNumberOption,
});

const specCamaraValidator = z.object({
    tipo_id: selectedNumberOption,
});

const specDiscoValidator = z.object({
    tipo_id: selectedNumberOption,
    capacidad_id: selectedNumberOption,
    factor_forma_id: selectedNumberOption.optional(),
    interfaz_id: selectedNumberOption.optional(),
});

const specRamValidator = z.object({
    tipo_id: selectedNumberOption,
    capacidad_id: selectedNumberOption,
    velocidad_id: selectedNumberOption.optional(),
});

const validatorBase = {
    marca_id: selectedNumberOption,
    modelo: requiredString
}

const productoVarianteFieldsValidator = z.discriminatedUnion("tipo_id", [
    z.object({ ...validatorBase, tipo_id: z.literal(ProductoTipoSpec.Computadora), spec: specComputadoraValidator }),
    z.object({ ...validatorBase, tipo_id: z.literal(ProductoTipoSpec.Disco), spec: specDiscoValidator }),
    z.object({ ...validatorBase, tipo_id: z.literal(ProductoTipoSpec.Ram), spec: specRamValidator }),
    z.object({ ...validatorBase, tipo_id: z.literal(ProductoTipoSpec.Camara), spec: specCamaraValidator }),
    z.object({ ...validatorBase, tipo_id: z.literal(ProductoTipoSpec.Licencia), spec: specLicenciaValidator }),
    z.object({ ...validatorBase, tipo_id: z.literal(ProductoTipoSpec.Procesador), spec: specProcesadorValidator }),
    z.object({ ...validatorBase, tipo_id: z.literal(Object.values(ProductoTipoGenericos)) }),
], { error: "Debes de seleccionar un tipo de producto válido" });

type AdquisicionFields = {
    id: number;
    caracteristicas_adicionales: DictamenCaracteristicasAdicionalesFieldType;
    producto_variante: ProductoVarianteFields;
}

type Schema = {
    adquisiciones: AdquisicionFields[];
}

const defaultValues = (dictamen: DetailedPorDictaminarDictamen): Schema => ({
    adquisiciones: dictamen.version_actual.adquisiciones.map(({
        id,
        caracteristicas_adicionales,
        borrador_producto_variante: borrador
    }) => ({
        id,
        caracteristicas_adicionales,
        producto_variante: {
            tipo_id: borrador.tipo_id,
            marca_id: borrador.marca_id,
            modelo: borrador.modelo,
            spec: borrador.spec ?? {}
        } as ProductoVarianteFields
    }))
});

const adquisicionValidator = z.object({
    id: selectedNumberOption,
    caracteristicas_adicionales: nullableString,
    producto_variante: productoVarianteFieldsValidator
});

const validator = z.object({
    adquisiciones: requiredArray(
        adquisicionValidator
    )
});

export {
    defaultValues as dictaminarDictamenDefaultFormValues,
    validator as dictaminarDictamenFormValidator,
    type ProductoVarianteFields as DictaminarDictamenProductoVarianteFields,
    productoVarianteFieldsValidator as dictaminarDictamenProductoVarianteFieldsValidator,
    specComputadoraValidator as dictaminarDictamenSpecComputadoraValidator,
    specDiscoValidator as dictaminarDictamenSpecDiscoValidator,
    specRamValidator as dictaminarDictamenSpecRamValidator,
    specCamaraValidator as dictaminarDictamenSpecCamaraValidator,
    specLicenciaValidator as dictaminarDictamenSpecLicenciaValidator,
    specProcesadorValidator as dictaminarDictamenSpecProcesadorValidator,
}
