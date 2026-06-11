import type { DictamenEstadoEnum } from "@/lib/constants";
import type { Documento, Oficio } from "@/types/documentos";
import type { Producto } from "@/types/productos";
import type { TCatalogo } from "@/types/generics";

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
