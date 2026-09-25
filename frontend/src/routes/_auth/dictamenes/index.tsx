import { DictamenTable } from "@/components/features/dictamenes/table";
import { ProductoMarcaField } from "@/components/features/productos/marcas/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppForm } from "@/components/ui/form.shared";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_auth/dictamenes/')({
    component: RouteComponent
});

function RouteComponent() {
    const form = useAppForm({})

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Dictámenes Tecnológicos
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form.AppForm>
                    <form.AppField  name="" children={() => <ProductoMarcaField />} />
                </form.AppForm>

                <DictamenTable />
            </CardContent>
        </Card>
    );
}
