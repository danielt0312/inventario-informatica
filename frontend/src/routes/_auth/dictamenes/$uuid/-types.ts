import { DictamenEstadoEnum } from "@/lib/constants";
import type {
    AttributeProductoDictamenProducto,
    Dictamen,
    DictamenEstado,
    DictamenProducto,
    DictamenWithDictamenProductos,
} from "@/types/dictamenes";

export const ActionLabels = ['dictaminar', 'evidenciar', 'surtir', 'inventariar', 'resguardar'] as const;
export type ActionLabels = (typeof ActionLabels)[number];

export const ActionStates = {
    [DictamenEstadoEnum.DICTAMINAR]: 'dictaminar',
    [DictamenEstadoEnum.EVIDENCIAR]: 'evidenciar',
    [DictamenEstadoEnum.SURTIR]: 'surtir',
    [DictamenEstadoEnum.INVENTARIAR]: 'inventariar',
    [DictamenEstadoEnum.RESGUARDAR]: 'resguardar'
} as const satisfies Partial<Record<DictamenEstadoEnum, ActionLabels>>;

export type ActionDictamenEstadoEnum = keyof typeof ActionStates;

export type ActionDictamen<T extends Dictamen = Dictamen> = Omit<T, 'estado'> & {
    estado: Omit<DictamenEstado, 'id'> & {
        id: ActionDictamenEstadoEnum;
    }
}

export type ActionDictamenWithDictamenProductos = DictamenWithDictamenProductos<ActionDictamen>;

export type DictaminadoAttributeProductoDictamenProducto = Omit<AttributeProductoDictamenProducto, 'marca' | 'modelo'> & {
    marca: NonNullable<AttributeProductoDictamenProducto['marca']>;
    modelo: NonNullable<AttributeProductoDictamenProducto['modelo']>;
}

export type DictaminadoDictamenProducto = Omit<DictamenProducto, 'caracteristicas' | 'producto'> & {
    caracteristicas: NonNullable<DictamenProducto['caracteristicas']>;
    producto: DictaminadoAttributeProductoDictamenProducto;
}

export type DictaminadoDictamen = Omit<ActionDictamen, 'documento'> & {
    documento: NonNullable<ActionDictamen['documento']>
}

export type DictaminadoDictamenWithDictaminadoDictamenProductos = DictamenWithDictamenProductos<DictaminadoDictamen, DictaminadoDictamenProducto>
