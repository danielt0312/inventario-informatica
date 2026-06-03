import Logo from "@/components/Logo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import api from "@/lib/axios"
import { useNavigate } from "@tanstack/react-router"
import { Route as InventarioRoute } from "@/routes/_auth/inventario"
import { useQueryClient } from "@tanstack/react-query"

import type { TResponse, User } from '@/lib/types'
import z from "zod"
import { useAppForm } from "@/components/composed/@tanstack/form"
import { handleFormValidationError } from "@/lib/utils"
import { TextField } from "@/components/composed/@tanstack/form-field"
import { RequiredInstitutionalEmail, NonEmptyString } from "@/lib/schemas/common"
import { DoorOpen } from "lucide-react"
import { useState } from "react"
import { FieldError } from "@/components/ui/field"

interface FormSchema {
    email: string;
    password: string;
}

const defaultValues: FormSchema = {
    email: '',
    password: '',
}

const validator = z.object({
    email: RequiredInstitutionalEmail,
    password: NonEmptyString
});

export function View() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [globalError, setGlobalError] = useState<string>()

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: validator,
        },
        onSubmit: async ({ value, formApi }) => {
            const data = validator.parse(value);

            try {
                await api.get('sanctum/csrf-cookie');

                const { data: userData } = await api.post<TResponse<User>>('login', data)
                    .then(r => r.data);

                queryClient.setQueryData(['user'], userData)

                navigate({ to: InventarioRoute.to })
            } catch (error) {
                handleFormValidationError(error, formApi, setGlobalError);
            }
        }
    });

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

            <CardContent className="w-full flex flex-col gap-6">
                <CardTitle className="text-center text-2xl">Inicia Sesión</CardTitle>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                    className="contents"
                >
                    <form.AppForm>
                        <form.AppField
                            name="email"
                            children={() => (
                                <TextField
                                    label="Correo institucional"
                                    placeholder="Ingresa tu correo institucional"
                                />
                            )}
                        />

                        <form.AppField
                            name="password"
                            children={() => (
                                <TextField
                                    label="Contraseña"
                                    type="password"
                                    placeholder="Ingresa tu contraseña"
                                />
                            )}
                        />

                        <FieldError errors={[globalError]} />

                        <form.SubmitButton
                            label="Ingresar"
                            icon={<DoorOpen />}
                            className="max-w-full w-1/2"
                        />
                    </form.AppForm>
                </form>
            </CardContent>
        </Card >
    )
}
