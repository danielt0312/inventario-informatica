import { Card, CardContent } from "@/components/ui/card";
import type { EvidenciarActionDictamen } from "../evidenciar/form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import api from "@/lib/axios";
import { PackagePlusIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Route as ActionRoute } from "@/routes/_auth/dictamenes/$uuid/$action";

export type SurtirActionDictamen = EvidenciarActionDictamen;

export type SurtirMutationOptions = Omit<UseMutationOptions, 'mutationFn'>;
export const useSurtirMutation = (dictamen: EvidenciarActionDictamen, options?: UseMutationOptions) => useMutation({
    ...options,
    mutationFn: () => api.post(`api/dictamenes/${dictamen.uuid}/surtir`),
    onSuccess: (data, variables, onMutateResult, context) => {
        context.client.invalidateQueries({ queryKey: ['dictamenes'] });
        context.client.invalidateQueries({ queryKey: ['dictamenes', dictamen.uuid] });

        options?.onSuccess?.(data, variables, onMutateResult, context);
    }
});

export function SurtirForm({ dictamen }: { dictamen: EvidenciarActionDictamen }) {
    const navigate = useNavigate();

    const { mutate } = useSurtirMutation(dictamen, {
        onSuccess: () => {
            navigate({
                to: ActionRoute.to,
                params: {
                    uuid: dictamen.uuid,
                    action: 'inventariar'
                }
            })
        }
    });

    return (
        <>
            {dictamen.productos.map((dictamenProducto, index) => {
                const producto = dictamenProducto.producto;

                return (
                    <Card key={index} className="shadow-none">
                        <CardContent className="flex flex-col gap-6">
                            <div className="flex flex-row gap-6">
                                <div className="w-1/10" data-slot="label">
                                    <Label className="font-bold">Cantidad</Label>
                                    <Label>{dictamenProducto.cantidad}</Label>
                                </div>
                                <div className="w-7/10" data-slot="label">
                                    <Label className="font-bold">Producto</Label>
                                    <Label>
                                        {producto.tipo.nombre} {producto.marca.nombre} {producto.nombre} {dictamenProducto.caracteristicas}
                                    </Label>
                                </div>
                                <div className="w-2/10" data-slot="label">
                                    <Label className="font-bold">Resguardante</Label>
                                    <Label>{dictamenProducto.empleado?.nombre ?? 'Juan Perez'}</Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}

            <Button className="self-center" onClick={() => mutate()}>
                <PackagePlusIcon /> Surtir
            </Button>
        </>
    );
}
