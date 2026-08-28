import type { ArticuloEstadoEnum } from "@/lib/constants"
import type { Includable, TCatalogo, WithTimestamps } from "./generics"
import type { SurtidoDictamen, SurtidoParcialDictamen } from "./dictamenes";
import type { DetailedProducto } from "./productos";

type IncludableDictamen = Includable<SurtidoDictamen | SurtidoParcialDictamen>;

type BaseEstado<TEstado extends ArticuloEstadoEnum = ArticuloEstadoEnum> = TCatalogo<TEstado>;
type Attributes<TEstado extends BaseEstado = BaseEstado, TProducto extends DetailedProducto = DetailedProducto> = WithTimestamps<{
    uuid: string;
    estado: TEstado;
    numero_inventario: string;
    producto: TProducto;
}>;

type StrictAttributes = {
    cuenta_contable: string;
    es_inventariable: boolean;
    costo_unitario: number;
    numero_serie: string;
}

type LooseAttributes = Partial<StrictAttributes>;

type Base<TDictamen extends IncludableDictamen, TEstado extends BaseEstado = BaseEstado> = Attributes<TEstado> & (TDictamen extends null ? LooseAttributes : StrictAttributes) & {
    dictamen: TDictamen;
}

type ArticuloEstado = BaseEstado;
type Articulo = Base<null, ArticuloEstado>;

export type {
    Articulo,
    ArticuloEstado
}
