import type { TCatalogo } from "./generics";

type BaseTipo = TCatalogo;

type Base = {
    tipo: BaseTipo;
}

type Computadora = Base;
type ComputadoraTipo = BaseTipo;

export type {
    Computadora,
    ComputadoraTipo,
}
