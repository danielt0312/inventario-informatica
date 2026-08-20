import type { ArticuloEstadoEnum } from "@/lib/constants"
import type { Includable, TCatalogo, WithTimestamps } from "./generics"
import type { SurtidoDictamenAdquisicion } from "./dictamenes";
import type { DetailedProducto } from "./productos";

type IncludableDictamenAdquisicion = Includable<SurtidoDictamenAdquisicion>;

type BaseEstado<TEstado extends ArticuloEstadoEnum = ArticuloEstadoEnum> = TCatalogo<TEstado>;
type Attributes<TEstado extends BaseEstado = BaseEstado, TProducto extends DetailedProducto = DetailedProducto> = WithTimestamps<{
    estado: TEstado;
    numero_inventario: string;
    producto: TProducto;
}>;

type StrictAttributes = {
    cuenta_contable: string;
    es_contable: boolean;
    costo_unitario: number;
    numero_serie: string;
}

type LooseAttributes = Partial<StrictAttributes>;

type DiscriminatedAttributes<TDictamenAdquisicion extends IncludableDictamenAdquisicion> = Attributes & (TDictamenAdquisicion extends null ? LooseAttributes : StrictAttributes) & {
    dictamen_adquisicion: TDictamenAdquisicion;
}

type Base<TDictamenAdquisicion extends IncludableDictamenAdquisicion> = DiscriminatedAttributes<TDictamenAdquisicion>;

type Articulo = Base<null>;
type ArticuloEstado = BaseEstado;

export type {
    Articulo,
    ArticuloEstado
}
