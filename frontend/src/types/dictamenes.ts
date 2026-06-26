import type { DictamenEstadoEnum } from "@/lib/constants";
import type { TCatalogo } from "./generics";
import type { Documento, Oficio } from "./documentos";
import type { Producto, ProductoTipo } from "./productos";

export type DictamenEstado = {
    id: DictamenEstadoEnum;
    nombre: string;
};

export type DictamenProducto<TProducto extends Producto = Producto, TProductoTipo extends ProductoTipo = ProductoTipo> = {
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

export type DictamenWithDictamenProductos<TDictamen extends Dictamen = Dictamen, TDictamenProducto extends DictamenProducto = DictamenProducto> = TDictamen & {
    productos: TDictamenProducto[];
};
