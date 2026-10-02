import { ProductoTipoEnum } from "@/lib/constants";
import { discoFormValidator, type DiscoFormSchemaFields } from "../discos/field";
import { productoVarianteSpecFormValidator, type ProductoVarianteSpecSchema } from "../productos/variante-spec-field-group";
import z from "zod";

const {
    Disco,
    ...otrosProductoTipo
} = ProductoTipoEnum;

type Field = Partial<ProductoVarianteSpecSchema> & (
    | { tipo_id: typeof Disco; spec: DiscoFormSchemaFields }
    | { tipo_id: Exclude<ProductoTipoEnum, typeof Disco> | undefined}
)

const defaultValues: Field = {
    tipo_id: undefined,
    marca_id: undefined,
    modelo: undefined,
}

const { marca_id: productoMarcaValidator, modelo: productoModeloValidator } = productoVarianteSpecFormValidator.shape;
const productoValidatorBase = {
    marca_id: productoMarcaValidator.or(z.undefined()),
    modelo: productoModeloValidator.or(z.undefined())
}

const { capacidad_id: discoCapacidadValidator, tipo_id: discoTipoValidator  } = discoFormValidator.shape.disco.shape;
const specDiscoValidator = discoFormValidator.shape.disco
    .extend({
        capacidad_id: discoCapacidadValidator.or(z.undefined()),
        tipo_id: discoTipoValidator.or(z.undefined())
    });

const validator = z.discriminatedUnion("tipo_id", [
    z.object({ ...productoValidatorBase, tipo_id: z.literal(Disco), spec: specDiscoValidator }),
    z.object({ ...productoValidatorBase, tipo_id: z.literal(Object.values(otrosProductoTipo)) }),
], { error: "Debes de seleccionar una tipo de producto válido" });

export {
    type Field as DictamenBorradorField,
    defaultValues as dictamenBorradorDefaultFieldValues,
    validator as dictamenBorradorFieldValidator
}
