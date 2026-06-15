import * as React from 'react';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import type { AuthRouteContext } from '@/types/auth';

function RootComponent() {
    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    );
}

export const Route = createRootRouteWithContext<AuthRouteContext>()({
    component: RootComponent
});
