import type { Articulo } from "./articulos";
import type { Adscripcion, Empleado } from "./externos";
import type { Includable } from "./generics";

type IncludableArticulo = Includable<Articulo>;

type ResguardoArticulo<TArticulo extends IncludableArticulo = IncludableArticulo> = {
    id: number;
    fecha_asignacion: string;
    fecha_cancelacion: string | null;
    articulo: TArticulo;
}

type Resguardo = {
    id: number;
    fecha_actualizacion: string;
    fecha_cancelacion: string | null;
    empleado: Empleado;
    adscripcion: Adscripcion;
}

type DetailedResguardo<TArticulo extends IncludableArticulo = IncludableArticulo> = Resguardo & {
    articulos_resguardados: ResguardoArticulo<TArticulo>[];
}

export type {
    Resguardo,
    ResguardoArticulo,
    DetailedResguardo
}
