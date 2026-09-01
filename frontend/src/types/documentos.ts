import type { WithTimestamps } from "./generics";

export type Archivo = WithTimestamps<{
    uuid: string;
    size: number;
    nombre: string;
    extension: string;
}>;

export type Documento = Archivo & {
    tipo: string;
};

export type Oficio = {
    folio: string;
    archivo: Archivo;
    verified_at: string | null;
};

export type Factura = {
    id: number;
    fecha_emision: string;
    archivo: Archivo;
};
