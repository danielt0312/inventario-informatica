import type { ArticuloEstadoEnum } from "@/lib/constants"
import type { Includable, TCatalogo, WithTimestamps } from "./generics"
import type { SurtidoDictamen, SurtidoParcialDictamen } from "./dictamenes";
import type { DetailedProducto } from "./productos";

type IncludableDictamen = Includable<SurtidoDictamen | SurtidoParcialDictamen> | undefined;

type BaseEstado<TEstado extends ArticuloEstadoEnum = ArticuloEstadoEnum> = TCatalogo<TEstado>;
type CoreAttributes<TEstado extends BaseEstado = BaseEstado, TProducto extends DetailedProducto = DetailedProducto> = WithTimestamps<{
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

type LooseAttributes = {
  [K in keyof StrictAttributes]: StrictAttributes[K] | null;
};

type AttributesDefiner<TDictamen extends IncludableDictamen> =
  TDictamen extends null | undefined
    ? (LooseAttributes & {
        es_resultado_esperado: boolean | null;
        observaciones: string | null;
        dictamen?: TDictamen;
      })
    : (StrictAttributes & {
        es_resultado_esperado: true;
        observaciones: string;
        dictamen: TDictamen;
      });

type Base<
  TDictamen extends IncludableDictamen,
  TProducto extends DetailedProducto = DetailedProducto,
  TEstado extends BaseEstado = BaseEstado
> = CoreAttributes<TEstado, TProducto> & AttributesDefiner<TDictamen>;

type ArticuloEstado = BaseEstado;
type Articulo = Base<IncludableDictamen, DetailedProducto, ArticuloEstado>;

export type {
    Articulo,
    ArticuloEstado
}
