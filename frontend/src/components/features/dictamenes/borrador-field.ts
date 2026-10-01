import type { ProductoTipoEnum } from "@/lib/constants";
import { type DiscoFormSchemaFields } from "../discos/field";
import type { ProductoTipoFieldType } from "../productos/tipo-field";
import type { ProductoVarianteSpecSchema } from "../productos/variante-spec-field-group";
import { selectedNumberOption, trimmedString } from "@/lib/schemas/common";
import z from "zod";

type Producto = Partial<ProductoVarianteSpecSchema>

type Borrador =
  | { producto: { tipo_id: typeof ProductoTipoEnum.Disco } & Producto; spec: DiscoFormSchemaFields }
  | { producto: { tipo_id: ProductoTipoFieldType } & Producto; spec: undefined }

type BorradorFields = {
    caracteristicas_adicionales?: string | undefined;
} & Borrador

const defaultValues: BorradorFields = {
    producto: {
        tipo_id: undefined,
        marca_id: undefined,
        modelo: undefined
    },
    spec: undefined,
    caracteristicas_adicionales: undefined
}

const productoValidator = z.object({
    tipo_id: selectedNumberOption,
    marca_id: selectedNumberOption.optional(),
    modelo: trimmedString().optional()
});

const validator = z.object({
    producto: productoValidator,
    caracteristicas_adicionales: trimmedString().optional()
})

export {
    type BorradorFields as DictamenBorradorFields,
    defaultValues as dictamenBorradorDefaultFieldsValues,
    validator as dictamenBorradorFieldsValidator
}
