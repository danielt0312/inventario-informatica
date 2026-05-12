"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface Option {
  id: number | string;
  nombre: string;
}

export interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  emptyMessage?: () => React.ReactNode
  triggerer: (selected: string[]) => React.ReactNode
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Buscar...",
  emptyMessage = () => "Sin resultados.",
  triggerer
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (value: string) => {
    onChange(selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between gap-2"
        >
          {triggerer(selected)}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto min-w-[200px] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty className="px-5 py-4 text-muted-foreground">{emptyMessage()}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.nombre}
                    onSelect={() => handleSelect(option.id.toString())}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <Checkbox
                        checked={selected.includes(option.id.toString())}
                        className="pointer-events-none"
                      />
                      <span className="flex-1 whitespace-nowrap">
                        {option.nombre}
                      </span>
                    </div>
                  </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
