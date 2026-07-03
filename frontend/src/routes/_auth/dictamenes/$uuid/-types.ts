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

const { SURTIDO, SURTIDO_PARCIAL, ...dictamenEstadoEnum } = DictamenEstadoEnum;
export const ActionDictamenEstadoEnum = dictamenEstadoEnum;
export type ActionDictamenEstadoEnum = (typeof ActionDictamenEstadoEnum)[keyof typeof ActionDictamenEstadoEnum];

export const ActionStates = {
    [ActionDictamenEstadoEnum.DICTAMINAR]: 'dictaminar',
    [ActionDictamenEstadoEnum.EVIDENCIAR]: 'evidenciar',
    [ActionDictamenEstadoEnum.SURTIR]: 'surtir',
    [ActionDictamenEstadoEnum.INVENTARIAR]: 'inventariar',
    [ActionDictamenEstadoEnum.RESGUARDAR]: 'resguardar'
} as const satisfies Record<ActionDictamenEstadoEnum, ActionLabels>;

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

export type DictaminadoDictamen<T extends Dictamen = Dictamen> = Omit<T, 'documento'> & {
    documento: NonNullable<T['documento']>
}

export type DictaminadoActionDictamen = DictaminadoDictamen<ActionDictamen>;
export type DictaminadoDictamenWithDictaminadoDictamenProductos = DictamenWithDictamenProductos<DictaminadoActionDictamen, DictaminadoDictamenProducto>;
export type SurtirDictamen = Omit<DictaminadoActionDictamen, 'estado'> & {
    estado: Omit<DictaminadoActionDictamen, 'id'> & {
        id: ActionDictamenEstadoEnum
    }
};
