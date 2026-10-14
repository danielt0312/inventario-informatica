import type { ArticuloEstadoEnum } from "@/lib/constants"
import type { Includable, TCatalogo } from "./generics"
import type { DictamenSurtimiento } from "./dictamenes";
import type { ProductoVariante } from "./productos";

type IncludableSurtimiento = Includable<DictamenSurtimiento>;

type BaseUbicacion = {
    area: TCatalogo; // todo cambiar por definicion real
    fecha_inicio: string;
    fecha_fin: string | null;
}

type IncludableUbicacion = Includable<BaseUbicacion>;

type BaseEstado<TEstado extends ArticuloEstadoEnum = ArticuloEstadoEnum> = TCatalogo<TEstado>;
type BaseAttr = {
    uuid: string;
    numero_inventario: string;
    cuenta_contable: string | null;
    es_inventariable: boolean | null;
    costo_unitario: number | null;
    numero_serie: string | null;
}
type Base<TEstado extends BaseEstado = BaseEstado, TProductoVariante extends ProductoVariante = ProductoVariante> = BaseAttr & {
    estado: TEstado;
    producto_variante: TProductoVariante;
}
type WithSurtimiento<TSurtimiento extends IncludableSurtimiento = IncludableSurtimiento> = {
    surtimiento: TSurtimiento;
}

type Articulo = Base;
type ArticuloEstado = BaseEstado;
type DetailedArticulo = Base & WithSurtimiento;

export type {
    Articulo,
    ArticuloEstado,
    DetailedArticulo,
    BaseUbicacion as ArticuloUbicacion,
    IncludableSurtimiento as ArticuloIncludableSurtimiento,
    IncludableUbicacion as ArticuloIncludableUbicacion
}
