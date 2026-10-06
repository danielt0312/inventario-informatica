import type { Includable, TCatalogo } from "../generics";

type Tipo = TCatalogo;
type Capacidad = TCatalogo;
type Velocidad = TCatalogo;
type IncludableVelocidad = Includable<Velocidad>;

type Base<TVelocidad extends IncludableVelocidad = IncludableVelocidad> = {
    tipo: Tipo;
    capacidad: Capacidad;
    velocidad: TVelocidad;
}

type Ram = Base;

export type {
    Ram,
    Tipo as RamTipo,
    Capacidad as RamCapacidad,
    Velocidad as RamVelocidad,
}
