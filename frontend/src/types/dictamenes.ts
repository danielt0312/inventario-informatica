import type { DictamenEstadoEnum } from "@/lib/constants";
import type { Includable, TCatalogo } from "./generics";
import type { Archivo, Oficio } from "./documentos";
import type { Articulo } from "./articulos";
import type { OrdenCompra } from "./orden_compras";
import type { DictamenBorradorProductoVarianteFields } from "@/components/features/dictamenes/crear/form-schema";
import type { ProductoVariante } from "./productos";

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
    detalle_solicitud: string | null;
    caracteristicas_adicionales: string | null;
}
type BaseSurtimiento =
    | { es_resultado_esperado: true; observaciones: string }
    | { es_resultado_esperado: false; observaciones: string | undefined }
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

type PorDictaminarEstado = BaseEstado<typeof DictamenEstadoEnum.PorDictaminar>;
type PorDictaminar = Base<PorDictaminarEstado>;
type PorDictaminarAdquisicion = BaseAdquisicion & {
    borrador_producto_variante: DictamenBorradorProductoVarianteFields;
};
type PorDictaminarVersion = BaseVersion;
type DetailedPorDictaminar = DetailedBase<PorDictaminar, VersionActualWithAdquisiciones<VersionWithAdquisiciones<PorDictaminarVersion, Adquisiciones<PorDictaminarAdquisicion>>>>;

type BaseDictaminadoAdquisicion = BaseAdquisicion & {
    producto_variante: ProductoVariante;
    descripcion: string;
}
type BaseDictaminadoVersion = BaseVersion & {
    archivo: Archivo;
}

type PendienteAcuseEstado = BaseEstado<typeof DictamenEstadoEnum.PendienteAcuse>;
type PendienteAcuse = Base<PendienteAcuseEstado>;
type PendienteAcuseAdquisicion = BaseDictaminadoAdquisicion
type PendienteAcuseVersion = BaseDictaminadoVersion;
type PendienteAcuseEvidenciar = DetailedBase<PendienteAcuse, VersionActualWithAdquisiciones<VersionWithAdquisiciones<PendienteAcuseVersion, Adquisiciones<PendienteAcuseAdquisicion>>>>;

type PorSurtirEstado = BaseEstado<typeof DictamenEstadoEnum.PorSurtir>;
type PorSurtir = Base<PorSurtirEstado>;
type PorSurtirAdquisicion = BaseDictaminadoAdquisicion;
type PorSurtirVersion = BaseDictaminadoVersion;
type DetailedPorSurtir = DetailedBase<PorSurtir, VersionActualWithAdquisiciones<VersionWithAdquisiciones<PorSurtirVersion, Adquisiciones<PorSurtirAdquisicion>>>>;

type PorInventariarEstado = BaseEstado<typeof DictamenEstadoEnum.PorInventariar>;
type PorInventariar = Base<PorInventariarEstado> & BaseOrdenCompra;
type PorInventariarAdquisicion = BaseDictaminadoAdquisicion & {
    cantidad_restante: number;
    cantidad_surtida: number;
}
type PorInventariarVersion = BaseDictaminadoVersion;
type DetailedPorInventariar = DetailedBase<PorInventariar, VersionActualWithAdquisiciones<VersionWithAdquisiciones<PorInventariarVersion, Adquisiciones<PorInventariarAdquisicion>>>>;

type BaseTieneObservacionesAttribute<TValue extends boolean | null> = {
    tiene_observaciones: TValue;
}

type SurtidoEstado = BaseEstado<typeof DictamenEstadoEnum.Surtido>;
type Surtido = Base<SurtidoEstado> & BaseOrdenCompra<OrdenCompra> & BaseTieneObservacionesAttribute<boolean>;
type SurtidoAdquisicion = BaseDictaminadoAdquisicion;
type SurtidoVersion = BaseDictaminadoVersion;
type DetailedSurtido = DetailedBase<Surtido, VersionActualWithAdquisiciones<VersionWithAdquisiciones<SurtidoVersion, Adquisiciones<SurtidoAdquisicion>>>>;

type SurtidoParcialEstado = BaseEstado<typeof DictamenEstadoEnum.SurtidoParcial>;
type SurtidoParcial = Base<SurtidoParcialEstado> & BaseOrdenCompra<OrdenCompra> & BaseTieneObservacionesAttribute<boolean | null>;
type SurtidoParcialAdquisicion = BaseDictaminadoAdquisicion;
type SurtidoParcialVersion = BaseDictaminadoVersion;
type DetailedSurtidoParcial = DetailedBase<SurtidoParcial, VersionActualWithAdquisiciones<VersionWithAdquisiciones<SurtidoParcialVersion, Adquisiciones<SurtidoParcialAdquisicion>>>>;

type Dictamen =
    | PorDictaminar
    | PendienteAcuse
    | PorSurtir
    | PorInventariar
    | Surtido
    | SurtidoParcial;

type DetailedDictamen =
    | DetailedPorDictaminar
    | PendienteAcuseEvidenciar
    | DetailedPorSurtir
    | DetailedPorInventariar
    | DetailedSurtido
    | DetailedSurtidoParcial;

type DictamenAdquisicion =
    | PorDictaminarAdquisicion
    | PendienteAcuseAdquisicion
    | PorSurtirAdquisicion
    | PorInventariarAdquisicion
    | SurtidoAdquisicion
    | SurtidoParcialAdquisicion;

type DictamenVersion =
    | PorDictaminarVersion
    | PendienteAcuseVersion
    | PorSurtirVersion
    | PorInventariarVersion
    | SurtidoVersion
    | SurtidoParcialVersion;

type InventariarWithOrdenCompra = Base<PorInventariarEstado> & BaseOrdenCompra<OrdenCompra>;
type VersionWithArchivo = DictamenVersion & BaseDictaminadoVersion;
type Surtimiento = BaseSurtimiento;

export type {
    Dictamen,
    DetailedDictamen,
    DictamenAdquisicion,
    DictamenVersion,
    PorDictaminar as PorDictaminarDictamen,
    PendienteAcuse as PendienteAcuseDictamen,
    PorSurtir as PorSurtirDictamen,
    PorInventariar as PorInventariarDictamen,
    Surtido as SurtidoDictamen,
    SurtidoParcial as SurtidoParcialDictamen,
    DetailedPorDictaminar as DetailedPorDictaminarDictamen,
    DetailedPorSurtir as DetailedPorSurtirDictamen,
    PendienteAcuseEvidenciar as DetailedPendienteAcuseDictamen,
    DetailedPorInventariar as DetailedPorInventariarDictamen,
    DetailedSurtido as DetailedSurtidoDictamen,
    DetailedSurtidoParcial as DetailedSurtidoParcialDictamen,
    BaseDictaminadoVersion as DictaminadoVersionDictamen,
    BaseEstado as DictamenEstado,
    InventariarWithOrdenCompra as PorInventariarDictamenWithOrdenCompra,
    PorInventariarAdquisicion as PorInventariarDictamenAdquisicion,
    VersionWithArchivo as DictamenVersionWithArchivo,
    SurtidoAdquisicion as SurtidoDictamenAdquisicion,
    Surtimiento as DictamenSurtimiento,
}
