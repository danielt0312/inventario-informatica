import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Link } from "@tanstack/react-router"

import { FaDoorOpen } from "react-icons/fa"

import { Route as RouteInventario } from "@/routes/_auth/inventario/index"

function Login() {
    return (
        <Card className="w-full md:flex-row items-center py-10 md:py-20">
            <CardHeader className="w-full flex justify-center items-center">
                <Logo className="object-fill" />
            </CardHeader>

            <div className="hidden md:block h-50">
                <Separator orientation="vertical" />
            </div>
            <div className="md:hidden w-4/6">
                <Separator orientation="horizontal" />
            </div>

            <CardContent className="w-full">
                {/* <form> */}
                    <FieldGroup>
                        <CardTitle className="text-center text-2xl">Inicia Sesión</CardTitle>
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
                                <Link to={RouteInventario.to} className="w-1/2 flex">
                                    <Button className="flex-1">
                                        <FaDoorOpen /> Ingresar
                                    </Button>
                                </Link>
                            </div>
                        </Field>
                    </FieldGroup>
                {/* </form> */}
            </CardContent>
        </Card>
    )
}

export default Login
