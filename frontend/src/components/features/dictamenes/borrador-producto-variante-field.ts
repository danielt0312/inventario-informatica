import { ProductoTipoEnum } from "@/lib/constants";
import { discoFormValidator, type DiscoFormSchemaFields } from "../discos/field";
import { productoVarianteSpecFormValidator, type ProductoVarianteSpecSchema } from "../productos/variante-spec-field-group";
import type { ProductoTipoFieldType } from "../productos/tipo-field";
import z from "zod";

type Field = Partial<ProductoVarianteSpecSchema> & (
    | { tipo_id: typeof ProductoTipoEnum.Disco; spec: DiscoFormSchemaFields }
    | { tipo_id: ProductoTipoFieldType, spec?: undefined }
)

const defaultValues: Field = {
    tipo_id: undefined
}

const { marca_id, modelo } = productoVarianteSpecFormValidator.shape;
const productoValidatorBase = {
    marca_id: marca_id.optional(),
    modelo: modelo.optional()
}

const { Disco, ...otrosProductoTipo } = ProductoTipoEnum;
const validator = z.discriminatedUnion("tipo_id", [
    z.object({ ...productoValidatorBase, tipo_id: z.literal(Disco), spec: discoFormValidator.shape.disco.optional() }),
    z.object({ ...productoValidatorBase, tipo_id: z.literal(Object.values(otrosProductoTipo)) }),
], { error: "Tipo de producto no soportado" });

export {
    type Field as DictamenBorradorField,
    defaultValues as dictamenBorradorDefaultFieldValues,
    validator as dictamenBorradorFieldValidator
}
