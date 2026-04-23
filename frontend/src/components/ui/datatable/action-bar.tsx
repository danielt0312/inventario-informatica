import { PlusCircle } from "lucide-react";
import { Button } from "../button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "../dropdown-menu";

export function Filter({
    label,
    children
}: {
    label: string,
    children: React.ReactNode
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button
                    variant="outline"
                    size="sm"
                >
                    <PlusCircle />{label}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    {children}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
