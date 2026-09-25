import GoBackButton from '@/components/Goback';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CrearDictamenForm } from '@/components/features/dictamenes/crear/form';
import { createFileRoute } from '@tanstack/react-router'
import { dictamenFormActionGetTitle, DictamenFormActionWizard } from '@/components/features/dictamenes/form-action/wizard-layout';

export const Route = createFileRoute('/_auth/dictamenes/crear')({
    component: RouteComponent
});

function RouteComponent() {
    return (
        <>
            <GoBackButton />

            <DictamenFormActionWizard>
                <CardHeader>
                    <CardTitle>
                        {dictamenFormActionGetTitle().toUpperCase()}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CrearDictamenForm />
                </CardContent>
            </DictamenFormActionWizard>
        </>
    );
}
