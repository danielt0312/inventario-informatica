import type { DetailedDictaminarDictamen } from "@/types/dictamenes";
import type { DictamenCaracteristicasAdicionalesFieldType } from "../fields";
import type { ProductoMarcaFieldType } from "../../productos/marca-field";
import type { ProductoModeloFieldType } from "../../productos/variante-spec-field-group";
import { nullableString, requiredArray, selectedNumberOption } from "@/lib/schemas/common";
import { ProductoTipoEnum } from "@/lib/constants";
import z from "zod";

const {
    Computadora,
    Disco,
    Ram,
    Camara,
    Licencia,
    ...otrosProductoTipo
} = ProductoTipoEnum;

type BorradorFieldBase = {
    marca_id: ProductoMarcaFieldType<undefined, false>;
    modelo: ProductoModeloFieldType;
}

type BorradorField = BorradorFieldBase & (
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
    factor_forma_id: selectedNumberOption.nullable(),
    interfaz_id: selectedNumberOption.nullable(),
});

const specRamValidator = z.object({
    tipo_id: selectedNumberOption,
    capacidad_id: selectedNumberOption,
    velocidad_id: selectedNumberOption.nullable(),
});

type AdquisicionFields = {
    id: number;
    caracteristicas_adicionales: DictamenCaracteristicasAdicionalesFieldType;
    borrador_producto_variante: DictamenBorradorProductoVariante;
}

type Schema = {
    adquisiciones: AdquisicionFields[];
}

const defaultValues = (dictamen: DetailedDictaminarDictamen): Schema => ({
    adquisiciones: dictamen.version_actual.adquisiciones
});

const validator = z.object({
    adquisiciones: requiredArray(
        z.object({
            id: selectedNumberOption,
            especificaciones_tecnicas: nullableString,
            producto_id: selectedNumberOption
        })
    )
});

export {
    defaultValues as dictaminarDictamenDefaultFormValues,
}
