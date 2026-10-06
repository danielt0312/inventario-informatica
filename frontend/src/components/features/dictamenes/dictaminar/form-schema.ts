import type { DetailedDictaminarDictamen } from "@/types/dictamenes";
import type { DictamenCaracteristicasAdicionalesFieldType } from "../fields";
import type { ProductoMarcaFieldType } from "../../productos/marca-field";
import type { ProductoModeloFieldType } from "../../productos/variante-spec-field-group";
import { nullableString, requiredArray, requiredString, selectedNumberOption } from "@/lib/schemas/common";
import { ProductoTipoEnum, ProductoTipoGenericos, ProductoTipoSpec } from "@/lib/constants";
import z from "zod";

const {
    Computadora,
    Disco,
    Ram,
    Camara,
    Licencia,
} = ProductoTipoSpec;

type BaseProductoVarianteFields = {
    marca_id: ProductoMarcaFieldType<undefined, false>;
    modelo: ProductoModeloFieldType;
}

type ProductoVarianteFields = BaseProductoVarianteFields & (
    | { tipo_id: typeof Computadora; spec: z.input<typeof specComputadoraValidator> }
    | { tipo_id: typeof Disco; spec: z.input<typeof specDiscoValidator> }
    | { tipo_id: typeof Ram; spec: z.input<typeof specRamValidator> }
    | { tipo_id: typeof Camara; spec: z.input<typeof specCamaraValidator> }
    | { tipo_id: typeof Licencia; spec: z.input<typeof specLicenciaValidator> }
    | {
        tipo_id: Exclude<
            ProductoTipoEnum,
            | typeof Computadora
            | typeof Disco
            | typeof Ram
            | typeof Camara
            | typeof Licencia
        > | undefined
    }
)

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
    z.object({ ...validatorBase, tipo_id: z.literal(Computadora), spec: specComputadoraValidator }),
    z.object({ ...validatorBase, tipo_id: z.literal(Disco), spec: specDiscoValidator }),
    z.object({ ...validatorBase, tipo_id: z.literal(Ram), spec: specRamValidator }),
    z.object({ ...validatorBase, tipo_id: z.literal(Camara), spec: specCamaraValidator }),
    z.object({ ...validatorBase, tipo_id: z.literal(Licencia), spec: specLicenciaValidator }),
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

const defaultValues = (dictamen: DetailedDictaminarDictamen): Schema => ({
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
    type ProductoVarianteFields as DictaminarDictamenBorradorFields,
    productoVarianteFieldsValidator as dictaminarDictamenProductoVarianteFieldsValidator,
    specComputadoraValidator as dictaminarDictamenSpecComputadoraValidator,
    specDiscoValidator as dictaminarDictamenSpecDiscoValidator,
    specRamValidator as dictaminarDictamenSpecRamValidator,
    specCamaraValidator as dictaminarDictamenSpecCamaraValidator,
    specLicenciaValidator as dictaminarDictamenSpecLicenciaValidator,
}
