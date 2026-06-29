import type { DictamenEstadoEnum } from "@/lib/constants";
import type { TCatalogo } from "./generics";
import type { Documento, Oficio } from "./documentos";
import type { Producto, ProductoCategoria, ProductoMarca, ProductoTipo } from "./productos";

export type DictamenEstado = {
    id: DictamenEstadoEnum;
    nombre: string;
};

export type AttributeProductoDictamenProducto<TProductoCategoria extends ProductoCategoria = ProductoCategoria, TProductoTipo extends ProductoTipo = ProductoTipo, TProductoMarca extends ProductoMarca = ProductoMarca, TProducto extends Producto = Producto> = {
    categoria: TProductoCategoria;
    tipo: TProductoTipo;
    marca: TProductoMarca | null;
    modelo: TProducto | null;
}

export type DictamenProducto<TAttributeProductoDictamenProducto extends AttributeProductoDictamenProducto = AttributeProductoDictamenProducto> = {
    id: number;
    cantidad: number;
    caracteristicas: string | null;
    empleado: TCatalogo;
    producto: TAttributeProductoDictamenProducto
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
    dictamen_productos: TDictamenProducto[];
};
