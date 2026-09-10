import type { Articulo as PrimitiveArticulo } from "../articulos";
import type { TCatalogo } from "../generics";
import type { ProductoWithMarca } from "../productos";

type Tipo = TCatalogo;
type Capacidad = TCatalogo;
type Articulo = Omit<PrimitiveArticulo, 'producto'>;

type Base<TProducto extends ProductoWithMarca = ProductoWithMarca> = {
    tipo: Tipo;
    capacidad: Capacidad;
    producto: TProducto;
}

type BaseArticulo<TArticulo extends Articulo = Articulo, TDisco extends Base = Base> = TDisco & {
    articulo: TArticulo;
}

type Ram = Base;
type ArticuloRam = BaseArticulo;

export type {
    Ram as Disco,
    ArticuloRam,
    Tipo as DiscoRam,
    Capacidad as DiscoCapacidad,
}
