import { EllipsisVertical } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";

export function ActionMenu({
    children,
    ...props
}: React.ComponentProps<typeof Button>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    {...props}
                >
                    <span className="sr-only">Abrir menú</span>
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export {
    DropdownMenuItem as ActionMenuItem,
    DropdownMenuSeparator as ActionMenuSeparator,
    DropdownMenuLabel as ActionMenuLabel
}
