'use client'

import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxList } from "@/components/ui/combobox"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { useState } from "react"

type CatProducto = {
    id: number
    nombre: string
}

const CAT_PRODUCTO : CatProducto[] = [
    { id: 1, nombre: "Computadora" },
    { id: 2, nombre: "Dispositivo de Almacenamiento" },
    { id: 3, nombre: "Telefonía" },
    { id: 4, nombre: "Redes" },
    { id: 5, nombre: "Refacción" },
    { id: 6, nombre: "Herramienta" },
    { id: 7, nombre: "Audio" },
    { id: 8, nombre: "Cámara y Video" },
    { id: 9, nombre: "Cámara y Proyección" },
    { id: 11, nombre: "Impresora" },
    { id: 12, nombre: "Periférico" },
    { id: 13, nombre: "Eléctrico" },
    { id: 14, nombre: "Escáner" },
] as const

type Producto = {
    id: number
    cat_producto: CatProducto
    clasificacion: string
}

const PRODUCTO : Producto[] = [
    { id: 1, cat_producto: CAT_PRODUCTO[0], clasificacion: "Desktop" },
    { id: 2, cat_producto: CAT_PRODUCTO[0], clasificacion: "Laptop" },
    { id: 3, cat_producto: CAT_PRODUCTO[0], clasificacion: "Servidor" },
    { id: 4, cat_producto: CAT_PRODUCTO[0], clasificacion: "Tablet" },
    { id: 5, cat_producto: CAT_PRODUCTO[1], clasificacion: "Disco" },
    { id: 6, cat_producto: CAT_PRODUCTO[2], clasificacion: "Telefono" },
    { id: 7, cat_producto: CAT_PRODUCTO[3], clasificacion: "Access Point" },
    { id: 8, cat_producto: CAT_PRODUCTO[3], clasificacion: "Antena" },
    { id: 9, cat_producto: CAT_PRODUCTO[4],clasificacion: "Antena"},
    { id: 10, cat_producto: CAT_PRODUCTO[4],clasificacion: "Firewall"},
    { id: 11, cat_producto: CAT_PRODUCTO[4],clasificacion: "Módem"},
    { id: 12, cat_producto: CAT_PRODUCTO[4],clasificacion: "Panel de Parcheo de 24 Puertos"},
    { id: 13, cat_producto: CAT_PRODUCTO[4],clasificacion: "Panel de Parcheo de 48 Puertos"},
    { id: 14, cat_producto: CAT_PRODUCTO[4],clasificacion: "Rack"},
    { id: 15, cat_producto: CAT_PRODUCTO[5],clasificacion: "Router"},
    { id: 16, cat_producto: CAT_PRODUCTO[5],clasificacion: "Switch"},
    { id: 17, cat_producto: CAT_PRODUCTO[6],clasificacion: "Adaptador "},
    { id: 18, cat_producto: CAT_PRODUCTO[6],clasificacion: "Módulo de Receptor"},
    { id: 19, cat_producto: CAT_PRODUCTO[6],clasificacion: "Apuntador Óptico"},
    { id: 20, cat_producto: CAT_PRODUCTO[6],clasificacion: "Caja de Conectividad"},
    { id: 21, cat_producto: CAT_PRODUCTO[6],clasificacion: "Lector de Código de Barras"},
    { id: 22, cat_producto: CAT_PRODUCTO[6],clasificacion: "Reloj Checador"},
    { id: 23, cat_producto: CAT_PRODUCTO[6],clasificacion: "Reloj Checador Biométrico"},
    { id: 24, cat_producto: CAT_PRODUCTO[7],clasificacion: "Bocina"},
    { id: 25, cat_producto: CAT_PRODUCTO[7],clasificacion: "Bocina Ambiental"},
    { id: 26, cat_producto: CAT_PRODUCTO[7],clasificacion: "Consola"},
    { id: 27, cat_producto: CAT_PRODUCTO[7],clasificacion: "Micrófono"},
    { id: 28, cat_producto: CAT_PRODUCTO[8],clasificacion: "Cámara de Video Digital"},
    { id: 29, cat_producto: CAT_PRODUCTO[8],clasificacion: "Cámara Fotográfica Digital"},
    { id: 30, cat_producto: CAT_PRODUCTO[8],clasificacion: "Cámara Web"},
    { id: 31, cat_producto: CAT_PRODUCTO[9],clasificacion: "Concentrador"},
    { id: 32, cat_producto: CAT_PRODUCTO[9],clasificacion: "Pantalla Retractil"},
    { id: 33, cat_producto: CAT_PRODUCTO[9],clasificacion: "Proyector"},
    { id: 34, cat_producto: CAT_PRODUCTO[9],clasificacion: "Unidad de Video"},
    { id: 35, cat_producto: CAT_PRODUCTO[10],clasificacion: "Impresora"},
    { id: 36, cat_producto: CAT_PRODUCTO[10],clasificacion: "Impresora Multifuncional"},
    { id: 37, cat_producto: CAT_PRODUCTO[10],clasificacion: "Plotter"},
    { id: 38, cat_producto: CAT_PRODUCTO[11],clasificacion: "Monitor"},
    { id: 39, cat_producto: CAT_PRODUCTO[11],clasificacion: "Quemador DVD Externo"},
    { id: 40, cat_producto: CAT_PRODUCTO[11],clasificacion: "Unidad DVD-RW USB Externa"},
    { id: 41, cat_producto: CAT_PRODUCTO[11],clasificacion: "Teclado"},
    { id: 42, cat_producto: CAT_PRODUCTO[11],clasificacion: "Mouse"},
    { id: 43, cat_producto: CAT_PRODUCTO[12],clasificacion: "Módulo de Baterías Externas"},
    { id: 44, cat_producto: CAT_PRODUCTO[12],clasificacion: "UPS"},
    { id: 45, cat_producto: CAT_PRODUCTO[13],clasificacion: "Escáner"},
] as const

