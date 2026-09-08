import type { ResguardoEstadoEnum } from "@/lib/constants";
import type { Articulo } from "./articulos";
import type { Adscripcion, Empleado } from "./externos";
import type { Includable, TCatalogo } from "./generics";
import type { Archivo } from "./documentos";

type IncludableArticulo = Includable<Articulo>;

type BaseEstado<TEstado extends ResguardoEstadoEnum = ResguardoEstadoEnum> = TCatalogo<TEstado>

type ResguardoArticulo<TArticulo extends IncludableArticulo = IncludableArticulo> = {
    id: number;
    fecha_asignacion: string;
    fecha_cancelacion: string | null;
    articulo: TArticulo;
}

type Resguardo<TEstado extends BaseEstado = BaseEstado> = {
    uuid: string;
    archivo: Archivo;
    estado: TEstado;
    fecha_actualizacion: string;
    fecha_cancelacion: string | null;
    empleado: Empleado;
    adscripcion: Adscripcion;
}

type DetailedResguardo<TArticulo extends IncludableArticulo = IncludableArticulo, TResguardo extends Resguardo = Resguardo> = TResguardo & {
    articulos_resguardados: ResguardoArticulo<TArticulo>[];
}

type Estado = BaseEstado;

export type {
    Resguardo,
    Estado as ResguardoEstado,
    ResguardoArticulo,
    DetailedResguardo
}
