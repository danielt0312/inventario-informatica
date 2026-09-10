import type { DiscoTipoFieldType } from "../discos/tipo-field";
import type { ProductoFieldType } from "../../productos/form-fields";
import type { DiscoCapacidadFieldType } from "../discos/capacidad-field";
import { requiredArray, selectedNumberOption } from "@/lib/schemas/common";
import z from "zod";
import type { DiscoInterfazFieldType } from "../discos/interfaz-field";

type DiscoFields = {
    producto_id: ProductoFieldType;
    tipo_id: DiscoTipoFieldType;
    capacidad_id: DiscoCapacidadFieldType;
    interfaz_id: DiscoInterfazFieldType;
}

type RamFields = {
    producto_id: ProductoFieldType;
}

type Schema = {
    discos: DiscoFields[];
}

const discoFieldsDefaultValues: DiscoFields = {
    producto_id: undefined,
    tipo_id: undefined,
    capacidad_id: undefined,
    interfaz_id: null,
}

const defaultValues: Schema = {
    discos: [discoFieldsDefaultValues],
}

const validator = z.object({
    discos: requiredArray(
        z.object({
            producto_id: selectedNumberOption,
            tipo_id: selectedNumberOption,
            capacidad_id: selectedNumberOption,
            interfaz_id: selectedNumberOption.nullable(),
        })
    )
});

type SchemaOutput = z.output<typeof validator>;

export {
    discoFieldsDefaultValues as actualizarArticuloDiscoFieldsDefaultValues,
    defaultValues as actualizarArticuloDefaultFormValues,
    validator as actualizarArticuloFormValidator,
    type SchemaOutput as ActualizarArticuloSchemaOutput,
}
