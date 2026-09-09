import type { Articulo } from "../articulos";
import type { Includable, TCatalogo } from "../generics"

type Tipo = TCatalogo;
type Capacidad = TCatalogo;
type Interfaz = TCatalogo
type IncludableInterfaz = Includable<Interfaz>;

type BaseDisco<TInterfaz extends IncludableInterfaz = IncludableInterfaz> = {
    tipo: Tipo;
    capacidad: Capacidad;
    interfaz: TInterfaz;
}

type BaseArticuloDisco<TArticulo extends Articulo = Articulo, TDisco extends BaseDisco = BaseDisco> = {
    articulo: TArticulo;
    disco: TDisco;
}

type BaseArticuloComputadoraDisco<TArticuloComputadora extends Articulo = Articulo, TArticuloDisco extends BaseArticuloDisco = BaseArticuloDisco> = {
    computadora_articulo: TArticuloComputadora;
    disco_articulo: TArticuloDisco;
    es_principal: boolean;
    fecha_instalacion: string;
    fecha_desinstalacion: string;
}

type Disco = BaseDisco;
type ArticuloDisco = BaseArticuloDisco;
type ArticuloComputadoraDisco = BaseArticuloComputadoraDisco;

export type {
    Disco,
    ArticuloDisco,
    ArticuloComputadoraDisco,
    Tipo as DiscoTipo,
    Capacidad as DiscoCapacidad,
    Interfaz as DiscoInterfaz,
}
