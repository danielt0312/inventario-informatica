import { CreateResguardoView } from '@/components/features/resguardos/create/form';
import { createFileRoute } from '@tanstack/react-router'
import GoBackButton from '@/components/Goback';

export const Route = createFileRoute('/_auth/resguardos/crear')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <GoBackButton />

            <CreateResguardoView />
        </>
    );
}
