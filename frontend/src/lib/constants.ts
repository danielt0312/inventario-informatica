export const ArticuloEstadoEnum = {
    Activo: 1,
    Baja: 2,
    BajaPreventiva: 3,
}
export type ArticuloEstadoEnum = (typeof ArticuloEstadoEnum)[keyof typeof ArticuloEstadoEnum];

export const DocumentoTipoEnum = {
    Oficio: 1,
    DictamenVersion: 2,
    Factura: 3,
    OrdenCompra: 4,
    Resguardo: 5,
} as const;
export type DocumentoTipoEnum = (typeof DocumentoTipoEnum)[keyof typeof DocumentoTipoEnum];

export const DictamenEstadoEnum = {
    Dictaminar: 1,
    PendienteAcuse: 2,
    Surtir: 3,
    Inventariar: 4,
    Surtido: 5,
    SurtidoParcial: 6
} as const;
export type DictamenEstadoEnum = (typeof DictamenEstadoEnum)[keyof typeof DictamenEstadoEnum];

const { Dictaminar, ...DictaminadoDictamenEstadoEnum } = DictamenEstadoEnum;

export { DictaminadoDictamenEstadoEnum };
export type DictaminadoDictamenEstadoEnum = (typeof DictaminadoDictamenEstadoEnum)[keyof typeof DictaminadoDictamenEstadoEnum];

export const ProductoCategoriaEnum = {
    Computadora: 1,
    DispositivoAlmacenamiento: 2,
    Telefonia: 3,
    Redes: 4,
    Herramienta: 6,
    Audio: 7,
    CamaraVideoSonido: 8,
    Impresora: 10,
    Periferico: 11,
    Electrico: 12,
    Escaner: 13,
} as const;
export type ProductoCategoriaEnum = (typeof ProductoCategoriaEnum)[keyof typeof ProductoCategoriaEnum];

export const ProductoTipoEnum = {
    Computadora: 1,
    Tablet: 2,
    Disco: 3,
    Ram: 4,
    Telefono: 5,
    AccessPoint: 6,
    Antena: 7,
    Firewall: 8,
    Modem: 9,
    PanelParcheo: 10,
    Rack: 11,
    Router: 12,
    Switch: 13,
    Adaptador: 14,
    ModuloReceptor: 15,
    ApuntadorOptico: 16,
    CajaConectividad: 17,
    LectorCodigos: 18,
    RelojChecador: 19,
    Bocina: 20,
    Consola: 21,
    Microfono: 22,
    Camara: 23,
    Concentrador: 24,
    PantallaRetractil: 25,
    Proyector: 26,
    BarraVideo: 27,
    Impresora: 28,
    Plotter: 29,
    Monitor: 30,
    DiscoOptico: 31,
    Teclado: 32,
    Mouse: 33,
    ModuloBateria: 34,
    Ups: 35,
    Escaner: 36,
    Procesador: 37,
    Licencia: 38,
} as const;
export type ProductoTipoEnum = (typeof ProductoTipoEnum)[keyof typeof ProductoTipoEnum];

const {
    Computadora,
    Disco,
    Ram,
    Camara,
    Licencia,
    ...ProductoTipoGenericos
} = ProductoTipoEnum;

export const ProductoTipoSpec = {
    Computadora,
    Disco,
    Ram,
    Camara,
    Licencia
}
export type ProductoTipoSpec = (typeof ProductoTipoSpec)[keyof typeof ProductoTipoSpec];

export { ProductoTipoGenericos }
export type ProductoTipoGenericos = (typeof ProductoTipoGenericos)[keyof typeof ProductoTipoGenericos];

