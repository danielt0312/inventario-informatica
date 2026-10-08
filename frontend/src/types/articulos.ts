import type { ArticuloEstadoEnum } from "@/lib/constants"
import type { Includable, TCatalogo, WithTimestamps } from "./generics"
import type { DictamenSurtimiento } from "./dictamenes";
import type { ProductoVariante } from "./productos";

type IncludableSurtimiento = Includable<DictamenSurtimiento>;

type BaseEstado<TEstado extends ArticuloEstadoEnum = ArticuloEstadoEnum> = TCatalogo<TEstado>;
type BaseAttr<TEstado extends BaseEstado = BaseEstado, TProductoVariante extends ProductoVariante = ProductoVariante> = WithTimestamps<{
    uuid: string;
    estado: TEstado;
    numero_inventario: string;
    producto_variante: TProductoVariante;
    cuenta_contable: string | null;
    es_inventariable: boolean | null;
    costo_unitario: number | null;
    numero_serie: string | null;
}>;
type WithSurtimiento<TSurtimiento extends IncludableSurtimiento = IncludableSurtimiento> = {
    surtimiento: TSurtimiento;
}
type BaseWithSurtimiento<TBase extends BaseAttr = BaseAttr, TWithSurtimiento extends WithSurtimiento = WithSurtimiento> = TBase & TWithSurtimiento;

type Articulo = BaseAttr;
type ArticuloEstado = BaseEstado;
type DetailedArticulo = BaseWithSurtimiento;

export type {
    Articulo,
    ArticuloEstado,
    DetailedArticulo
}
