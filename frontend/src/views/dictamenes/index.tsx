import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Table } from "./partials/table";
import { ProductoTipoField } from "@/components/features/productos/tipo-field";
import { useAppForm } from '@/components/ui/app-form';

export function View() {
    const form = useAppForm({})

    return (
        <>
            <form.AppForm>
                <form.AppField name="" children={() => <ProductoTipoField />} />
            </form.AppForm>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Dictámenes Tecnológicos
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <Table />
                </CardContent>
            </Card>
        </>
    );
}
