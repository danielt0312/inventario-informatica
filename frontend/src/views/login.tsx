import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import api from "@/lib/axios"

import { FaDoorOpen } from "react-icons/fa"

function Login() {
    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        api.get('sanctum/csrf-cookie').then(() => {
            api.post('api/login', document.getElementById('login-form'))
                .then(() => {

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
                <form onSubmit={handleSubmit} id="login-form">
                    <FieldGroup>
                        <CardTitle className="text-center text-2xl">Inicia Sesión</CardTitle>
                        <Field>
                            <FieldLabel aria-required>Email:</FieldLabel>
                            <Input placeholder="Ingresa correo institucional" required type="email" />
                        </Field>
                        <Field>
                            <FieldLabel>Contraseña:</FieldLabel>
                            <Input placeholder="Ingresa la contraseña" required type="password" />
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
