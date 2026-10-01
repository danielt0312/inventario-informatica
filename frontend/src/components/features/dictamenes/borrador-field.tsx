import type { DiscoFilled } from "@/types/articulos/discos";
import type { ProductoGenerico, ProductoTipo } from "@/types/productos";
import { ProductoTipoEnum } from "@/lib/constants";
import { useFieldContext } from "@/components/ui/form-context";

type SpecDisco = Partial<DiscoFilled>;
type Producto = Partial<ProductoGenerico>

type Spec<ProductoTipoId extends ProductoTipoEnum | unknown> =
    ProductoTipoId extends typeof ProductoTipoEnum.Disco
    ? SpecDisco
    : {}

type SpecProductoValueAccesor<TSpec extends Producto> = TSpec['tipo'] extends ProductoTipo ? TSpec['tipo']['id'] : unknown;

type Borrador = {
    producto: Producto;
    spec: Spec<SpecProductoValueAccesor<Producto>>;
    caracteristicas_solicitadas: string | undefined;
}

export function DictamenBorradorField() {
    const field = useFieldContext<Borrador>();
    const productoTipoId = field.state.value.producto.tipo?.id;

    return (
        <>

        </>
    );
}
