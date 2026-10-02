import type { ProductoMarcaFieldType } from "../productos/marca-field";
import type { ProductoModeloFieldType } from "../productos/variante-spec-field-group";
import { ProductoTipoEnum } from "@/lib/constants";
import {
    selectedNumberOption,
    trimmedString
} from "@/lib/schemas/common";
import z from "zod";

const {
    Disco,
    ...otrosProductoTipo
} = ProductoTipoEnum;

type SchemaBase = {
    marca_id?: ProductoMarcaFieldType<undefined, false, number>;
    modelo?: ProductoModeloFieldType;
}

type Field = SchemaBase & (
    | { tipo_id: typeof Disco; spec?: z.input<typeof specDiscoValidator> }
    | { tipo_id: Exclude<ProductoTipoEnum, typeof Disco> | undefined }
)

const defaultValues: Field = {
    tipo_id: undefined
}

const specDiscoValidator = z.object({
    tipo_id: selectedNumberOption,
    capacidad_id: selectedNumberOption,
    factor_forma_id: selectedNumberOption,
    interfaz_id: selectedNumberOption,
}).partial();

const validatorBase = {
    marca_id: selectedNumberOption.optional(),
    modelo: trimmedString().optional()
}

const validator = z.discriminatedUnion("tipo_id", [
    z.object({ ...validatorBase, tipo_id: z.literal(Disco), spec: specDiscoValidator.optional() }),
    z.object({ ...validatorBase, tipo_id: z.literal(Object.values(otrosProductoTipo)) }),
], { error: "Debes de seleccionar un tipo de producto válido" });

export {
    type Field as DictamenBorradorField,
    defaultValues as dictamenBorradorDefaultFieldValues,
    validator as dictamenBorradorFieldValidator
}
