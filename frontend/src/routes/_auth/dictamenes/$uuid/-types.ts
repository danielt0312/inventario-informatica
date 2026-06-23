import { DictamenEstadoEnum } from "@/lib/constants";
import type {
    Dictamen,
    DictamenEstado,
    DictamenProducto,
    DictamenWithDictamenProductos
} from "@/types/dictamenes";
import type {
    Producto,
    ProductoTipo
} from "@/types/productos";

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

export type ActionDictamenWithDocumento = Omit<ActionDictamen, 'documento'> & {
    documento: NonNullable<ActionDictamen['documento']>;
}

export type ActionDictamenWithDictamenProductos = ActionDictamenWithDocumento & {
    productos: DictamenProducto<ProductoTipo, NonNullable<Producto>>[];
};
