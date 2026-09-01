import type { DictamenEstadoEnum } from "@/lib/constants";
import type { Includable, TCatalogo } from "./generics";
import type { Archivo, Oficio } from "./documentos";
import type { DetailedProducto, DetailedProductoTipo } from "./productos";
import type { Articulo } from "./articulos";
import type { OrdenCompra } from "./orden_compras";

type IncludableArticulo = Includable<Articulo>;
type IncludableOrdenCompra = Includable<OrdenCompra>;
type IncludableOficio = Includable<Oficio>;

type BaseEstado<TEstado extends DictamenEstadoEnum = DictamenEstadoEnum> = TCatalogo<TEstado>;
type Base<TEstado extends BaseEstado = BaseEstado, TOficio extends IncludableOficio = IncludableOficio> = {
    id: number;
    uuid: string;
    estado: TEstado;
    adscripcion: TCatalogo;
    oficio: TOficio;
}
type BaseVersion = {
    numero_version: number;
    fecha_solicitud: string;
}
type BaseAdquisicion<TArticulo extends IncludableArticulo = IncludableArticulo> = {
    id: number;
    cantidad: number;
    empleado: TCatalogo;
    articulo: TArticulo;
}
type BaseOrdenCompra<TOrdenCompra extends IncludableOrdenCompra = IncludableOrdenCompra> = {
    orden_compra: TOrdenCompra;
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

type DictaminarEstado = BaseEstado<typeof DictamenEstadoEnum.DICTAMINAR>;
type Dictaminar = Base<DictaminarEstado>;
type DictaminarAdquisicion = BaseAdquisicion & {
    producto_tipo: DetailedProductoTipo;
}
type DictaminarVersion = BaseVersion;
type DetailedDictaminar = DetailedBase<Dictaminar, VersionActualWithAdquisiciones<VersionWithAdquisiciones<DictaminarVersion, Adquisiciones<DictaminarAdquisicion>>>>;

type BaseDictaminadoAdquisicion = BaseAdquisicion & {
    producto: DetailedProducto;
    especificaciones_tecnicas: string;
}
type BaseDictaminadoVersion = BaseVersion & {
    archivo: Archivo;
}

type PendienteAcuseEstado = BaseEstado<typeof DictamenEstadoEnum.PENDIENTE_ACUSE>;
type PendienteAcuse = Base<PendienteAcuseEstado>;
type PendienteAcuseAdquisicion = BaseDictaminadoAdquisicion
type PendienteAcuseVersion = BaseDictaminadoVersion;
type PendienteAcuseEvidenciar = DetailedBase<PendienteAcuse, VersionActualWithAdquisiciones<VersionWithAdquisiciones<PendienteAcuseVersion, Adquisiciones<PendienteAcuseAdquisicion>>>>;

type PorSurtirEstado = BaseEstado<typeof DictamenEstadoEnum.POR_SURTIR>;
type PorSurtir = Base<PorSurtirEstado>;
type PorSurtirAdquisicion = BaseDictaminadoAdquisicion;
type PorSurtirVersion = BaseDictaminadoVersion;
type DetailedPorSurtir = DetailedBase<PorSurtir, VersionActualWithAdquisiciones<VersionWithAdquisiciones<PorSurtirVersion,Adquisiciones<PorSurtirAdquisicion>>>>;

type InventariarEstado = BaseEstado<typeof DictamenEstadoEnum.INVENTARIAR>;
type Inventariar = Base<InventariarEstado> & BaseOrdenCompra;
type InventariarAdquisicion = BaseDictaminadoAdquisicion & {
    cantidad_restante: number;
    cantidad_surtida: number;
}
type InventariarVersion = BaseDictaminadoVersion;
type DetailedInventariar = DetailedBase<Inventariar, VersionActualWithAdquisiciones<VersionWithAdquisiciones<InventariarVersion, Adquisiciones<InventariarAdquisicion>>>>;

type BaseTieneObservacionesAttribute<TValue extends boolean | null> = {
    tiene_observaciones: TValue;
}

type SurtidoEstado = BaseEstado<typeof DictamenEstadoEnum.SURTIDO>;
type Surtido = Base<SurtidoEstado> & BaseOrdenCompra<OrdenCompra> & BaseTieneObservacionesAttribute<boolean>;
type SurtidoAdquisicion = BaseDictaminadoAdquisicion;
type SurtidoVersion = BaseDictaminadoVersion;
type DetailedSurtido = DetailedBase<Surtido, VersionActualWithAdquisiciones<VersionWithAdquisiciones<SurtidoVersion, Adquisiciones<SurtidoAdquisicion>>>>;

type SurtidoParcialEstado = BaseEstado<typeof DictamenEstadoEnum.SURTIDO_PARCIAL>;
type SurtidoParcial = Base<SurtidoParcialEstado> & BaseOrdenCompra<OrdenCompra> & BaseTieneObservacionesAttribute<boolean | null>;
type SurtidoParcialAdquisicion = BaseDictaminadoAdquisicion;
type SurtidoParcialVersion = BaseDictaminadoVersion;
type DetailedSurtidoParcial = DetailedBase<SurtidoParcial, VersionActualWithAdquisiciones<VersionWithAdquisiciones<SurtidoParcialVersion, Adquisiciones<SurtidoParcialAdquisicion>>>>;

type Dictamen =
    | Dictaminar
    | PendienteAcuse
    | PorSurtir
    | Inventariar
    | Surtido
    | SurtidoParcial;

type DetailedDictamen =
    | DetailedDictaminar
    | PendienteAcuseEvidenciar
    | DetailedPorSurtir
    | DetailedInventariar
    | DetailedSurtido
    | DetailedSurtidoParcial;

type DictamenAdquisicion =
    | DictaminarAdquisicion
    | PendienteAcuseAdquisicion
    | PorSurtirAdquisicion
    | InventariarAdquisicion
    | SurtidoAdquisicion
    | SurtidoParcialAdquisicion;

type DictamenVersion =
    | DictaminarVersion
    | PendienteAcuseVersion
    | PorSurtirVersion
    | InventariarVersion
    | SurtidoVersion
    | SurtidoParcialVersion;

type InventariarWithOrdenCompra = Base<InventariarEstado> & BaseOrdenCompra<OrdenCompra>;
type VersionWithArchivo = DictamenVersion & BaseDictaminadoVersion;

export type {
    Dictamen,
    DetailedDictamen,
    DictamenAdquisicion,
    DictamenVersion,
    Dictaminar as DictaminarDictamen,
    PendienteAcuse as PendienteAcuseDictamen,
    PorSurtir as PorSurtirDictamen,
    Inventariar as InventariarDictamen,
    Surtido as SurtidoDictamen,
    SurtidoParcial as SurtidoParcialDictamen,
    DetailedDictaminar as DetailedDictaminarDictamen,
    DetailedPorSurtir as DetailedPorSurtirDictamen,
    PendienteAcuseEvidenciar as DetailedPendienteAcuseDictamen,
    DetailedInventariar as DetailedInventariarDictamen,
    DetailedSurtido as DetailedSurtidoDictamen,
    DetailedSurtidoParcial as DetailedSurtidoParcialDictamen,
    BaseDictaminadoVersion as DictaminadoVersionDictamen,
    BaseEstado as DictamenEstado,
    InventariarWithOrdenCompra as InventariarDictamenWithOrdenCompra,
    InventariarAdquisicion as InventariarDictamenAdquisicion,
    VersionWithArchivo as DictamenVersionWithArchivo,
    SurtidoAdquisicion as SurtidoDictamenAdquisicion
}
