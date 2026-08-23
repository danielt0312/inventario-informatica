// combobox-layout.parts.tsx
"use client"

import * as React from "react"
import { ChevronsUpDownIcon, SearchIcon } from "lucide-react"

import {
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxValue,
  ComboboxTrigger,
  ComboboxInput,
  ComboboxSeparator,
} from "@/components/ui/combobox"
import { Button } from "./button"
import { InputGroupAddon } from "./input-group"
import { cn } from "@/lib/utils"
import type { ComboboxLayoutItem } from "./combobox-layout.shared"

/** Chips seleccionados dentro del input, para `multiple`. Idéntico entre
 * simple y agrupado: no depende de si los items vienen planos o agrupados,
 * solo del valor ya seleccionado. */
export function ComboboxLayoutChips<TItem extends ComboboxLayoutItem>({
  className,
  placeholder,
  renderItem,
}: {
  className?: string
  placeholder?: string
  renderItem: (item: TItem) => React.ReactNode
}) {
  return (
    <ComboboxChips className={className}>
      <ComboboxValue>
        {(value: TItem[]) =>
          value.map((item) => (
            <ComboboxChip key={item.value}>{renderItem(item)}</ComboboxChip>
          ))
        }
      </ComboboxValue>
      <ComboboxChipsInput placeholder={placeholder} />
    </ComboboxChips>
  )
}

/** Trigger por defecto (Button + label + chevron). Se reemplaza por
 * completo pasando `trigger` */
export function ComboboxLayoutTriggerShell<TItem extends ComboboxLayoutItem>({
  trigger,
  placeholder,
  renderItem,
}: {
  trigger?: React.ReactElement
  placeholder?: string
  renderItem: (item: TItem) => React.ReactNode
}) {
  return (
    <ComboboxTrigger
      render={
        trigger ?? (
          <Button variant="outline" className="justify-between font-normal">
            <ComboboxValue>
              {(selectedValue: TItem | null) =>
                selectedValue ? (
                  renderItem(selectedValue)
                ) : (
                  <span className="text-muted-foreground">{placeholder}</span>
                )
              }
            </ComboboxValue>
            <ChevronsUpDownIcon className="text-muted-foreground" />
          </Button>
        )
      }
    />
  )
}

export function ComboboxLayoutSearchInput({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ComboboxInput>, 'children'>) {
  return (
    <>
      <ComboboxInput
        className={cn("ring-0! border-0! bg-transparent!", className)}
        {...props}
      >
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </ComboboxInput>
      <ComboboxSeparator />
    </>
  )
}
