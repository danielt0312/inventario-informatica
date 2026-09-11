import type { Articulo as PrimitiveArticulo } from "../articulos";
import type { Includable, TCatalogo } from "../generics"
import type { ProductoWithMarca } from "../productos";

type Tipo = TCatalogo;
type Capacidad = TCatalogo;
type Interfaz = TCatalogo
type IncludableInterfaz = Includable<Interfaz>;
type Articulo = Omit<PrimitiveArticulo, 'producto'>;

type Base<TInterfaz extends IncludableInterfaz = IncludableInterfaz> = {
    tipo: Tipo;
    capacidad: Capacidad;
    interfaz: TInterfaz;
    producto: ProductoWithMarca;
}

type BaseArticulo<TArticulo extends Articulo = Articulo, TDisco extends Base = Base> = TDisco & {
    articulo: TArticulo;
}

type Disco = Base;
type ArticuloDisco = BaseArticulo;

export type {
    Disco,
    ArticuloDisco,
    Tipo as DiscoTipo,
    Capacidad as DiscoCapacidad,
    Interfaz as DiscoInterfaz,
}
