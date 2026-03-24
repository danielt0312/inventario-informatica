import Goback from "@/components/Goback"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import FormProducto from "./partials/forms/producto"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FaSave } from "react-icons/fa"

function InventarioCreate() {
    function sendForm() {
        
    }

    return (
        <>
            <Goback />
            <Card>
                <CardHeader>
                    <CardTitle>Registro de Artículo existente</CardTitle>
                </CardHeader>

                <form action={sendForm}>
                    <CardContent>
                        <FieldSet>
                            <FormProducto />

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

                            <Field>
                                <FieldLabel htmlFor="observaciones">Aclaraciones/Observaciones</FieldLabel>
                                <Textarea id="observaciones" placeholder="Ingresa y/o detalla algúna aclacación/observación a mencionar" />
                            </Field>
                        </FieldSet>
                    </CardContent>

                    <CardFooter className="justify-center">
                        <Button type="submit">
                            <FaSave /> Guardar
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}

export default InventarioCreate