type CatProductoMarca = {
    id: number
    nombre: string
}

const CAT_PRODUCTO_MARCA : CatProductoMarca[] = [
    { id: 1, nombre: 'Dell'},
    { id: 2, nombre: 'Asus'},
    { id: 3, nombre: 'HP'},
] as const

type ProductoMarcaModelo = {
    id: number
    producto: Producto
    cat_producto_marca: CatProductoMarca
    modelo: string
}

const PRODUCTO_MARCA_MODELO : ProductoMarcaModelo[] = [
    { id: 1, producto: PRODUCTO[0], cat_producto_marca: CAT_PRODUCTO_MARCA[0], modelo: 'Optiplex 3070' },
    { id: 2, producto: PRODUCTO[0], cat_producto_marca: CAT_PRODUCTO_MARCA[0], modelo: 'Optiplex 5950' },
    { id: 3, producto: PRODUCTO[1], cat_producto_marca: CAT_PRODUCTO_MARCA[0], modelo: 'Inpsiron 13' },
    { id: 3, producto: PRODUCTO[1], cat_producto_marca: CAT_PRODUCTO_MARCA[0], modelo: 'Inpsiron 15 5000' },
    { id: 4, producto: PRODUCTO[1], cat_producto_marca: CAT_PRODUCTO_MARCA[0], modelo: 'Inpsiron 15 5570' },
] as const

function FormProducto() {
    const [catProducto, setCatProducto] = useState<CatProducto | null>(null)
    const [producto, setProducto] = useState<Producto | null>(null)
    const [catProductoMarca, setCatProductoMarca] = useState<CatProductoMarca | null>(null)
    const [productoMarcaModelo, setProductoMarcaModelo] = useState<ProductoMarcaModelo | null>(null)

    function handleChangeCatProducto(value: typeof catProducto) {
        setCatProducto(value)
        setProducto(null)
    }

    function handleChangeProducto(value: typeof producto) {
        setProducto(value)
        setCatProductoMarca(null)
    }

    function handleChangeCatProductoMarca(value: typeof catProductoMarca) {
        setCatProductoMarca(value)
    }

    return (
        <FieldSet>
            <FieldGroup className="grid grid-cols-2">
                <Field>
                    <FieldLabel htmlFor="cat_producto_id">Tipo de Producto</FieldLabel>
                    <Combobox
                        items={CAT_PRODUCTO}
                        itemToStringLabel={(item: typeof CAT_PRODUCTO[number]) => item.nombre}
                        autoHighlight
                        onValueChange={handleChangeCatProducto}
                    >
                        <ComboboxInput id="cat_producto_id" placeholder="Selecciona una opción"/>
                        <ComboboxContent>
                            <ComboboxEmpty>No se encontró ninguna opción</ComboboxEmpty>
                            <ComboboxList>
                                {(item: CatProducto) => (
                                    <ComboboxItem key={item?.id} value={item}>
                                        {item?.nombre}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </Field>

                <Field data-disabled={! catProducto}>
                    <FieldLabel htmlFor="producto_id">Clasificación del Producto</FieldLabel>
                    <Combobox
                        items={ catProducto
                            ? PRODUCTO.filter((item: typeof producto) => item?.cat_producto?.id === catProducto.id )
                            : undefined }
                        itemToStringLabel={(item: typeof PRODUCTO[number]) => item.clasificacion}
                        autoHighlight
                        onValueChange={handleChangeProducto}
                    >
                        <ComboboxInput id="producto_id" placeholder="Selecciona una opción" disabled={! catProducto} />
                        <ComboboxContent>
                            <ComboboxEmpty>No se encontró ninguna opción</ComboboxEmpty>
                            <ComboboxList>
                                {(item: Producto) => (
                                    <ComboboxItem key={item.id} value={item}>
                                        {item.clasificacion}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-2">
                <Field data-disabled={! producto}>
                    <FieldLabel htmlFor="marca_id">Marca del bien:</FieldLabel>
                    <Combobox
                        items={producto
                            ? CAT_PRODUCTO_MARCA.filter((cat_producto_marca: typeof catProductoMarca) => {
                                    return PRODUCTO_MARCA_MODELO.filter((producto_marca_modelo: typeof productoMarcaModelo) => {
                                        return producto_marca_modelo?.producto.id == producto.id && producto_marca_modelo?.cat_producto_marca.id == cat_producto_marca?.id
                                    })
                                })
                            : undefined
                        }
                        itemToStringLabel={(cat_producto_marca: typeof CAT_PRODUCTO_MARCA[number]) => cat_producto_marca.nombre}
                        onValueChange={handleChangeCatProductoMarca}
                        autoHighlight
                    >
                        <ComboboxInput id="marca_id" placeholder="Selecciona una opción" disabled={! producto} />
                        <ComboboxContent>
                            <ComboboxEmpty>No se encontró ninguna opción</ComboboxEmpty>
                            <ComboboxList>
                                {(item: CatProductoMarca) => (
                                    <ComboboxItem key={item.id} value={item}>
                                        {item.nombre}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </Field>
            </FieldGroup>
        </FieldSet>
    )
}

export default FormProducto
