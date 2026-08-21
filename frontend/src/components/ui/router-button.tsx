import { createLink } from '@tanstack/react-router'
import { forwardRef } from 'react'
import { TooltipButton } from './tooltip-button'

export const RouterButton = createLink(
  forwardRef<HTMLButtonElement, React.ComponentProps<typeof TooltipButton>>((props, ref) => {
    return <TooltipButton ref={ref} {...props} />
  }),
)
