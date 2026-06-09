export const DocumentoTipoEnum = {
    FACTURA: 1,
    OFICIO: 2,
    ADQUISICION: 3,
    RESGUARDO: 4,
    PRESTAMO: 5,
    DICTAMEN: 6
} as const;
export type DocumentoTipoEnum = (typeof DocumentoTipoEnum)[keyof typeof DocumentoTipoEnum];

export const ProductoCategoriaEnum = {
    COMPUTADORA: 1,
    DISPOSITIVO_ALMACENAMIENTO: 2,
    MEMORIA_ACCESO_ALEATORIO: 3,
} as const;
export type ProductoCategoriaEnum = (typeof ProductoCategoriaEnum)[keyof typeof ProductoCategoriaEnum];

export const DictamenEstadoEnum = {
    DICTAMINAR: 1,
    EVIDENCIAR: 2,
    SURTIR: 3,
    INVENTARIAR: 4,
    SURTIDO: 5,
    SURTIDO_PARCIAL: 6,
} as const;
export type DictamenEstadoEnum = (typeof DictamenEstadoEnum)[keyof typeof DictamenEstadoEnum];

