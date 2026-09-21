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

const { Dictaminar: DICTAMINAR, ...DictaminadoDictamenEstadoEnum } = DictamenEstadoEnum;

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
    Servidor: 2,
    Tablet: 3,
    Disco: 4,
    Ram: 5,
    Telefono: 6,
    AccessPoint: 7,
    Antena: 8,
    Firewall: 9,
    Modem: 10,
    PanelParcheo: 11,
    Rack: 12,
    Router: 13,
    Switch: 14,
    Adaptador: 15,
    ModuloReceptor: 16,
    ApuntadorOptico: 17,
    CajaConectividad: 18,
    LectorCodigos: 19,
    RelojChecador: 20,
    Bocina: 21,
    Consola: 22,
    Microfono: 23,
    Camara: 24,
    Concentrador: 25,
    PantallaRetractil: 26,
    Proyector: 27,
    BarraVideo: 28,
    Impresora: 29,
    Plotter: 30,
    Monitor: 31,
    DiscoOptico: 32,
    Teclado: 33,
    Mouse: 34,
    ModuloBateria: 35,
    Ups: 36,
    Escaner: 37,
    Procesador: 38,
    Licencia: 39,
} as const;
export type ProductoTipoEnum = (typeof ProductoTipoEnum)[keyof typeof ProductoTipoEnum];

export const ProductoTipoProductoCategoriaMap: Record<ProductoTipoEnum, ProductoCategoriaEnum> = {
    [ProductoTipoEnum.Computadora]: ProductoCategoriaEnum.Computadora,
    [ProductoTipoEnum.Servidor]: ProductoCategoriaEnum.Computadora,
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
