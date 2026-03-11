import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { FaDoorOpen } from "react-icons/fa"

import api from "@/lib/axios"
import { useNavigate } from "@tanstack/react-router"
import { Route as RouteInventario } from "@/routes/_auth/inventario"

function Login() {
    const navigate = useNavigate();

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        api.get('sanctum/csrf-cookie').then(() => {
            api.post('login', document.getElementById('login-form'))
                .then(() => {
                    return navigate({ to: RouteInventario.to })
                });
        });
    }

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
                <CardTitle className="text-center text-2xl">Inicia Sesión</CardTitle>
                <form onSubmit={handleSubmit} id="login-form">
                    <FieldGroup>
                        <Field>
                            <FieldLabel aria-required>Email:</FieldLabel>
                            <Input name="email" type="email" required placeholder="Ingresa correo institucional" />
                        </Field>
                        <Field>
                            <FieldLabel>Contraseña:</FieldLabel>
                            <Input name="password" type="password" required placeholder="Ingresa la contraseña" />
                        </Field>

                        <Field>
                            <div className="flex justify-center items-center">
                                <Button className="flex-1">
                                    <FaDoorOpen /> Ingresar
                                </Button>
                            </div>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}

export default Login
