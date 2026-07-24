import type { Archivo } from "./documentos";
import type { TCatalogo } from "./generics";

export type Proveedor = TCatalogo;

export type OrdenCompra = {
    id: number;
    fecha_solicitud: string;
    numero_orden: string;
    proveedor: Proveedor;
    archivo: Archivo;
}
