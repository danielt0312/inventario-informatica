type BaseLoose = {
    costo_unitario: string | null;
    es_contable: boolean;
}

type Base = {
    id: number;
    numero_inventario: string;
    numero_serie: string | null;
    costo_unitario: string | null;
    es_contable: boolean;
}

export type Articulo = {
    id: number;
    numero_inventario: string;
    numero_serie: string | null;
    costo_unitario: string | null;
    es_contable: boolean;
}
