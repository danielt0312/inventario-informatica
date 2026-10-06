import type { DetailedSurtirDictamen } from "@/types/dictamenes";
import type { DictamenCantidadFieldType, DictamenCaracteristicasAdicionalesFieldType, DictamenMotivoCambioFieldType } from "../fields";
import type { EmpleadoFieldType } from "../../empleados/field";
import type { ArticuloNullableNumeroInventarioFieldType } from "../../articulos/form-fields";
import type { Disco } from "@/types/articulos/discos";
import { nullableString, positiveInteger, requiredArray, requiredString, selectedNumberOption } from "@/lib/schemas/common";
import { dictaminarDictamenProductoVarianteFieldsValidator, dictaminarDictamenSpecCamaraValidator, dictaminarDictamenSpecComputadoraValidator, dictaminarDictamenSpecDiscoValidator, dictaminarDictamenSpecLicenciaValidator, dictaminarDictamenSpecRamValidator, type DictaminarDictamenProductoVarianteFields } from "../dictaminar/form-schema";
import z from "zod";
import type { ProductoVariante } from "@/types/productos";
import { esProductoTipo } from "../../productos/utils";
import { ProductoTipoEnum } from "@/lib/constants";
import type { Ram } from "@/types/articulos/rams";
import type { Computadora } from "@/types/computadoras";
import type { Camara } from "@/types/camaras";
import type { Licencia } from "@/types/licencias";

type Adquisicion = {
    cantidad: DictamenCantidadFieldType;
    empleado_id: EmpleadoFieldType<undefined, false>;
    numero_inventario: ArticuloNullableNumeroInventarioFieldType;
    caracteristicas_adicionales: DictamenCaracteristicasAdicionalesFieldType;
    producto_variante: DictaminarDictamenProductoVarianteFields;
}

type Schema = {
    adquisiciones: Adquisicion[];
    motivo_cambio: DictamenMotivoCambioFieldType;
}

const specDiscoDefaultValues = (spec: Disco): z.input<typeof dictaminarDictamenSpecDiscoValidator> => ({
    capacidad_id: spec.capacidad.id,
    tipo_id: spec.tipo.id,
    factor_forma_id: spec.factor_forma?.id,
    interfaz_id: spec.interfaz?.id
});

const specRamDefaultValues = (spec: Ram): z.input<typeof dictaminarDictamenSpecRamValidator> => ({
    capacidad_id: spec.capacidad.id,
    tipo_id: spec.tipo.id,
    velocidad_id: spec.velocidad?.id
});

const specComputadoraDefaultValues = (spec: Computadora): z.input<typeof dictaminarDictamenSpecComputadoraValidator> => ({
    tipo_id: spec.tipo.id,
});

const specCamaraDefaultValues = (spec: Camara): z.input<typeof dictaminarDictamenSpecCamaraValidator> => ({
    tipo_id: spec.tipo.id,
});

const specLicenciaDefaultValues = (spec: Licencia): z.input<typeof dictaminarDictamenSpecLicenciaValidator> => ({
    tipo_id: spec.tipo.id,
});

const specDefaultValues = (productoVariante: ProductoVariante) => {
    if (esProductoTipo(productoVariante, ProductoTipoEnum.Disco)) return specDiscoDefaultValues(productoVariante.spec);
    if (esProductoTipo(productoVariante, ProductoTipoEnum.Ram)) return specRamDefaultValues(productoVariante.spec);
    if (esProductoTipo(productoVariante, ProductoTipoEnum.Computadora)) return specComputadoraDefaultValues(productoVariante.spec);
    if (esProductoTipo(productoVariante, ProductoTipoEnum.Camara)) return specCamaraDefaultValues(productoVariante.spec);
    if (esProductoTipo(productoVariante, ProductoTipoEnum.Licencia)) return specLicenciaDefaultValues(productoVariante.spec);
    return undefined;
}

const productoVarianteToFieldsValue = (productoVariante: ProductoVariante): DictaminarDictamenProductoVarianteFields => {
    return ({
        tipo_id: productoVariante.tipo.id,
        marca_id: productoVariante.marca.id,
        modelo: productoVariante.modelo,
        spec: specDefaultValues(productoVariante) ?? {},
    }) as DictaminarDictamenProductoVarianteFields
}

const defaultValues = (dictamen: DetailedSurtirDictamen): Schema => ({
    adquisiciones: dictamen.version_actual.adquisiciones.map(({
        caracteristicas_adicionales,
        cantidad,
        articulo,
        empleado,
        producto_variante
    }) => ({
        cantidad,
        empleado_id: empleado.id,
        numero_inventario: articulo?.numero_inventario ?? null,
        caracteristicas_adicionales,
        producto_variante: productoVarianteToFieldsValue(producto_variante)
    })),
    motivo_cambio: undefined,
});

const adquisicionValidator = z.object({
    cantidad: positiveInteger,
    empleado_id: selectedNumberOption,
    numero_inventario: nullableString,
    caracteristicas_adicionales: nullableString,
    producto_variante: dictaminarDictamenProductoVarianteFieldsValidator
});

const validator = z.object({
    adquisiciones: requiredArray(adquisicionValidator),
    motivo_cambio: requiredString,
});

const adquisicionFieldsDefaultValues: Adquisicion = {
    cantidad: 1,
    caracteristicas_adicionales: null,
    numero_inventario: null,
    empleado_id: undefined,
    producto_variante: {
        tipo_id: undefined,
        marca_id: undefined,
        modelo: undefined
    }
}

export {
    defaultValues as corregirDictamenDefaultFormValues,
    validator as corregirDictamenFormValidator,
    adquisicionFieldsDefaultValues as corregirDictamenAdquisicionFieldsDefaultValues,
    productoVarianteToFieldsValue as corregirDictamenProductoVarianteToFieldsValue
}
