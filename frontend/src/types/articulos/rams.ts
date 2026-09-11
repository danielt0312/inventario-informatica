import type { Articulo as PrimitiveArticulo } from "../articulos";
import type { Includable, TCatalogo } from "../generics";
import type { ProductoWithMarca } from "../productos";

type Tipo = TCatalogo;
type Capacidad = TCatalogo;
type Velocidad = TCatalogo;
type IncludableVelocidad = Includable<Velocidad>;
type Articulo = Omit<PrimitiveArticulo, 'producto'>;

type Base<TFrecuencia extends IncludableVelocidad = IncludableVelocidad> = {
    tipo: Tipo;
    capacidad: Capacidad;
    frecuencia: TFrecuencia;
    producto: ProductoWithMarca;
}

type BaseArticulo<TArticulo extends Articulo = Articulo, TDisco extends Base = Base> = TDisco & {
    articulo: TArticulo;
}

type Ram = Base;
type ArticuloRam = BaseArticulo;

export type {
    Ram,
    ArticuloRam,
    Tipo as RamTipo,
    Capacidad as RamCapacidad,
    Velocidad as RamVelocidad,
}
