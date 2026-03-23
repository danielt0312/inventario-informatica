'use client'

import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import api from "@/lib/axios"
import type { Producto, ProductoMarca, ProductoModelo, ProductoTipo } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

function FormProducto() {
    const [productoTipo, setProductoTipo] = useState<ProductoTipo | null>(null)
    const [producto, setProducto] = useState<Producto | null>(null)
    const [productoModelo, setProductoModelo] = useState<ProductoModelo | null>(null)
    const [productoMarca, setProductoMarca] = useState<ProductoMarca | null>(null)

    const [popupIsOpen, setPopupIsOpen] = useState(false)

    const { data : producto_tipos = [] } = useQuery({
        enabled: !productoTipo && popupIsOpen,
        queryKey: ['producto_tipos'],
        queryFn: async () => {
            const res = await api.get<{ data: ProductoTipo[] }>('api/producto_tipos')
            return res.data.data
        }
    })

    const { data : productos = [] } = useQuery({
        enabled: !!productoTipo && !producto,
        queryKey: ['producto_tipos', productoTipo],
        queryFn: async () => {
            const res = await api.get<{ data: Producto[] }>(`api/productos?producto_tipo_id=${productoTipo?.id}`)
            return res.data.data
        }
    })

    return (
        <FieldSet>
            <FieldGroup className="grid grid-cols-2">
                <Field>
                    <FieldLabel htmlFor="producto_tipo_id">Producto</FieldLabel>
                    <Combobox
                        items={producto_tipos}
                        itemToStringLabel={(item: ProductoTipo) => item.nombre}
                        onValueChange={setProductoTipo}
                        onOpenChange={setPopupIsOpen}
                        autoHighlight
                        required
                    >
                        <ComboboxInput id="producto_tipo_id" placeholder="Selecciona una opción" />
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
                <Field data-disabled={!productoTipo}>
                    <FieldLabel htmlFor="producto_id">Clasificación del Producto</FieldLabel>
                    <Combobox
                        items={productos}
                        itemToStringLabel={(item: Producto) => item.nombre}
                        onValueChange={setProducto}
                        autoHighlight
                        required
                    >
                        <ComboboxInput id="producto_id" placeholder="Selecciona una opción" disabled={!productoTipo} />
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
                    <FieldLabel htmlFor="producto_marca_id">Marca del bien:</FieldLabel>
                    <Combobox
                        // items={producto
                        //     ? CAT_PRODUCTO_MARCA.filter((cat_producto_marca: typeof catProductoMarca) => {
                        //             return PRODUCTO_MARCA_MODELO.filter((producto_marca_modelo: typeof productoMarcaModelo) => {
                        //                 return producto_marca_modelo?.producto.id == producto.id && producto_marca_modelo?.cat_producto_marca.id == cat_producto_marca?.id
                        //             })
                        //         })
                        //     : undefined
                        // }
                        // itemToStringLabel={(cat_producto_marca: typeof CAT_PRODUCTO_MARCA[number]) => cat_producto_marca.nombre}
                        // onValueChange={handleChangeCatProductoMarca}
                        autoHighlight
                    >
                        <ComboboxInput id="producto_marca_id" placeholder="Selecciona una opción" disabled={!productoTipo || !producto} />
                        <ComboboxContent>
                            <ComboboxEmpty>No se encontró ninguna opción</ComboboxEmpty>
                            <ComboboxList>
                                {/* {(item: CatProductoMarca) => (
                                    <ComboboxItem key={item.id} value={item}>
                                        {item.nombre}
                                    </ComboboxItem>
                                )} */}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </Field>

                <Field data-disabled={!productoTipo}>
                    <FieldLabel htmlFor="producto_modelo_id">Modelo del bien:</FieldLabel>
                    <Combobox
                        autoHighlight
                    >
                        <ComboboxInput id="producto_modelo_id" placeholder="Selecciona una opción" disabled={!productoTipo || !producto} />
                        <ComboboxContent>
                            <ComboboxEmpty>No se encontró ninguna opción</ComboboxEmpty>
                            <ComboboxList>
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </Field>
            </FieldGroup>
        </FieldSet>
    )
}

export default FormProducto
