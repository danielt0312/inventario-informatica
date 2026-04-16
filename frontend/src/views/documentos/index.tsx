import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import api from "@/lib/axios"
import type { TCatalogo } from "@/lib/types"
import { useForm } from "@tanstack/react-form"
import { useQuery } from "@tanstack/react-query"
import type { ColumnDef } from "@tanstack/react-table"
import { PlusCircle } from "lucide-react"
import z from "zod"

type Documento = {
    id: number
    tipo: TCatalogo
    archivo: TCatalogo
};

const columns: ColumnDef<Documento>[] = [
    {
        accessorKey: 'tipo',
        header: 'Tipo'
    },
    {
        accessorKey: 'archivo.nombre',
        header: 'Nombre del Archivo'
    }
];

type FormSchema = {
    tipo_id: number | null,
    nombre: string
};

const defaultValues: FormSchema = {
    tipo_id: null,
    nombre: ''
}

const formValidator = z.object({
    tipo_id: z.int(),
    nombre: z.string()
});

function Documentos() {
    const form = useForm({
        defaultValues,
    });

    const { data = [] } = useQuery({
        queryKey: ['documentos'],
        queryFn: async () => await api.get<{ data: Documento[] }>('documentos')
            .then(response => response.data.data)
    });

    const { data: producto_tipos = [] } = useQuery({
        queryKey: ['documento_tipos'],
        queryFn: async () => await api.get<{ data: TCatalogo[] }>('documento_tipos')
            .then((response) => response.data.data)
    })

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Documentos almancenados</CardTitle>
                <Dialog>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle/> Registrar
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Registro de Documento</DialogTitle>
                            <FieldGroup>
                                <form.Field
                                    name="tipo_id"
                                    children={(field) => (
                                        <Select>
                                            <Field>Tipo de Documento:</Field>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona una opción" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {producto_tipos.map(v => (
                                                        <SelectItem
                                                            value={v.id.toString()}
                                                        >
                                                            {v.nombre}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </FieldGroup>
                        </DialogContent>
                    </form>
                </Dialog>
            </CardHeader>

            <CardContent>
                <DataTable columns={columns} data={data} />
            </CardContent>
        </Card>
    )
}

export default Documentos
