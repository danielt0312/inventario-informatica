import type { DictamenEstadoEnum, DictaminadoDictamenEstadoEnum } from "@/lib/constants";
import type { TCatalogo } from "./generics";
import type { Documento, Oficio } from "./documentos";
import type { DetailedProducto, DetailedProductoTipo } from "./productos";

export type TDictamenEstado<T extends DictamenEstadoEnum = DictamenEstadoEnum> = TCatalogo<T>;
export type AttrDocumento = Documento | null;
export type TDictamen<TEstado extends TDictamenEstado, TDocumento extends AttrDocumento> = {
    id: number;
    uuid: string;
    adscripcion: TCatalogo;
    fecha_solicitud: string;
    estado: TEstado;
    oficio: Oficio;
    documento: TDocumento;
}
export type AttrProductoTipo = DetailedProductoTipo | null;
export type AttrProducto = DetailedProducto | null;
export type AttrCaracteristicas = string | null;
export type TDictamenProducto<TProductoTipo extends AttrProductoTipo, TProducto extends AttrProducto, TCaracteristicas extends AttrCaracteristicas> = {
    id: number;
    cantidad: number;
    caracteristicas: TCaracteristicas;
    empleado: TCatalogo;
    producto_tipo: TProductoTipo;
    producto: TProducto;
}
export type TDetailedDictamen<T extends TDictamen<TDictamenEstado, AttrDocumento>, AttrDictamenProducto extends TDictamenProducto<AttrProductoTipo, AttrProducto, AttrCaracteristicas>> = T & {
    dictamen_productos: AttrDictamenProducto[];
};

export type Dictaminar = typeof DictamenEstadoEnum.DICTAMINAR;
export type DictaminarDictamenEstado = TDictamenEstado<Dictaminar>;
export type DictaminarDictamen<TEstado extends DictaminarDictamenEstado = DictaminarDictamenEstado> = TDictamen<TEstado, null>;
export type DictaminarDictamenProducto = TDictamenProducto<AttrProductoTipo, null, null>
export type DetailedDictaminarDictamen = TDetailedDictamen<DictaminarDictamen, DictaminarDictamenProducto>;

export type DictaminadoDictamenEstado<TDictaminadoEstado extends DictaminadoDictamenEstadoEnum = DictaminadoDictamenEstadoEnum> = TDictamenEstado<TDictaminadoEstado>;
export type DictaminadoDictamen<TEstado extends DictaminadoDictamenEstado = DictaminadoDictamenEstado> = TDictamen<TEstado, Documento>;
export type DictaminadoDictamenProducto = TDictamenProducto<null, DetailedProducto, string>;
export type DetailedDictaminadoDictamen<TDictaminadoDictamen extends DictaminadoDictamen = DictaminadoDictamen, TDictaminadoDictamenProducto extends DictaminadoDictamenProducto = DictaminadoDictamenProducto> = TDetailedDictamen<TDictaminadoDictamen, TDictaminadoDictamenProducto>;

export type Surtir = typeof DictaminadoDictamenEstadoEnum.SURTIR;
export type SurtirDictamenEstado = DictaminadoDictamenEstado<Surtir>;
export type SurtirDictamen = DictaminadoDictamen<SurtirDictamenEstado>;
export type DetailedSurtirDictamen = DetailedDictaminadoDictamen<SurtirDictamen>;

export type Dictamen =
    | DictaminarDictamen
    | DictaminadoDictamen;

export type DetailedDictamen =
    | DetailedDictaminarDictamen
    | DetailedDictaminadoDictamen;
