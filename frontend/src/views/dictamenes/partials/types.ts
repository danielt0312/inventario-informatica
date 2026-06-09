import type { DictamenEstadoEnum } from "@/lib/constants";
import type { Documento, Oficio, Producto, TCatalogo } from "@/lib/types";

export interface DictamenEstado {
    id: DictamenEstadoEnum;
    nombre: string;
};

export interface DictamenProducto {
    id: number;
    cantidad: number;
    caracteristicas: string | null;
    empleado: TCatalogo;
    producto: Producto;
}

export interface Dictamen {
    id: number;
    uuid: string;
    adscripcion: TCatalogo;
    fecha_solicitud: Date;
    estado: DictamenEstado
    documento: Documento | null;
    oficio: Oficio;
    productos: DictamenProducto[];
}