export const ProductoTipoProductoCategoriaMap: Record<ProductoTipoEnum, ProductoCategoriaEnum> = {
    [ProductoTipoEnum.Computadora]: ProductoCategoriaEnum.Computadora,
    [ProductoTipoEnum.Tablet]: ProductoCategoriaEnum.Computadora,
    [ProductoTipoEnum.Procesador]: ProductoCategoriaEnum.Computadora,
    [ProductoTipoEnum.Ram]: ProductoCategoriaEnum.Computadora,
    [ProductoTipoEnum.Licencia]: ProductoCategoriaEnum.Computadora,
    [ProductoTipoEnum.Disco]: ProductoCategoriaEnum.DispositivoAlmacenamiento,
    [ProductoTipoEnum.Telefono]: ProductoCategoriaEnum.Telefonia,
    [ProductoTipoEnum.AccessPoint]: ProductoCategoriaEnum.Redes,
    [ProductoTipoEnum.Antena]: ProductoCategoriaEnum.Redes,
    [ProductoTipoEnum.Firewall]: ProductoCategoriaEnum.Redes,
    [ProductoTipoEnum.Modem]: ProductoCategoriaEnum.Redes,
    [ProductoTipoEnum.PanelParcheo]: ProductoCategoriaEnum.Redes,
    [ProductoTipoEnum.Rack]: ProductoCategoriaEnum.Redes,
    [ProductoTipoEnum.Router]: ProductoCategoriaEnum.Redes,
    [ProductoTipoEnum.Switch]: ProductoCategoriaEnum.Redes,
    [ProductoTipoEnum.Adaptador]: ProductoCategoriaEnum.Redes,
    [ProductoTipoEnum.ModuloReceptor]: ProductoCategoriaEnum.Redes,
    [ProductoTipoEnum.ApuntadorOptico]: ProductoCategoriaEnum.Herramienta,
    [ProductoTipoEnum.CajaConectividad]: ProductoCategoriaEnum.Herramienta,
    [ProductoTipoEnum.LectorCodigos]: ProductoCategoriaEnum.Herramienta,
    [ProductoTipoEnum.RelojChecador]: ProductoCategoriaEnum.Herramienta,
    [ProductoTipoEnum.Bocina]: ProductoCategoriaEnum.Audio,
    [ProductoTipoEnum.Consola]: ProductoCategoriaEnum.Audio,
    [ProductoTipoEnum.Microfono]: ProductoCategoriaEnum.Audio,
    [ProductoTipoEnum.Camara]: ProductoCategoriaEnum.CamaraVideoSonido,
    [ProductoTipoEnum.Concentrador]: ProductoCategoriaEnum.CamaraVideoSonido,
    [ProductoTipoEnum.PantallaRetractil]: ProductoCategoriaEnum.CamaraVideoSonido,
    [ProductoTipoEnum.Proyector]: ProductoCategoriaEnum.CamaraVideoSonido,
    [ProductoTipoEnum.BarraVideo]: ProductoCategoriaEnum.CamaraVideoSonido,
    [ProductoTipoEnum.Impresora]: ProductoCategoriaEnum.Impresora,
    [ProductoTipoEnum.Plotter]: ProductoCategoriaEnum.Impresora,
    [ProductoTipoEnum.Monitor]: ProductoCategoriaEnum.Periferico,
    [ProductoTipoEnum.DiscoOptico]: ProductoCategoriaEnum.Periferico,
    [ProductoTipoEnum.Teclado]: ProductoCategoriaEnum.Periferico,
    [ProductoTipoEnum.Mouse]: ProductoCategoriaEnum.Periferico,
    [ProductoTipoEnum.ModuloBateria]: ProductoCategoriaEnum.Electrico,
    [ProductoTipoEnum.Ups]: ProductoCategoriaEnum.Electrico,
    [ProductoTipoEnum.Escaner]: ProductoCategoriaEnum.Escaner,
}

export const dictamenAdquisicionProductoTiposPuedenRequerirNumeroInventario: ProductoTipoEnum[] = [
    ProductoTipoEnum.Disco,
    ProductoTipoEnum.Ram,
    ProductoTipoEnum.Bocina,
    ProductoTipoEnum.Monitor,
    ProductoTipoEnum.DiscoOptico,
    ProductoTipoEnum.Teclado,
    ProductoTipoEnum.Mouse,
] as const;

export const ArticuloCuentaContableInventariableRegex = /^\d{4}-\d{1}-\d{4}$/;
export const ArticuloCuentaContableNoInventariable = '2000';

export const ResguardoEstadoEnum = {
    ACTIVO: 1,
    PENDIENTE_ACUSE: 2,
    CANCELADO: 3,
}
export type ResguardoEstadoEnum = (typeof ResguardoEstadoEnum)[keyof typeof ResguardoEstadoEnum];
