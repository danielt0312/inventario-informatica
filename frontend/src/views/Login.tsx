import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { FaDoorOpen } from "react-icons/fa"

function Login() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Inicio de sesión</CardTitle>
                </CardHeader>

                <CardContent>
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Usuario:</FieldLabel>
                                <Input placeholder="Ingresa tu nombre de usuario" />
                            </Field>
                            <Field>
                                <FieldLabel>Contraseña:</FieldLabel>
                                <Input placeholder="Ingresa la contraseña" />
                            </Field>

                            <Field>
                                <div className="flex justify-center items-center">
                                    <Button>
                                        <FaDoorOpen /> Ingresar
                                    </Button>
                                </div>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default Login
