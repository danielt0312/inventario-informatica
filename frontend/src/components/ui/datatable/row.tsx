'use client';

import { EllipsisVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../dropdown-menu";
import { Button } from "../button";
import type { DataTableProps } from "../datatable";
import { Checkbox } from "../checkbox";
import type { Row } from "@tanstack/react-table";

export function RowAction({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 data-[state=open]:bg-accent">
              <span className="sr-only">Abrir menú</span>
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {children}
          </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function AllRowSelected<TData>({
    table
}: DataTableProps<TData>) {
    return (
        <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
        />
    )
}

export function RowSelected<TData>({
    row
} : {
    row: Row<TData>
}) {
    return (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
        />
    );
}
