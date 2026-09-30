import { TextareaField } from "@/components/ui/textarea-field";
import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import { CirclePlusIcon } from "lucide-react";
import type { DiscoFilled } from "@/types/articulos/discos";
import type { ProductoGenerico, ProductoTipo } from "@/types/productos";
import { ProductoTipoEnum } from "@/lib/constants";
import { useFieldContext } from "@/components/ui/form-context";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React from "react";

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

type DialogProps = React.ComponentProps<typeof Dialog>;

function BorradorDisco(props: DialogProps) {
    return (
        <Dialog {...props}>

        </Dialog>
    );
}

function BorradorProducto(props: DialogProps) {
    return (
        <Dialog {...props}>

        </Dialog>
    );
}

export function DictamenBorradorField() {
    const field = useFieldContext<Borrador>();
    const value = field.state.value;

    const [open, setOpen] = React.useState(false);

    return (
        <>
            <TextareaField
                fieldLayout={{
                    label: "Características solicitadas"
                }}
                placeholder="Ingresa alguna característica que haya sido mencionada en el oficio"
                readOnly
            >
                <InputGroupAddon align="block-end">
                    <InputGroupButton size="sm" variant="outline" onClick={() => setOpen(true)}>
                        <CirclePlusIcon /> Agregar
                    </InputGroupButton>
                </InputGroupAddon>
            </TextareaField>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="min-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Ingresar Características solicitadas</DialogTitle>
                    </DialogHeader>

                    <DialogFooter>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
