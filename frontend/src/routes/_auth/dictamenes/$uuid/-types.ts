import type {
    BaseDictamenEstado,
    DictaminadoDictamen,
    DetailedDictaminadoDictamenVersionActual,
    Dictaminar,
    BaseDictamen,
    DictaminarDictamen,
} from "@/types/dictamenes";
import { ActionDictamenEstadoEnum } from "./-constants";
import type { DictaminadoDictamenEstadoEnum } from "@/lib/constants";
import type { DetailedProductoTipo } from "@/types/productos";

type TAction = ActionDictamenEstadoEnum;
type TActionDictamenEstado<T extends TAction> = BaseDictamenEstado<T>;
type ActionDictamenEstadoBase = TActionDictamenEstado<TAction>
type TActionDictamen<T extends ActionDictamenEstadoBase> = BaseDictamen<T>;
type ActionDictamenBase =
type TDetailedActionDictamen<T extends TActionDictamen<TActionDictamenEstado<TAction>, AttrDocumento>, AttrDictamenProducto extends TDictamenProducto<AttrProductoTipo, AttrProducto, AttrCaracteristicas>> = TDetailedDictamen<T, AttrDictamenProducto>

type ActionDictaminarDictamenEstado = TActionDictamenEstado<Dictaminar>;
export type ActionDictaminarDictamen = DictaminarDictamen<ActionDictaminarDictamenEstado>;
export type DetailedActionDictaminarDictamen = TDetailedActionDictamen<ActionDictaminarDictamen, TDictamenProducto<DetailedProductoTipo, null, null>>;

type ActionDictaminado = TAction & DictaminadoDictamenEstadoEnum;
type ActionDictaminadoDictamenEstado = TActionDictamenEstado<ActionDictaminado>;
export type ActionDictaminadoDictamen = DictaminadoDictamen<ActionDictaminadoDictamenEstado>;
export type DetailedActionDictaminadoDictamen = DetailedDictaminadoDictamenVersionActual<ActionDictaminadoDictamen>;

export type ActionDictamen =
    | ActionDictaminarDictamen
    | ActionDictaminadoDictamen;

export type DetailedActionDictamen =
    | DetailedActionDictaminarDictamen
    | DetailedActionDictaminadoDictamen;
