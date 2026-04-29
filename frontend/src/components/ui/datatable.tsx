"use client"

import {
  flexRender,
  type Table as TTable,
  type Column
} from "@tanstack/react-table"

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  EyeOff,
  PlusCircle
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Button } from "./button"

import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "./dropdown-menu"
import type { TCatalogo } from "@/lib/types"
import type { Dispatch, SetStateAction } from "react"

interface DataTableProps<TData> {
  table: TTable<TData>,
  contentStatus?: React.ReactNode
}

function DataTable<TData>({
  table,
  contentStatus = 'Sin información'
}: DataTableProps<TData>) {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24">
                <div className="flex h-full items-center justify-center">
                    {contentStatus}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function DataTablePagination<TData>({
  table
}: DataTableProps<TData>) {
  const paginationSize = [10, 25, 50, 100] as const;

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <>
            {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s)
          </>
        )}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {paginationSize.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm font-medium">filas por página</p>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {table.getPageCount() === 0 ? 0 : table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir a la primer página</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir a la página anterior</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir a la siguiente página</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir a la última página</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

function DataTableColumnHeaderSorting<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() !== 'desc')}
      >
        <span>{title}</span>
        {column.getIsSorted() === "desc" ? (
          <ArrowDown />
        ) : (
          <ArrowUp />
        )}
    </Button>
  )
}

interface DataTableFilterProps {
    label: string
    filters: TCatalogo[]
    selectedFilters: number[],
    setSelectedFilters: Dispatch<SetStateAction<number[]>>
}

function DataTableFilter({
    label,
    filters,
    selectedFilters,
    setSelectedFilters
}: DataTableFilterProps) {
    const handleToggle = (id: number) => {
        setSelectedFilters((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <PlusCircle />{label}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {filters.map((filter) => (
                    <DropdownMenuCheckboxItem
                        key={filter.id}
                        checked={selectedFilters.includes(filter.id)}
                        onCheckedChange={() => handleToggle(filter.id)}
                        onSelect={(e) => e.preventDefault()}
                    >
                        {filter.nombre}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export {
    DataTable,
    DataTablePagination,
    DataTableColumnHeaderSorting,
    DataTableFilter,
    type DataTableProps
}
