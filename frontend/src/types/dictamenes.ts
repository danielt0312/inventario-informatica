import type { DictamenEstadoEnum } from "@/lib/constants";
import type { TCatalogo } from "./generics";
import type { Documento, Oficio } from "./documentos";
import type { Producto, ProductoTipo } from "./productos";

export type DictamenEstado = {
    id: DictamenEstadoEnum;
    nombre: string;
};

export type DictamenProducto<TProductoTipo extends ProductoTipo = ProductoTipo, TProducto extends Producto = Producto> = {
    id: number;
    cantidad: number;
    caracteristicas: string | null;
    empleado: TCatalogo;
    producto_tipo: TProductoTipo;
    producto: TProducto | null;
}

export type Dictamen = {
    id: number;
    uuid: string;
    adscripcion: TCatalogo;
    fecha_solicitud: string;
    estado: DictamenEstado;
    oficio: Oficio;
    documento: Documento | null;
}

export type DictamenWithDictamenProductos<TDictamenProducto extends DictamenProducto = DictamenProducto> = Dictamen & {
    productos: TDictamenProducto[];
};
