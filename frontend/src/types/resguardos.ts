import type { Articulo } from "./articulos";
import type { Adscripcion, Empleado } from "./externos";
import type { Includable } from "./generics";

type IncludableArticulo = Includable<Articulo>;

type ResguardoArticulo = {
    id: number;
    fecha_asignacion: string;
    fecha_cancelacion: string;
    articulo: IncludableArticulo;
}

type Resguardo = {
    id: number;
    fecha_actualizacion: string;
    fecha_cancelacion: string | null;
    empleado: Empleado;
    adscripcion: Adscripcion;
}

type DetailedResguardo = Resguardo & {
    articulos_resguardados: ResguardoArticulo[];
}

export type {
    Resguardo,
    ResguardoArticulo,
    DetailedResguardo
}
