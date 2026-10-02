import type { ProductoMarcaFieldType } from "../productos/marca-field";
import type { ProductoModeloFieldType } from "../productos/variante-spec-field-group";
import { ProductoTipoEnum } from "@/lib/constants";
import {
    selectedNumberOption,
    trimmedString
} from "@/lib/schemas/common";
import z from "zod";

const {
    Computadora,
    Disco,
    Ram,
    Camara,
    Licencia,
    ...otrosProductoTipo
} = ProductoTipoEnum;

type SchemaBase = {
    marca_id?: ProductoMarcaFieldType<undefined, false, number>;
    modelo?: ProductoModeloFieldType;
}

type Field = SchemaBase & (
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
    }
)

const defaultValues: Field = {
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

const validator = z.discriminatedUnion("tipo_id", [
    z.object({ ...validatorBase, tipo_id: z.literal(Computadora), spec: specComputadoraValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(Disco), spec: specDiscoValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(Ram), spec: specRamValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(Camara), spec: specCamaraValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(Licencia), spec: specLicenciaValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(Object.values(otrosProductoTipo)) }),
], { error: "Debes de seleccionar un tipo de producto válido" });

export {
    type Field as DictamenBorradorProductoVariante,
    defaultValues as dictamenBorradorDefaultFieldValues,
    validator as dictamenBorradorFieldValidator
}
