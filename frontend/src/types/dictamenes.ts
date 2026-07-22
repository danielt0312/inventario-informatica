import type { DICTAMEN_ESTADO_DICTAMINAR, DICTAMEN_ESTADO_SURTIR, DictamenEstadoEnum, DictaminadoDictamenEstadoEnum } from "@/lib/constants";
import type { Includable, TCatalogo } from "./generics";
import type { Documento, Oficio } from "./documentos";
import type { DetailedProducto, DetailedProductoTipo } from "./productos";
import type { Articulo } from "./articulos";

export type BaseEstado<T extends DictamenEstadoEnum = DictamenEstadoEnum> = TCatalogo<T>;
export type Base<TEstado extends BaseEstado = BaseEstado> = {
    id: number;
    uuid: string;
    estado: TEstado;
}
export type BaseVersion = {
    version: number;
    adscripcion: TCatalogo;
    fecha_solicitud: string;
    // todo revisar el caso cuando sea null
    oficio: Oficio;
}
export type IncludableArticulo = Includable<Articulo>
export type BaseAdquisicion<TArticulo extends IncludableArticulo = IncludableArticulo> = {
    id: number;
    cantidad: number;
    empleado: TCatalogo;
    articulo: TArticulo;
}
export type VersionActual<TVersion extends BaseVersion = BaseVersion> = {
    version_actual: TVersion;
}
export type Adquisiciones<TAdquisicion extends BaseAdquisicion = BaseAdquisicion> = {
    adquisiciones: TAdquisicion[];
}
export type VersionWithAdquisiciones<TVersion extends BaseVersion = BaseVersion, TAdquisiciones extends Adquisiciones = Adquisiciones> = TVersion & TAdquisiciones;
export type VersionActualWithAdquisiciones<TVersionWithAdquisiciones extends VersionWithAdquisiciones = VersionWithAdquisiciones> = VersionActual<TVersionWithAdquisiciones>
// export type Versiones<TVersion extends BaseVersion> = {
//     versiones: TVersion[];
// }
// export type VersionesWithAdquisiciones<TVersionWithAdquisiciones extends VersionWithAdquisiciones = VersionWithAdquisiciones> = Versiones<TVersionWithAdquisiciones>;

export type ActualBase<TDictamen extends Base = Base, TVersionActual extends VersionActual = VersionActual> = TDictamen & TVersionActual;
export type DetailedBase<TDictamen extends Base = Base, TVersionActualWithAdquisiciones extends VersionActualWithAdquisiciones = VersionActualWithAdquisiciones> = ActualBase<TDictamen, TVersionActualWithAdquisiciones>;

// todo analizar como se quiere aplicar este export type en el feature
// si se quiere consultar las versiones una vez ya pasado la etapa de `INVENTARIAR`, i.e., `SURTIDO` | `SURTIDO_PARCIAL` | `SURTIDO_CON_OBSERVACIONES`
// o si desde el estado `DICTAMINAR` se quiere consultar todas las versiones
// contrario a lo anterior, entonces todas las versiones serian "dictaminado", i.e., `FullyDetailedDictaminadoDictamen`
// export type FullyDetailedBase<TDictamen extends Base = Base, TVersionesWithAdquisiciones extends VersionesWithAdquisiciones = VersionesWithAdquisiciones, TVersionActualWithAdquisiciones extends VersionActualWithAdquisiciones = VersionActualWithAdquisiciones> = DetailedBase<TDictamen & TVersionesWithAdquisiciones, TVersionActualWithAdquisiciones>

export type Dictaminar = Base<BaseEstado<typeof DICTAMEN_ESTADO_DICTAMINAR>>;
export type DictaminarAdquisicion = BaseAdquisicion & {
    producto_tipo: DetailedProductoTipo;
}
export type DetailedDictaminar = DetailedBase<Dictaminar, VersionActualWithAdquisiciones<VersionWithAdquisiciones<BaseVersion, Adquisiciones<DictaminarAdquisicion>>>>;

export type DictaminadoEstado<TEstado extends DictaminadoDictamenEstadoEnum = DictaminadoDictamenEstadoEnum> = BaseEstado<TEstado>;
export type Dictaminado<TDictaminadoEstado extends DictaminadoEstado = DictaminadoEstado> = Base<TDictaminadoEstado>;
export type DictaminadoAdquisicion = BaseAdquisicion & {
    producto: DetailedProducto;
    caracteristicas: string;
}
export type DictaminadoVersion = BaseVersion & {
    documento: Documento;
}
export type DetailedDictaminado<TDictaminado extends Dictaminado = Dictaminado> = DetailedBase<TDictaminado, VersionActualWithAdquisiciones<VersionWithAdquisiciones<DictaminadoVersion, Adquisiciones<DictaminadoAdquisicion>>>>;

export type SurtirEstado = DictaminadoEstado<typeof DICTAMEN_ESTADO_SURTIR>;
export type Surtir = Dictaminado<SurtirEstado>;
export type DetailedSurtir = DetailedBase<Surtir, VersionActualWithAdquisiciones<VersionWithAdquisiciones<DictaminadoVersion, Adquisiciones<DictaminadoAdquisicion>>>>

export type Dictamen =
    | Dictaminar
    | Dictaminado;

export type DetailedDictamen =
    | DetailedDictaminar
    | DetailedDictaminado;
