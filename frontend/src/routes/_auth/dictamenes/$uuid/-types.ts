import { DictamenEstadoEnum } from "@/lib/constants";
import type {
    Dictamen,
    DictamenEstado,
    DictamenProducto,
    DictamenWithDictamenProductos
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

export type ActionDictamenWithDocumento<T extends ActionDictamen = ActionDictamen> = Omit<T, 'documento'> & {
    documento: NonNullable<T['documento']>;
}

export type ActionDictamenProducto<T extends DictamenProducto = DictamenProducto> = Omit<T, 'producto'> & {
    producto: NonNullable<T['producto']>;
}

export type ActionDictamenWithDictamenProductos<T extends ActionDictamen = ActionDictamen> = DictamenWithDictamenProductos<T>;
export type ActionDictamenWithActionDictamenProductos<TActionDictamenProducto extends ActionDictamenProducto = ActionDictamenProducto, TActionDictamen extends ActionDictamen = ActionDictamenWithDocumento> = DictamenWithDictamenProductos<TActionDictamen, TActionDictamenProducto>;
