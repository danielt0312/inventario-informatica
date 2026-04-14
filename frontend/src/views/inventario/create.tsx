import Goback from "@/components/Goback"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { FaPaperclip, FaSave } from "react-icons/fa"
import { useForm, useStore } from "@tanstack/react-form"

import type { Producto, ProductoCategoria, ProductoTipo, ProductoMarca } from "@/lib/types"
import api from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Route } from "@/routes/_auth/inventario"
import { isAxiosError } from "axios"
import { handleLaravel422 } from "@/lib/utils"

function InventarioCreate() {
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
            producto_categoria_id: '',
            producto_tipo_id: '',
            producto_marca_id: '',

            producto_id: '',
            numero_serie: '',
            costo_unitario: '',
            factura_id: '',
            qr_archivo_id: '',
            contable: false,
        },
        onSubmit: async ({ value, formApi }) => {
            try {
                await api.post('api/articulos', value);

                navigate({ to: Route.to });
            } catch (error) {
                if (isAxiosError(error) && error.response?.status === 422) {
                    const serverErrors = error.response.data.errors;
                    handleLaravel422(formApi, serverErrors);
                }
            }
        }
    })

    const productoCategoria = useStore(form.store, (state) => state.values.producto_categoria_id)
    const productoTipo = useStore(form.store, (state) => state.values.producto_tipo_id)
    const productoMarca = useStore(form.store, (state) => state.values.producto_marca_id)

    const { data : producto_categorias = [] } = useQuery({
        queryKey: ['producto_categorias'],
        queryFn: async () => {
            const { data: axiosData } = await api.get<{ data: ProductoCategoria[] }>('api/producto_categorias')
            return axiosData.data
        }
    })

    const { data: producto_tipos = [] } = useQuery({
        queryKey: ['producto_tipos', productoCategoria],
        queryFn: async () => {
            const { data: axiosData } = await api.get<{ data: ProductoTipo[] }>('api/producto_tipos', { params: {
                categoria_id: productoCategoria
            }})

            return axiosData.data
        },
        enabled: !!productoCategoria
    })

    const { data: producto_marcas = [] } = useQuery({
        queryKey: ['producto_marcas', productoTipo],
        queryFn: async () => {
            const { data: axiosData } = await api.get<{ data: ProductoTipo[] }>('api/producto_marcas', { params: {
                tipo_id: productoTipo
            }})

            return axiosData.data
        },
        enabled: !!productoTipo
    })

    const { data: productos = [] } = useQuery({
        queryKey: ['productos', productoTipo, productoMarca],
        queryFn: async () => {
            const { data: axiosData } = await api.get<{ data: ProductoTipo[] }>('api/productos', { params: {
                tipo_id: productoTipo,
                marca_id: productoMarca
            }})

            return axiosData.data
        },
        enabled: !!productoTipo && !!productoMarca
    })

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
                    <CardContent>
                        <FieldSet>
                            <FieldGroup className="grid grid-cols-2">
                                <form.Field
                                    name="producto_categoria_id"
                                    children={(field) => (
                                        <Field>
                                            <FieldLabel>Categoría del Bien Informático:</FieldLabel>
                                            <Combobox
                                                items={producto_categorias}
                                                itemToStringLabel={(item: ProductoCategoria) => item.nombre}
                                                onValueChange={(v) => field.handleChange(v?.id.toString() ?? '')}
                                                autoHighlight
                                            >
                                                <ComboboxInput placeholder="Selecciona una opción" />
                                                <ComboboxContent>
                                                    <ComboboxEmpty>No se encontró ninguna opción</ComboboxEmpty>
                                                    <ComboboxList>
                                                        {(item: ProductoCategoria) => (
                                                            <ComboboxItem key={item.id} value={item}>
                                                                {item.nombre}
                                                            </ComboboxItem>
                                                        )}
                                                    </ComboboxList>
                                                </ComboboxContent>
                                            </Combobox>
                                        </Field>
                                    )}
                                />
                                <form.Field
                                    name="producto_tipo_id"
                                    children={(field) => (
                                        <Field data-disabled={!productoCategoria}>
                                            <FieldLabel>Tipo de Producto</FieldLabel>
                                            <Combobox
                                                items={producto_tipos}
                                                itemToStringLabel={(item: ProductoTipo) => item.nombre}
                                                onValueChange={(v) => field.handleChange(v?.id.toString() ?? '')}
                                                autoHighlight
                                            >
                                                <ComboboxInput id="tipo_id" placeholder="Selecciona una opción" disabled={!productoCategoria} />
                                                <ComboboxContent>
                                                    <ComboboxEmpty>No se encontró ninguna opción</ComboboxEmpty>
                                                    <ComboboxList>
                                                        {(item: ProductoTipo) => (
                                                            <ComboboxItem key={item.id} value={item}>
                                                                {item.nombre}
                                                            </ComboboxItem>
                                                        )}
                                                    </ComboboxList>
                                                </ComboboxContent>
                                            </Combobox>
                                        </Field>
                                    )}
                                />
                            </FieldGroup>

                            <FieldGroup className="grid grid-cols-2">
                                <form.Field
                                    name="producto_marca_id"
                                    children={(field) => (
                                        <Field data-disabled={!productoTipo}>
                                            <FieldLabel>Marca empresarial:</FieldLabel>
                                            <Combobox
                                                items={producto_marcas}
                                                itemToStringLabel={(item: ProductoMarca) => item.nombre}
                                                onValueChange={(v) => field.handleChange(v?.id.toString() ?? '')}
                                                autoHighlight
                                            >
                                                <ComboboxInput placeholder="Selecciona una opción" disabled={!productoTipo} />
                                                <ComboboxContent>
                                                    <ComboboxEmpty>No se encontró ninguna opción</ComboboxEmpty>
                                                    <ComboboxList>
                                                        {(item: ProductoMarca) => (
                                                            <ComboboxItem key={item.id} value={item}>
                                                                {item.nombre}
                                                            </ComboboxItem>
                                                        )}
                                                    </ComboboxList>
                                                </ComboboxContent>
                                            </Combobox>
                                        </Field>
                                    )}
                                />

                                <form.Field
                                    name="producto_id"
                                    children={field => (
                                        <Field data-disabled={!productoMarca}>
                                            <FieldLabel>Modelo:</FieldLabel>
                                            <Combobox
                                                items={productos}
                                                itemToStringLabel={(item: Producto) => item.nombre}
                                                onValueChange={(v) => field.handleChange(v?.id.toString() ?? '')}
                                                autoHighlight
                                            >
                                                <ComboboxInput
                                                    name={field.name}
                                                    disabled={!productoMarca}
                                                    placeholder="Selecciona una opción"
                                                />
                                                <ComboboxContent>
                                                    <ComboboxEmpty>No se encontró ninguna opción</ComboboxEmpty>
                                                    <ComboboxList>
                                                        {(item: Producto) => (
                                                            <ComboboxItem key={item.id} value={item}>
                                                                {item.nombre}
                                                            </ComboboxItem>
                                                        )}
                                                    </ComboboxList>
                                                </ComboboxContent>
                                            </Combobox>
                                            <FieldError errors={field.state.meta.errors} />
                                        </Field>
                                    )}
                                />
                            </FieldGroup>

                            <form.Field
                                name="numero_serie"
                                children={(field) => (
                                    <Field>
                                        <FieldLabel>Número de Serie</FieldLabel>
                                        <Input
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Ingresa un valor"
                                        />
                                    </Field>
                                )}
                            />

                            <FieldGroup className="grid grid-cols-2">
                                <form.Field
                                    name="costo_unitario"
                                    children={(field) => (
                                        <Field>
                                            <FieldLabel>Costo Unitario</FieldLabel>
                                            <Input
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Ingrese un valor"
                                            />
                                        </Field>
                                    )}
                                />
                                <form.Field
                                    name="contable"
                                    children={(field) => (
                                        <Field orientation='horizontal'>
                                            <Checkbox
                                                name={field.name}
                                                defaultChecked={field.state.value}
                                                onCheckedChange={(checked) => field.handleChange(!!checked)}
                                            />
                                            <FieldLabel>Es contable</FieldLabel>
                                        </Field>
                                    )}
                                />
                            </FieldGroup>

                            <FieldGroup className="grid grid-cols-4">
                                <Button type="button">
                                    <FaPaperclip /> Adjuntar Factura
                                </Button>
                                <FieldGroup>
                                </FieldGroup>
                            </FieldGroup>
                        </FieldSet>
                    </CardContent>

                    <CardFooter className="justify-center">
                        <Button type="submit">
                            <FaSave /> Guardar
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </>
    )
}

export default InventarioCreate
