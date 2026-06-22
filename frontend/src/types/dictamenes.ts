import type { DictamenEstadoEnum } from "@/lib/constants";
import type { TCatalogo } from "./generics";
import type { Producto, ProductoTipo } from "./productos";
import type { Documento, Oficio } from "./documentos";

export type DictamenEstado = {
    id: DictamenEstadoEnum;
    nombre: string;
};

export type DictamenProducto = {
    id: number;
    cantidad: number;
    caracteristicas: string | null;
}

export type DetailedDictamenProducto<TProducto extends Producto = Producto, TProductoTipo extends ProductoTipo = ProductoTipo> = DictamenProducto & {
    empleado: TCatalogo;
    producto: TProducto;
    producto_tipo: TProductoTipo;
}

export type Dictamen = {
    uuid: string;
    adscripcion: TCatalogo;
    fecha_solicitud: string;
    estado: DictamenEstado;
    documento: Documento | null;
    oficio: Oficio;
}

export type DetailedDictamen<TDictamenProducto extends DictamenProducto = DetailedDictamenProducto> = Dictamen & {
    productos: TDictamenProducto[];
}
