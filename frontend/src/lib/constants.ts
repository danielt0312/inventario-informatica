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
    POR_DICTAMINAR: 1,
    REQUISITADO: 2,
    POR_SURTIR: 3,
    SURTIDO: 4,
    SURTIDO_PARCIAL: 5,
} as const;
export type DictamenEstadoEnum = (typeof DictamenEstadoEnum)[keyof typeof DictamenEstadoEnum];

export const FormValidationError = {
    REQUIRED: 'Este campo es requerido'
} as const;
export type FormValidationError = (typeof FormValidationError)[keyof typeof FormValidationError];
