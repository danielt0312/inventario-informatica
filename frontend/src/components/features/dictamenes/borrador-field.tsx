import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import { TextareaField } from "@/components/ui/textarea-field";
import { CirclePlusIcon } from "lucide-react";
import type { ProductoTipoFieldType } from "../productos/tipo-field";
import { productoVarianteSpecDefaultFormValues } from "../productos/variante-spec-field-group";
import { type DictamenCaracteristicasAdicionalesFieldType } from "./fields";
import { useFieldContext } from "@/components/ui/form-context";
import { FieldGroup } from "@/components/ui/field";

function BorradorDisco({

}) {
    return (
        <></>
    );
}

type DefaultSchema = {
    producto: typeof productoVarianteSpecDefaultFormValues,
    caracteristicas_adicionales: DictamenCaracteristicasAdicionalesFieldType;
};

const defaultValues: DefaultSchema = {
    producto: productoVarianteSpecDefaultFormValues,
    caracteristicas_adicionales: null,
}

function Default() {
    const field = useBorradorFieldContext();

    return (
        <Dialog>
            <DialogContent className="min-w-3xl">
                <DialogHeader>
                    <DialogTitle>Agregar características adicionales</DialogTitle>
                    <DialogDescription>Agregar características adicionales</DialogDescription>
                </DialogHeader>

                <FieldGroup className="flex">
                </FieldGroup>

                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

const useBorradorFieldContext = () => useFieldContext<DictamenBorradorFieldType>();
export type DictamenBorradorFieldType = Record<string, unknown>;
export function DictamenBorradorField({
    productoTipoId
}: {
    productoTipoId: ProductoTipoFieldType;
}) {

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
                    <InputGroupButton size="sm" variant="outline">
                        <CirclePlusIcon /> Agregar
                    </InputGroupButton>
                </InputGroupAddon>
            </TextareaField>

        </>
    );
}
