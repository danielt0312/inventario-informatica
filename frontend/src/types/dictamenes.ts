import type { DictamenEstadoEnum } from "@/lib/constants";
import type { TCatalogo } from "./generics";
import type { Producto } from "./productos";
import type { Documento, Oficio } from "./documentos";

export type DictamenEstado = {
    id: DictamenEstadoEnum;
    nombre: string;
};

export type DictamenProducto = {
    cantidad: number;
    caracteristicas: string | null;
    empleado: TCatalogo;
    producto: Producto;
}

export type Dictamen = {
    uuid: string;
    adscripcion: TCatalogo;
    fecha_solicitud: string;
    estado: DictamenEstado
    documento: Documento | null;
    oficio: Oficio;
    productos: DictamenProducto[];
}
