import type {
    TDictamenEstado,
    DictaminadoDictamen,
    DetailedDictaminadoDictamen,
    Dictaminar,
    TDictamen,
    AttrDocumento,
    TDetailedDictamen,
    TDictamenProducto,
    AttrProductoTipo,
    AttrProducto,
    AttrCaracteristicas,
    DictaminarDictamen,
} from "@/types/dictamenes";
import { ActionDictamenEstadoEnum } from "./-constants";
import type { DictaminadoDictamenEstadoEnum } from "@/lib/constants";
import type { DetailedProductoTipo } from "@/types/productos";

type TAction = ActionDictamenEstadoEnum;
type TActionDictamenEstado<T extends TAction> = TDictamenEstado<T>;
type TActionDictamen<T extends TActionDictamenEstado<TAction>, TDocumento extends AttrDocumento> = TDictamen<T, TDocumento>;
type TDetailedActionDictamen<T extends TActionDictamen<TActionDictamenEstado<TAction>, AttrDocumento>, AttrDictamenProducto extends TDictamenProducto<AttrProductoTipo, AttrProducto, AttrCaracteristicas>> = TDetailedDictamen<T, AttrDictamenProducto>

type ActionDictaminarDictamenEstado = TActionDictamenEstado<Dictaminar>;
export type ActionDictaminarDictamen = DictaminarDictamen<ActionDictaminarDictamenEstado>;
export type DetailedActionDictaminarDictamen = TDetailedActionDictamen<ActionDictaminarDictamen, TDictamenProducto<DetailedProductoTipo, null, null>>;

type ActionDictaminado = TAction & DictaminadoDictamenEstadoEnum;
type ActionDictaminadoDictamenEstado = TActionDictamenEstado<ActionDictaminado>;
export type ActionDictaminadoDictamen = DictaminadoDictamen<ActionDictaminadoDictamenEstado>;
export type DetailedActionDictaminadoDictamen = DetailedDictaminadoDictamen<ActionDictaminadoDictamen>;

export type ActionDictamen =
    | ActionDictaminarDictamen
    | ActionDictaminadoDictamen;

export type DetailedActionDictamen =
    | DetailedActionDictaminarDictamen
    | DetailedActionDictaminadoDictamen;
