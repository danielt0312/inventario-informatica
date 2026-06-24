import { DictamenEstadoEnum } from "@/lib/constants";
import type {
    Dictamen,
    DictamenEstado,
    DictamenProducto,
    DictamenWithDictamenProductos
} from "@/types/dictamenes";

export const ActionLabels = ['dictaminar', 'evidenciar', 'facturar', 'inventariar'] as const;
export type ActionLabels = (typeof ActionLabels)[number];

export const ActionStates = {
    [DictamenEstadoEnum.DICTAMINAR]: 'dictaminar',
    [DictamenEstadoEnum.EVIDENCIAR]: 'evidenciar',
    [DictamenEstadoEnum.SURTIR]: 'facturar',
    [DictamenEstadoEnum.INVENTARIAR]: 'inventariar'
} as const satisfies Partial<Record<DictamenEstadoEnum, ActionLabels>>;

export type ActionDictamenEstadoEnum = keyof typeof ActionStates;

export type ActionDictamen<TDictamen extends Dictamen = Dictamen> = Omit<TDictamen, 'estado'> & {
    estado: Omit<DictamenEstado, 'id'> & {
        id: ActionDictamenEstadoEnum;
    }
}

export type ActionDictamenWithDocumento<TActionDictamen extends ActionDictamen = ActionDictamen> = Omit<TActionDictamen, 'documento'> & {
    documento: NonNullable<TActionDictamen['documento']>;
}

export type ActionDictamenProducto<TDictamenProducto extends DictamenProducto = DictamenProducto> = Omit<TDictamenProducto, 'producto'> & {
    producto: NonNullable<DictamenProducto['producto']>;
}

export type ActionDictamenWithDictamenProductos<TActionDictamen extends ActionDictamen = ActionDictamen> = DictamenWithDictamenProductos<TActionDictamen>;
export type ActionDictamenWithActionDictamenProductos<TActionDictamen extends ActionDictamen = ActionDictamenWithDocumento, TActionDictamenProducto extends ActionDictamenProducto = ActionDictamenProducto> = DictamenWithDictamenProductos<TActionDictamen, TActionDictamenProducto>;
