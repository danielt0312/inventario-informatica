import type { DICTAMEN_ESTADO_DICTAMINAR, DICTAMEN_ESTADO_INVENTARIAR, DICTAMEN_ESTADO_SURTIR, DictamenEstadoEnum, DictaminadoDictamenEstadoEnum } from "@/lib/constants";
import type { Includable, TCatalogo } from "./generics";
import type { Archivo, Oficio } from "./documentos";
import type { DetailedProducto, DetailedProductoTipo } from "./productos";
import type { Articulo } from "./articulos";
import type { OrdenCompra } from "./orden_compras";

type IncludableArticulo = Includable<Articulo>;
type IncludableOrdenCompra = Includable<OrdenCompra>;

type BaseEstado<T extends DictamenEstadoEnum = DictamenEstadoEnum> = TCatalogo<T>;
type Base<TEstado extends BaseEstado = BaseEstado> = {
    id: number;
    uuid: string;
    estado: TEstado;
    adscripcion: TCatalogo;
}
type BaseVersion = {
    numero_version: number;
    fecha_solicitud: string;
    // todo revisar el caso cuando sea null
    oficio: Oficio;
}
type BaseAdquisicion<TArticulo extends IncludableArticulo = IncludableArticulo> = {
    id: number;
    cantidad: number;
    empleado: TCatalogo;
    articulo: TArticulo;
}
type VersionActual<TVersion extends BaseVersion = BaseVersion> = {
    version_actual: TVersion;
}
type Adquisiciones<TAdquisicion extends BaseAdquisicion = BaseAdquisicion> = {
    adquisiciones: TAdquisicion[];
}
type VersionWithAdquisiciones<TVersion extends BaseVersion = BaseVersion, TAdquisiciones extends Adquisiciones = Adquisiciones> = TVersion & TAdquisiciones;
type VersionActualWithAdquisiciones<TVersionWithAdquisiciones extends VersionWithAdquisiciones = VersionWithAdquisiciones> = VersionActual<TVersionWithAdquisiciones>
// export type Versiones<TVersion extends BaseVersion> = {
//     versiones: TVersion[];
// }
// export type VersionesWithAdquisiciones<TVersionWithAdquisiciones extends VersionWithAdquisiciones = VersionWithAdquisiciones> = Versiones<TVersionWithAdquisiciones>;

type ActualBase<TDictamen extends Base = Base, TVersionActual extends VersionActual = VersionActual> = TDictamen & TVersionActual;
type DetailedBase<TDictamen extends Base = Base, TVersionActualWithAdquisiciones extends VersionActualWithAdquisiciones = VersionActualWithAdquisiciones> = ActualBase<TDictamen, TVersionActualWithAdquisiciones>;

// todo analizar como se quiere aplicar este export type en el feature
// si se quiere consultar las versiones una vez ya pasado la etapa de `INVENTARIAR`, i.e., `SURTIDO` | `SURTIDO_PARCIAL` | `SURTIDO_CON_OBSERVACIONES`
// o si desde el estado `DICTAMINAR` se quiere consultar todas las versiones
// contrario a lo anterior, entonces todas las versiones serian "dictaminado", i.e., `FullyDetailedDictaminadoDictamen`
// export type FullyDetailedBase<TDictamen extends Base = Base, TVersionesWithAdquisiciones extends VersionesWithAdquisiciones = VersionesWithAdquisiciones, TVersionActualWithAdquisiciones extends VersionActualWithAdquisiciones = VersionActualWithAdquisiciones> = DetailedBase<TDictamen & TVersionesWithAdquisiciones, TVersionActualWithAdquisiciones>

type Dictaminar = Base<BaseEstado<typeof DICTAMEN_ESTADO_DICTAMINAR>>;
type DictaminarAdquisicion = BaseAdquisicion & {
    producto_tipo: DetailedProductoTipo;
}
type DetailedDictaminar = DetailedBase<Dictaminar, VersionActualWithAdquisiciones<VersionWithAdquisiciones<BaseVersion, Adquisiciones<DictaminarAdquisicion>>>>;

type DictaminadoEstado<TEstado extends DictaminadoDictamenEstadoEnum = DictaminadoDictamenEstadoEnum> = BaseEstado<TEstado>;
type BaseDictaminado<TDictaminadoEstado extends DictaminadoEstado = DictaminadoEstado> = Base<TDictaminadoEstado>;
type Dictaminado = BaseDictaminado;
type DictaminadoAdquisicion = BaseAdquisicion & {
    producto: DetailedProducto;
    caracteristicas: string;
}
type DictaminadoVersion = BaseVersion & {
    archivo: Archivo;
}
type BaseDetailedDictaminado<TDictaminado extends BaseDictaminado = BaseDictaminado> = DetailedBase<TDictaminado, VersionActualWithAdquisiciones<VersionWithAdquisiciones<DictaminadoVersion, Adquisiciones<DictaminadoAdquisicion>>>>;

type DetailedDictaminado = BaseDetailedDictaminado;

type SurtirEstado = DictaminadoEstado<typeof DICTAMEN_ESTADO_SURTIR>;
type Surtir = BaseDictaminado<SurtirEstado>;
type DetailedSurtir = DetailedBase<Surtir, VersionActualWithAdquisiciones<VersionWithAdquisiciones<DictaminadoVersion, Adquisiciones<DictaminadoAdquisicion>>>>;

type InventariarEstado = DictaminadoEstado<typeof DICTAMEN_ESTADO_INVENTARIAR>;
type BaseInventariar<TOrdenCompra extends IncludableOrdenCompra = IncludableOrdenCompra> = BaseDictaminado<InventariarEstado> & {
    orden_compra: TOrdenCompra;
};
type Inventariar = BaseInventariar;
type InventariarWithOrdenCompra = BaseInventariar<OrdenCompra>;
type InventariarAdquisicion = DictaminadoAdquisicion & {
    cantidad_surtida: number;
    cantidad_restante: number;
}
type BaseDetailedInventariar<TInventariar extends BaseInventariar = BaseInventariar> = DetailedBase<TInventariar, VersionActualWithAdquisiciones<VersionWithAdquisiciones<DictaminadoVersion, Adquisiciones<InventariarAdquisicion>>>>;
type DetailedInventariar = BaseDetailedInventariar;

type Dictamen =
    | Dictaminar
    | Dictaminado
    | Inventariar;

type DetailedDictamen =
    | DetailedDictaminar
    | DetailedDictaminado
    | DetailedInventariar;

type DictamenAdquisicionWithArticulo = BaseAdquisicion<Articulo>;

type DictamenAdquisicion =
    | DictaminarAdquisicion
    | DictaminadoAdquisicion
    | DictamenAdquisicionWithArticulo
    | InventariarAdquisicion;

type DictamenEstado = BaseEstado;

export type {
    BaseEstado as BaseDictamenEstado,
    Dictaminar as DictaminarDictamen,
    DetailedDictaminar as DetailedDictaminarDictamen,
    BaseDictaminado as DictaminadoDictamen,
    BaseDetailedDictaminado as DetailedDictaminadoDictamen,
    Surtir as SurtirDictamen,
    DetailedSurtir as DetailedSurtirDictamen,
    BaseInventariar as InventariarDictamen,
    BaseDetailedInventariar as DetailedInventariarDictamen,
    InventariarAdquisicion as InventariarAdquisicionDictamen,
    InventariarWithOrdenCompra as InventariarDictamenWithOrdenCompra,
    Dictamen,
    DictamenEstado,
    DetailedDictamen,
    DictamenAdquisicion,
    DictamenAdquisicionWithArticulo,
}
