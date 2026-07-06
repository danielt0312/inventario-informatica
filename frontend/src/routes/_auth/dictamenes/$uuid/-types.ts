import type {
    Dictamen,
    DictamenEstado,
    DictamenProducto,
    DictamenWithDictamenProductos,
    DictaminadoDictamen,
    DictaminadoDictamenWithDictamenProductos,
    DictaminarDictamen,
    DictaminarDictamenWithDictamenProductos,
    SurtirDictamen,
    SurtirDictamenWithDictamenProductos,
} from "@/types/dictamenes";
import { ActionDictamenEstadoEnum } from "./-constants";

export type ActionDictamenEstado<TActionDictamenEstado extends ActionDictamenEstadoEnum = ActionDictamenEstadoEnum> = DictamenEstado<TActionDictamenEstado>;
export type ActionDictamen<TActionDictamenEstado extends ActionDictamenEstado = ActionDictamenEstado> = Dictamen<TActionDictamenEstado>;
export type ActionDictamenWithDictamenProductos<TActionDictamen extends ActionDictamen = ActionDictamen, TDictamenProducto extends DictamenProducto = DictamenProducto> = DictamenWithDictamenProductos<TActionDictamen, TDictamenProducto>;

export type ActionDictaminadoEstado = ActionDictamenEstado<Exclude<ActionDictamenEstadoEnum, typeof ActionDictamenEstadoEnum.DICTAMINAR>>;
export type ActionDictaminadoDictamen = DictaminadoDictamen<ActionDictaminadoEstado>;
export type ActionDictaminadoDictamenWithDictamenProductos = DictaminadoDictamenWithDictamenProductos<ActionDictaminadoDictamen>;

export type ActionDictamenUnion =
    | DictaminarDictamen
    | SurtirDictamen
    | ActionDictaminadoDictamen;

export type ActionDictamenWithDictamenProductosUnion =
    | DictaminarDictamenWithDictamenProductos
    | SurtirDictamenWithDictamenProductos
    | ActionDictaminadoDictamenWithDictamenProductos;
