import Goback from "@/components/Goback"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useForm, useStore } from "@tanstack/react-form"

import api from "@/lib/axios"
import { useNavigate } from "@tanstack/react-router"
import { Route } from "@/routes/_auth/inventario"
import { isAxiosError } from "axios"
import { handleLaravel422 } from "@/lib/utils"

import { defaultValues, formValidator } from "./partials/form.schema"
import { Paperclip, Plus, Save, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import type { ColumnDef } from "@tanstack/react-table"
import { useState, useMemo } from "react"
import type { Documento } from "../documentos/partials/table.cols"
import { Table as DocumentosTable } from "../documentos/partials/table"
import { DocumentoTipo, ProductoCategoria, type TCatalogo } from "@/lib/types"
import { useCategoriaQuery, useMarcaQuery, useProductoQuery, useTipoQuery } from "@/views/productos/queries"
import { useQueryClient } from "@tanstack/react-query"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Form as FormComputadora } from "../articulos/computadoras/form"
import { Form as FormArticulo } from "../articulos/partials/form"

function Create() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [dialogDocumentoOpen, setDialogDocumentoOpen] = useState(false);

    const form = useForm({
        defaultValues,
        validators: {
            onSubmit: formValidator,
        },
        onSubmit: async ({ value, formApi }) => {
            try {
                await api.post('api/test', value);

                queryClient.invalidateQueries({ queryKey: ['articulos'] })
                navigate({ to: Route.to });
            } catch (error) {
                if (isAxiosError(error) && error.response?.status === 422) {
                    const serverErrors = error.response.data.errors;
                    handleLaravel422(formApi, serverErrors);
                }
            }
        }
    });

    // const selectRow = useMemo<ColumnDef<Documento>[]>(() => [
    //     {
    //         id: 'selector',
    //         cell: ({ row }) => (
    //             <Button
    //                 onClick={() => {
    //                     form.setFieldValue('qr_archivo_id', row.original.id);
    //                     setDialogDocumentoOpen(false);
    //                 }}
    //                 size="sm"
    //             >
    //                 <Paperclip /> Adjuntar
    //             </Button>
    //         )
    //     }
    // ], [form]);

    return (
        <>
            <Goback />

            <form onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}>
                <Card>
                    <CardHeader>
                        <CardTitle>Registro de Artículo existente</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                        <FormArticulo />
                    </CardContent>

                    <CardFooter className="justify-center">
                        <Button type="submit">
                            <Save /> Guardar
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </>
    )
}

export default Create
