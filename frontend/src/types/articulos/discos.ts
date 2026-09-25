import type { Includable, TCatalogo } from "../generics"
import type { ProductoVarianteSpec } from "../productos";

type Tipo = TCatalogo;
type Capacidad = TCatalogo;
type Interfaz = TCatalogo
type FactorForma = TCatalogo

type IncludableInterfaz = Includable<Interfaz>;
type IncludableFactorForma = Includable<FactorForma>;

type Base<TInterfaz extends IncludableInterfaz = IncludableInterfaz, TFactorForma extends IncludableFactorForma = IncludableFactorForma> = {
    tipo: Tipo;
    capacidad: Capacidad;
    interfaz: TInterfaz;
    factor_forma: TFactorForma;
}

type Spec<TDisco extends Base = Base> = ProductoVarianteSpec & {
    disco: TDisco;
}

type Disco = Spec;

export type {
    Disco,
    Tipo as DiscoTipo,
    Capacidad as DiscoCapacidad,
    Interfaz as DiscoInterfaz,
    FactorForma as DiscoFactorForma,
}
