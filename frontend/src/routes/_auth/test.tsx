import { createFileRoute } from '@tanstack/react-router'

import { Input } from '@/components/ui/input'
import { FormField as FormFieldPrimitive } from '@/components/composed/form-field';
import { useAppForm } from '@/components/composed/@tanstack/form';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { handleLaravel422 } from '@/lib/utils';

export const Route = createFileRoute('/_auth/test')({
    component: RouteComponent,
})

function RouteComponent() {
    const form = useAppForm({
        defaultValues: {
            name: '',
            lastName: ''
        },
        // onSubmit: async ({ value, formApi }) => {
        //     try {
        //         await api.post('api/test', value);
        //     } catch (error) {
        //         if (isAxiosError(error) && error.response?.status === 422) {
        //             const serverErrors = error.response.data.errors;
        //             handleLaravel422(formApi, serverErrors);
        //         }
        //     }
        // }
    });

    return (
        <>
            <FormFieldPrimitive label='hello'>
                <Input />
            </FormFieldPrimitive>


            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <form.AppForm>
                    <form.AppField
                        name='name'
                        children={(field) => (
                            <field.FormTextField label='Nombre:' />
                        )}
                    />

                    <form.AppField
                        name='lastName'
                        children={(field) => (
                            <field.FormField>
                                <Input></Input>
                            </field.FormField>
                        )}
                    />
                </form.AppForm>

                <Button type='submit'>
                    Enviar
                </Button>
            </form>
        </>
    );
}
