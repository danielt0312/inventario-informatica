import Goback from "@/components/Goback"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import FormProducto from "./partials/forms/producto"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { FaPaperclip, FaSave } from "react-icons/fa"
import { useForm } from "@tanstack/react-form"


import type { Producto, ProductoCategoria, ProductoTipo, ProductoMarca } from "@/lib/types"
import api from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

function InventarioCreate() {
    const form = useForm({
        defaultValues: {
            producto_id: null,
            // numero_serie: null,
            // costo_unitario: null,
            // factura_id: null,
            // qr_archivo_id: null,
            // contable: false,
        },
    })

    function sendForm() {

    }

    const [productoCategoria, setProductoCategoria] = useState<ProductoCategoria | null>(null)
    const [productoTipo, setProductoTipo] = useState<ProductoTipo | null>(null)
    const [productoMarca, setProductoMarca] = useState<ProductoMarca | null>(null)
    const [producto, setProducto] = useState<Producto | null>(null)

    const [popupIsOpen, setPopupIsOpen] = useState(false)

    const { data : producto_categorias = [] } = useQuery({
        enabled: !productoCategoria && popupIsOpen,
        queryKey: ['producto_categorias'],
        queryFn: async () => {
            const res = await api.get<{ data: ProductoCategoria[] }>('api/producto_categorias')
            return res.data.data
        }
    })

    const { data : producto_tipos = [] } = useQuery({
        enabled: !productoTipo && !!productoCategoria,
        queryKey: ['producto_tipos', productoCategoria],
        queryFn: async () => {
            const res = await api.get<{ data: ProductoTipo[] }>(`api/producto_tipos`, { params: {
                categoria_id: productoCategoria?.id
            }})
            return res.data.data
        }
    })

    const { data : producto_marcas = [] } = useQuery({
        enabled: !productoMarca && !!productoTipo,
        queryKey: ['producto_marcas', productoTipo],
        queryFn: async () => {
            const res = await api.get<{ data: ProductoMarca[] }>(`api/producto_marcas`, { params: {
                tipo_id: productoTipo?.id
            }})
            return res.data.data
        }
    })

    const { data : productos = [] } = useQuery({
        enabled: !producto && !!productoMarca,
        queryKey: ['productos', productoMarca],
        queryFn: async () => {
            const res = await api.get<{ data: Producto[] }>(`api/productos`, { params: {
                tipo_id: productoTipo?.id,
                marca_id: productoMarca?.id
            }})
            return res.data.data
        }
    })

    return (
        <>
            <Goback />

            <form>
                <Card>
                    <CardHeader>
                        <CardTitle>Registro de Artículo existente</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <FieldSet>
                            <FieldGroup className="grid grid-cols-2">
                                <Field>
                                    <FieldLabel htmlFor="categoria_id">Categoría de Producto</FieldLabel>
                                    <Combobox
                                        items={producto_categorias}
                                        itemToStringLabel={(item: ProductoCategoria) => item.nombre}
                                        onValueChange={setProductoCategoria}
                                        onOpenChange={setPopupIsOpen}
                                        autoHighlight
                                        required
                                    >
                                        <ComboboxInput id="categoria_id" placeholder="Selecciona una opción" />
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
                                <Field data-disabled={!productoCategoria}>
                                    <FieldLabel htmlFor="tipo_id">Tipo de Producto</FieldLabel>
                                    <Combobox
                                        items={producto_tipos}
                                        itemToStringLabel={(item: ProductoTipo) => item.nombre}
                                        onValueChange={setProductoTipo}
                                        autoHighlight
                                        required
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
                            </FieldGroup>

                            <FieldGroup className="grid grid-cols-2">
                                <Field data-disabled={!productoTipo}>
                                    <FieldLabel htmlFor="marca_id">Marca empresarial:</FieldLabel>
                                    <Combobox
                                        items={producto_marcas}
                                        itemToStringLabel={(item: ProductoMarca) => item.nombre}
                                        onValueChange={setProductoMarca}
                                        autoHighlight
                                    >
                                        <ComboboxInput id="marca_id" placeholder="Selecciona una opción" disabled={!productoTipo} />
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

                                {/* <form.Field
                                    name="producto_id"
                                >
                                    {(field) =>
                                        ( */}
                                            <Field data-disabled={!productoMarca}>
                                                <FieldLabel>Modelo:</FieldLabel>
                                                <Combobox
                                                    items={productos}
                                                    itemToStringLabel={(item: Producto) => item.nombre}
                                                    onValueChange={setProducto}
                                                    autoHighlight
                                                >
                                                    <ComboboxInput
                                                        name="producto_id"
                                                        placeholder="Selecciona una opción"
                                                        disabled={!productoMarca}
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
                                            </Field>
                                        {/* )
                                    }
                                    </form.Field> */}
                            </FieldGroup>

                            <Field>
                                <FieldLabel htmlFor="numero_serie">Número de Serie</FieldLabel>
                                <Input id="numero_serie" placeholder="Ingresa un valor" />
                            </Field>

                            <FieldGroup className="grid grid-cols-2">
                                <Field>
                                    <FieldLabel htmlFor="costo_unitario">Costo Unitario</FieldLabel>
                                    <Input id="costo_unitario" placeholder="Ingresa un valor" />
                                </Field>
                                <Field orientation='horizontal'>
                                    <Checkbox id="contable" name="contable" />
                                    <FieldLabel htmlFor="contable">Es contable</FieldLabel>
                                </Field>
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
