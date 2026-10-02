import { DictamenTable } from "@/components/features/dictamenes/table";
import { productoQueryOptions } from "@/components/features/productos/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ComboboxChangeEventDetails } from "@/components/ui/combobox";
import { ComboboxFieldSimple } from "@/components/ui/combobox-field-simple";
import { useComboboxFieldContext, useComboboxFieldValue } from "@/components/ui/combobox-field.shared";
import { toComboboxItems } from "@/components/ui/combobox-layout.shared";
import { useAppForm } from "@/components/ui/form.shared";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute('/_auth/dictamenes/')({
    component: RouteComponent
});

function RouteComponent() {
    const form = useAppForm({
        defaultValues: {
            modelo: ''
        }
    })

    // fuera del componente, para que sea estable
    const buildModeloItem = (value: string) => ({ value, label: value })

    // verifica estos nombres en el tipo ComboboxChangeEventDetails de tu ./combobox
    const BLUR_REASONS: ReadonlySet<ComboboxChangeEventDetails['reason']> = new Set(["outside-press", "focus-out"])

    const Modelo = () => {
        const { data: items = [] } = useQuery({
            ...productoQueryOptions(),
            select: (data) => toComboboxItems(
                [...new Map(data.map((d) => [d.descripcion, d])).values()],
                (d) => ({
                    label: d.descripcion,
                    value: d.descripcion,
                })),
        })

        const field = useComboboxFieldContext<undefined, false, string>()
        const [query, setQuery] = React.useState("")
        const typedRef = React.useRef("") // último texto TECLEADO por el usuario

        // La lista = catálogo + lo necesario para que el valor del field siempre exista
        const allItems = React.useMemo(() => {
            const extras: typeof items = []
            const current = field.state.value

            if (current && !items.some((i) => i.value === current)) {
                extras.push(buildModeloItem(current))
            }

            const typed = query.trim().toLowerCase()
            if (typed && ![...items, ...extras].some((i) => i.label.trim().toLowerCase() === typed)) {
                extras.push(buildModeloItem(query.trim()))
            }

            return extras.length ? [...items, ...extras] : items
        }, [items, field.state.value, query])

        React.useEffect(() => console.log("objeto seleccionado cambió"), [field.state.value])

        // Confirmar el texto cuando el popup se cierra por pérdida de foco
        const handleOpenChange = (open: boolean, details: ComboboxChangeEventDetails) => {
            if (open) return

            const typed = typedRef.current.trim()
            typedRef.current = "" // cualquier cierre descarta el texto pendiente

            if (typed && BLUR_REASONS.has(details.reason)) {
                const match = allItems.find(
                    (i) => i.label.trim().toLowerCase() === typed.toLowerCase()
                )
                field.handleChange((match ?? buildModeloItem(typed)).value)
            }
        }

        return (
            <ComboboxFieldSimple
                items={allItems} // importante: los items con extras, no solo el catálogo
                triggerVariant="input"
                onInputValueChange={(value, details) => {
                    console.log('inputValue changed to', value);

                    setQuery(value)
                    if (details.reason === "input-change") typedRef.current = value
                }}
                onOpenChange={handleOpenChange}
                onFieldValueChange={(item) => {
                    typedRef.current = "" // al seleccionar, no queda nada pendiente
                    return item?.value
                }}
                multiple={false}
            />
        )
    }

    return (
        <Card>
            {/* <form.AppForm>
                <form.AppField
                    name="modelo"
                    children={() => <Modelo />}
                    listeners={{
                        onChange: ({ value }) => console.log('fieldValue changed to', value)
                    }}
                />
            </form.AppForm> */}

            <CardHeader>
                <CardTitle>
                    Dictámenes Tecnológicos
                </CardTitle>
            </CardHeader>

            <CardContent>
                <DictamenTable />
            </CardContent>
        </Card>
    );
}
