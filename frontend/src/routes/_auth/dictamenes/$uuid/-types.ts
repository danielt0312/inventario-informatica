import type {
    Dictamen,
    DictamenEstado,
    DictamenProducto,
    DictamenWithDictamenProductos,
    DictaminadoDictamen,
    DictaminadoDictamenWithDictamenProductos,
    Dictaminar,
} from "@/types/dictamenes";
import { ActionDictamenEstadoEnum } from "./-constants";
import type { DictaminadoDictamenEstadoEnum } from "@/lib/constants";

type Action = ActionDictamenEstadoEnum;
type ActionDictamenEstado<TAction extends Action = Action> = DictamenEstado<TAction>;
type ActionDictamen<TActionDictamenEstado extends ActionDictamenEstado = ActionDictamenEstado> = Dictamen<TActionDictamenEstado>;
type ActionDictamenWithDictamenProductos<TActionDictamen extends ActionDictamen = ActionDictamen, TDictamenProducto extends DictamenProducto = DictamenProducto> = DictamenWithDictamenProductos<TActionDictamen, TDictamenProducto>;

type ActionDictaminarDictamenEstado = ActionDictamenEstado<Dictaminar>;
export type ActionDictaminarDictamen = ActionDictamen<ActionDictaminarDictamenEstado>;
export type ActionDictaminarDictamenWithDictamenProductos = ActionDictamenWithDictamenProductos<ActionDictaminarDictamen>;

type ActionDictaminado = Action & DictaminadoDictamenEstadoEnum;
type ActionDictaminadoDictamenEstado = ActionDictamenEstado<ActionDictaminado>;
export type ActionDictaminadoDictamen = DictaminadoDictamen<ActionDictaminadoDictamenEstado>;
export type ActionDictaminadoDictamenWithDictamenProductos = DictaminadoDictamenWithDictamenProductos<ActionDictaminadoDictamen>;

export type ActionDictamenUnion =
    | ActionDictaminarDictamen
    | ActionDictaminadoDictamen;

export type ActionDictamenWithDictamenProductosUnion =
    | ActionDictaminarDictamenWithDictamenProductos
    | ActionDictaminadoDictamenWithDictamenProductos;

