import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

function RootComponent() {
  return (
    <React.Fragment>
        <Outlet />
    </React.Fragment>
  )
}
export const Route = createRootRoute({
    component: RootComponent,
})

