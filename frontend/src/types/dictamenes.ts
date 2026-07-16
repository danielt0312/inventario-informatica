import type { DICTAMEN_ESTADO_DICTAMINAR, DictamenEstadoEnum, DictaminadoDictamenEstadoEnum } from "@/lib/constants";
import type { TCatalogo } from "./generics";
import type { Documento, Oficio } from "./documentos";
import type { DetailedProducto, DetailedProductoTipo, Producto } from "./productos";

export type BaseDictamenEstado<T extends DictamenEstadoEnum = DictamenEstadoEnum> = TCatalogo<T>;
export type BaseDictamen<T extends BaseDictamenEstado = BaseDictamenEstado> = {
    id: number;
    uuid: string;
    estado: T;
    oficio: Oficio;
}
export type BaseDictamenVersion = {
    version: number;
    adscripcion: TCatalogo;
    fecha_solicitud: string;
}
export type BaseDictamenProducto = {
    id: number;
    cantidad: number;
    empleado: TCatalogo;
}
export type BaseDetailedDictamenVersion<TDictamenVersion extends BaseDictamenVersion = BaseDictamenVersion, TDictamenProducto extends BaseDictamenProducto = BaseDictamenProducto> = TDictamenVersion & {
    dictamen_productos: TDictamenProducto[];
}
export type BaseDictamenVersionActual<TDictamen extends BaseDictamen = BaseDictamen, TDictamenVersion extends BaseDictamenVersion = BaseDictamenVersion> = TDictamen & {
    version_actual: TDictamenVersion;
}
export type BaseDetailedDictamenVersionActual<TDictamen extends BaseDictamen, TDetailedDictamenVersion extends BaseDetailedDictamenVersion> = BaseDictamenVersionActual<TDictamen, TDetailedDictamenVersion>;

export type Dictaminar = typeof DICTAMEN_ESTADO_DICTAMINAR;
export type DictaminarDictamenEstado = BaseDictamenEstado<Dictaminar>;
export type DictaminarDictamen<TDictaminarDictamenEstado extends DictaminarDictamenEstado = DictaminarDictamenEstado> = BaseDictamen<TDictaminarDictamenEstado>;
export type DictaminarDictamenVersion = BaseDictamenVersion;
export type DictaminarDictamenProducto<TProductoTipo extends DetailedProductoTipo = DetailedProductoTipo> = BaseDictamenProducto & {
    producto_tipo: TProductoTipo;
}
export type DictaminarDictamenVersionActual = BaseDictamenVersionActual<DictaminarDictamen, DictaminarDictamenVersion>;
export type DetailedDictaminarDictamenVersion = BaseDetailedDictamenVersion<DictaminarDictamenVersion, DictaminarDictamenProducto>;
export type DetailedDictaminarDictamenVersionActual = BaseDetailedDictamenVersionActual<DictaminarDictamen, DetailedDictaminarDictamenVersion>;

export type Dictaminado = DictaminadoDictamenEstadoEnum;
export type DictaminadoDictamenEstado<TDictaminado extends Dictaminado = Dictaminado> = BaseDictamenEstado<TDictaminado>;
export type DictaminadoDictamen<TDictaminadoDictamenEstado extends DictaminadoDictamenEstado = DictaminadoDictamenEstado> = BaseDictamen<TDictaminadoDictamenEstado>;
export type DictaminadoDictamenVersion = BaseDictamenVersion & {
    documento: Documento;
}
export type DictaminadoDictamenProducto<TProducto extends Producto = DetailedProducto> = BaseDictamenProducto & {
    producto: TProducto;
}
export type DictaminadoDictamenVersionActual = BaseDictamenVersionActual<DictaminadoDictamen, DictaminadoDictamenVersion>;
export type DetailedDictaminadoDictamenVersion = BaseDetailedDictamenVersion<DictaminadoDictamenVersion, DictaminadoDictamenProducto>;
export type DetailedDictaminadoDictamenVersionActual<TDictaminadoDictamen extends DictaminadoDictamen = DictaminadoDictamen, TDetailedDictaminadoDictamenVersion extends DetailedDictaminadoDictamenVersion = DetailedDictaminadoDictamenVersion> = BaseDetailedDictamenVersionActual<TDictaminadoDictamen, TDetailedDictaminadoDictamenVersion>;
