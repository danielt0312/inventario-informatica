"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// ─── Types ────────────────────────────────────────────────────────────────────

export type ComboboxOption = {
  /** Unique identifier stored as the field value */
  value: string
  /** Human-readable label shown in the list and trigger */
  label: string
  /** Optional group key for grouped lists */
  group?: string
}

export interface CreatableComboboxProps {
  /** List of available options */
  options: ComboboxOption[]
  /** Currently selected value */
  value?: string
  /** Callback when the selected value changes */
  onValueChange?: (value: string) => void
  /**
   * Called when the user confirms a new item in the dialog.
   * Receives the trimmed label. Return (or resolve) the created option
   * so it can be added to the list and auto-selected.
   * If omitted a default slug-like value is generated automatically.
   */
  onCreateOption?: (
    label: string
  ) => ComboboxOption | Promise<ComboboxOption>
  /** Placeholder text shown in the trigger button when nothing is selected */
  placeholder?: string
  /** Placeholder inside the search input */
  searchPlaceholder?: string
  /** Title rendered in the create dialog */
  createDialogTitle?: string
  /** Description rendered below the dialog title */
  createDialogDescription?: string
  /** Label for the name field inside the dialog */
  createFieldLabel?: string
  /** Placeholder for the name field inside the dialog */
  createFieldPlaceholder?: string
  /** Width class applied to both the trigger and the popover (default: w-[280px]) */
  widthClass?: string
  disabled?: boolean
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CreatableCombobox({
  options: initialOptions,
  value,
  onValueChange,
  onCreateOption,
  placeholder = "Selecciona una opción",
  searchPlaceholder = "Buscar...",
  createDialogTitle = "Crear nuevo registro",
  createDialogDescription,
  createFieldLabel = "Nombre",
  createFieldPlaceholder = "Ingresa un valor",
  widthClass = "w-[280px]",
  disabled = false,
  className,
}: CreatableComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [options, setOptions] = React.useState<ComboboxOption[]>(initialOptions)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [newLabel, setNewLabel] = React.useState("")
  const [isCreating, setIsCreating] = React.useState(false)

  // Keep internal options in sync if the parent replaces the list entirely
  React.useEffect(() => {
    setOptions(initialOptions)
  }, [initialOptions])

  const selectedOption = options.find((o) => o.value === value)

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  )

  // Build groups (undefined group → rendered flat)
  const groups = React.useMemo(() => {
    const map = new Map<string | undefined, ComboboxOption[]>()
    for (const o of filteredOptions) {
      const key = o.group
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(o)
    }
    return map
  }, [filteredOptions])

  // Show the "Create …" shortcut only when the exact label isn't already present
  const showCreate =
    search.trim().length > 0 &&
    !options.some(
      (o) => o.label.toLowerCase() === search.trim().toLowerCase()
    )

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleSelect(optionValue: string) {
    onValueChange?.(optionValue === value ? "" : optionValue)
    setOpen(false)
    setSearch("")
  }

  function handleOpenDialog() {
    setNewLabel(search.trim())
    setSearch("")
    setOpen(false)
    // Small delay so the popover finishes closing before the dialog opens
    setTimeout(() => setDialogOpen(true), 80)
  }

  async function handleCreate() {
    const trimmed = newLabel.trim()
    if (!trimmed) return

    setIsCreating(true)
    try {
      let created: ComboboxOption
      if (onCreateOption) {
        created = await onCreateOption(trimmed)
      } else {
        created = {
          value: trimmed.toLowerCase().replace(/\s+/g, "-"),
          label: trimmed,
        }
      }
      setOptions((prev) => [...prev, created])
      onValueChange?.(created.value)
      setDialogOpen(false)
      setNewLabel("")
    } finally {
      setIsCreating(false)
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Combobox trigger + dropdown ──────────────────────────────────── */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            disabled={disabled}
            className={cn(
              "justify-between font-normal",
              widthClass,
              className
            )}
          >
            <span
              className={cn(
                "truncate",
                !selectedOption && "text-muted-foreground"
              )}
            >
              {selectedOption?.label ?? placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className={cn("p-0", widthClass)} align="start">
          <Command>
            <CommandInput
              placeholder={searchPlaceholder}
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              {/* Empty state — only shown when there's nothing AND no create shortcut */}
              {!showCreate && (
                <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                  No se encontraron resultados.
                </CommandEmpty>
              )}

              {/* Option rows — grouped or flat */}
              {[...groups.entries()].map(([groupName, items]) =>
                groupName ? (
                  <CommandGroup key={groupName} heading={groupName}>
                    {items.map((o) => (
                      <OptionItem
                        key={o.value}
                        option={o}
                        selected={value === o.value}
                        onSelect={handleSelect}
                      />
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandGroup key="__ungrouped">
                    {items.map((o) => (
                      <OptionItem
                        key={o.value}
                        option={o}
                        selected={value === o.value}
                        onSelect={handleSelect}
                      />
                    ))}
                  </CommandGroup>
                )
              )}

              {/* Create shortcut */}
              {showCreate && (
                <>
                  {filteredOptions.length > 0 && <CommandSeparator />}
                  <CommandGroup>
                    <CommandItem
                      value={`__create__${search}`}
                      onSelect={handleOpenDialog}
                      className="gap-2 text-primary"
                    >
                      <PlusCircle className="h-4 w-4 shrink-0" />
                      <span>
                        Crear{" "}
                        <span className="font-medium">
                          &ldquo;{search.trim()}&rdquo;
                        </span>
                      </span>
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* ── Create dialog ────────────────────────────────────────────────── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{createDialogTitle}</DialogTitle>
            <DialogDescription>{createDialogDescription}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 py-2">
            <div className="grid gap-2">
              <Label htmlFor="creatable-name">{createFieldLabel}</Label>
              <Input
                id="creatable-name"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder={createFieldPlaceholder}
                disabled={isCreating}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreate()
                  if (e.key === "Escape") setDialogOpen(false)
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={isCreating}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!newLabel.trim() || isCreating}
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function OptionItem({
  option,
  selected,
  onSelect,
}: {
  option: ComboboxOption
  selected: boolean
  onSelect: (value: string) => void
}) {
  return (
    <CommandItem
      key={option.value}
      value={option.value}
      onSelect={onSelect}
    >
      <Check
        className={cn("mr-2 h-4 w-4", selected ? "opacity-100" : "opacity-0")}
      />
      {option.label}
    </CommandItem>
  )
}
