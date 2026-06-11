export type Archivo = {
    uuid: string;
    nombre: string | null;
};

export type Documento = Archivo & {
    tipo: string | undefined;
};

export type Oficio = Documento & {
    folio: string;
};

export type Factura = Documento & {
    fecha_emision: string;
};
