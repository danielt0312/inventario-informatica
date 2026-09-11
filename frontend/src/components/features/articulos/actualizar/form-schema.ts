import { requiredArray, selectedNumberOption } from "@/lib/schemas/common";
import type { DiscoTipoFieldType } from "../discos/tipo-field";
import type { ProductoFieldType } from "../../productos/form-fields";
import type { DiscoCapacidadFieldType } from "../discos/capacidad-field";
import type { DiscoInterfazFieldType } from "../discos/interfaz-field";
import type { RamTipoFieldType } from "../rams/tipo-field";
import type { RamCapacidadFieldType } from "../rams/capacidad-field";
import type { RamVelocidadFieldType } from "../rams/velocidad-field";
import z from "zod";

type DiscoFields = {
    producto_id: ProductoFieldType;
    tipo_id: DiscoTipoFieldType;
    capacidad_id: DiscoCapacidadFieldType;
    interfaz_id: DiscoInterfazFieldType;
}

type RamFields = {
    producto_id: ProductoFieldType;
    tipo_id: RamTipoFieldType;
    capacidad_id: RamCapacidadFieldType;
    velocidad_id: RamVelocidadFieldType;
}

type Schema = {
    discos: DiscoFields[];
    rams: RamFields[];
}

const discoFieldsDefaultValues: DiscoFields = {
    producto_id: undefined,
    tipo_id: undefined,
    capacidad_id: undefined,
    interfaz_id: null,
}

const ramFieldsDefaultValues: RamFields = {
    producto_id: undefined,
    tipo_id: undefined,
    capacidad_id: undefined,
    velocidad_id: null,
}

const defaultValues: Schema = {
    discos: [discoFieldsDefaultValues],
    rams: [ramFieldsDefaultValues],
}

const discoValidator = z.object({
    producto_id: selectedNumberOption,
    tipo_id: selectedNumberOption,
    capacidad_id: selectedNumberOption,
    interfaz_id: selectedNumberOption.nullable(),
});

const ramValidator = z.object({
    producto_id: selectedNumberOption,
    tipo_id: selectedNumberOption,
    capacidad_id: selectedNumberOption,
    velocidad_id: selectedNumberOption.nullable(),
});

const validator = z.object({
    discos: requiredArray(discoValidator),
    rams: requiredArray(ramValidator),
});

type SchemaOutput = z.output<typeof validator>;

export {
    discoFieldsDefaultValues as actualizarArticuloDiscoFieldsDefaultValues,
    ramFieldsDefaultValues as actualizarArticuloRamFieldsDefaultValues,
    defaultValues as actualizarArticuloDefaultFormValues,
    validator as actualizarArticuloFormValidator,
    type SchemaOutput as ActualizarArticuloSchemaOutput,
}
