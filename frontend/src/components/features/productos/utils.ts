import type { ProductoTipoEnum } from "@/lib/constants";
import type { ProductoVariante, ProductoVarianteDe } from "@/types/productos";

export const esProductoTipo = <T extends ProductoTipoEnum>(
  v: ProductoVariante,
  id: T,
): v is ProductoVarianteDe<T> => v.tipo.id === id;
