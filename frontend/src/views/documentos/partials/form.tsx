import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadList, FileUploadTrigger } from "@/components/ui/file-upload"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import api from "@/lib/axios"
import type { TCatalogo } from "@/lib/types"
import { Route } from "@/routes/_auth"
import { useForm } from "@tanstack/react-form"
import { queryOptions, useQuery } from "@tanstack/react-query"
import { PlusCircle, Save, Upload, X } from "lucide-react"
import { useState } from "react"
import z from "zod"

type FormSchema = {
    tipo_id: number | null
    archivo: File | null
};

const defaultValues: FormSchema = {
    tipo_id: null,
    archivo: null
};

const formSchema = z.object({
    tipo_id: z
        .number('Este campo es requerido')
        .int(),
    archivo: z
        .file('Debes de adjuntar un archivo')
        .max(5_000_000)
        .mime('application/pdf')
});

export const queryOptTipos = queryOptions({
    queryKey: ['documento_tipos'],
    queryFn: async () => await api.get<{ data: TCatalogo[] }>('api/documento_tipos')
        .then((response) => response.data.data),
    staleTime: Infinity
});

export function Form() {
    const { queryClient } = Route.useRouteContext();

    const form = useForm({
        defaultValues,
        validators: {
            onSubmit: formSchema
        },
        onSubmit: async ({ value }) => {
            const formData = new FormData();
            formData.append('tipo_id', String(value.tipo_id));

            if (value.archivo) {
                formData.append('archivo', value.archivo);
            }

            const response = await api.postForm('api/documentos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                queryClient.invalidateQueries({ queryKey: ['documentos'] });
                form.reset(defaultValues);
                setOpen(false);
            }
        }
    });

    const { data: producto_tipos = [] } = useQuery(queryOptTipos);

    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) form.reset(defaultValues);
            }}
        >
            <DialogTrigger asChild>
                <div className="flex justify-end">
                    <Button size="sm">
                        <PlusCircle /> Registrar
                    </Button>
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Registro de Documento</DialogTitle>
                </DialogHeader>

                <form
                    className="contents"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field
                            name="archivo"
                            children={(field) => (
                                <FileUpload
                                    value={field.state.value ? [field.state.value] : undefined}
                                    onValueChange={(files) => field.handleChange(files[0] ?? null)}
                                    accept="application/pdf"
                                    maxFiles={1}
                                >
                                    <FileUploadDropzone>
                                        <div className="flex flex-col items-center gap-1 text-center">
                                            <div className="flex items-center justify-center rounded-full border p-2.5">
                                                <Upload className="size-6 text-muted-foreground" />
                                            </div>
                                            <p className="font-medium text-sm">Arrastra y suelta el archivo aquí</p>
                                            <p className="text-muted-foreground text-xs">
                                                O presiona aquí para navegar entre tus archivos (máximo de 5 MB)
                                            </p>
                                        </div>
                                        <FileUploadTrigger asChild>
                                            <Button variant="outline" size="sm" className="mt-2 w-fit">
                                                Buscar
                                            </Button>
                                        </FileUploadTrigger>
                                    </FileUploadDropzone>
                                    <FileUploadList>
                                        {field.state.value && (
                                            <FileUploadItem value={field.state.value}>
                                                <FileUploadItemPreview />
                                                <FileUploadItemMetadata />
                                                <FileUploadItemDelete asChild>
                                                <Button variant="ghost" size="icon" className="size-7">
                                                    <X />
                                                </Button>
                                                </FileUploadItemDelete>
                                            </FileUploadItem>
                                        )}
                                    </FileUploadList>
                                    <FieldError errors={field.state.meta.errors} />
                                </FileUpload>
                            )}
                        />

                        <form.Field
                            name="tipo_id"
                            children={(field) => (
                                <Field>
                                    <FieldLabel>Tipo de Documento:</FieldLabel>
                                    <Select
                                        onValueChange={(v) => field.handleChange(v === '' ? null : Number(v))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona una opción" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {producto_tipos.map((v) => (
                                                    <SelectItem
                                                        key={v.id}
                                                        value={v.id.toString()}
                                                    >
                                                        {v.nombre}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FieldError errors={field.state.meta.errors} />
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <DialogFooter>
                        <Button type="submit">
                            <Save /> Guardar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
