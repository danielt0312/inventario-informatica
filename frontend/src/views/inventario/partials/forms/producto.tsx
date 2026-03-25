import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import api from "@/lib/axios"
import type { Producto, ProductoCategoria, ProductoTipo, ProductoMarca } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

function FormProducto() {
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
                producto_categoria_id: productoCategoria?.id
            }})
            return res.data.data
        }
    })

    const { data : producto_marcas = [] } = useQuery({
        enabled: !productoMarca && !!productoTipo,
        queryKey: ['producto_marcas', productoTipo],
        queryFn: async () => {
            const res = await api.get<{ data: ProductoMarca[] }>(`api/producto_marcas`, { params: {
                producto_tipo_id: productoTipo?.id
            }})
            return res.data.data
        }
    })

    const { data : productos = [] } = useQuery({
        enabled: !producto && !!productoMarca,
        queryKey: ['productos', productoMarca],
        queryFn: async () => {
            const res = await api.get<{ data: Producto[] }>(`api/productos`, { params: {
                producto_tipo_id: productoTipo?.id,
                producto_marca_id: productoMarca?.id
            }})
            return res.data.data
        }
    })

    return (
        <>
            <FieldGroup className="grid grid-cols-2">
                <Field>
                    <FieldLabel htmlFor="producto_categoria_id">Categoría de Producto</FieldLabel>
                    <Combobox
                        items={producto_categorias}
                        itemToStringLabel={(item: ProductoCategoria) => item.nombre}
                        onValueChange={setProductoCategoria}
                        onOpenChange={setPopupIsOpen}
                        autoHighlight
                        required
                    >
                        <ComboboxInput id="producto_categoria_id" placeholder="Selecciona una opción" />
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
                    <FieldLabel htmlFor="producto_tipo_id">Tipo de Producto</FieldLabel>
                    <Combobox
                        items={producto_tipos}
                        itemToStringLabel={(item: ProductoTipo) => item.nombre}
                        onValueChange={setProductoTipo}
                        autoHighlight
                        required
                    >
                        <ComboboxInput id="producto_tipo_id" placeholder="Selecciona una opción" disabled={!productoCategoria} />
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
                    <FieldLabel htmlFor="producto_marca_id">Marca empresarial:</FieldLabel>
                    <Combobox
                        items={producto_marcas}
                        itemToStringLabel={(item: ProductoMarca) => item.nombre}
                        onValueChange={setProductoMarca}
                        autoHighlight
                    >
                        <ComboboxInput id="producto_marca_id" placeholder="Selecciona una opción" disabled={!productoTipo} />
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

                <Field data-disabled={!productoMarca}>
                    <FieldLabel htmlFor="producto_modelo_id">Modelo:</FieldLabel>
                    <Combobox
                        items={productos}
                        itemToStringLabel={(item: Producto) => item.nombre}
                        onValueChange={setProducto}
                        autoHighlight
                    >
                        <ComboboxInput id="producto_modelo_id" placeholder="Selecciona una opción" disabled={!productoMarca} />
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
            </FieldGroup>
        </>
    )
}

export default FormProducto
