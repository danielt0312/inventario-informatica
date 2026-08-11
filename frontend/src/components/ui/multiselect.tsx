import React from "react";
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
import { PlusCircleIcon } from "lucide-react";
import { Badge } from "./badge";

type Option = {
    id: number;
    nombre: string;
}

export interface MultiSelectProps {
    options: Option[];
    selected: string[];
    onChange: (values: string[]) => void;
    onOptionRender?: (option: Option) => React.ReactNode;
    placeholder?: string;
    emptyMessage?: React.ReactNode;
    triggerer?: (selected: string[]) => React.ReactNode;
    withCountIndicator?: boolean;
    label?: string;
    icon?: React.ReactNode;
}

export function MultiSelect({
    options,
    selected,
    onChange,
    triggerer,
    onOptionRender = (option) => option.nombre,
    label = 'Seleccionar',
    placeholder = "Buscar...",
    emptyMessage = "Sin resultados.",
    withCountIndicator = true,
    icon = <PlusCircleIcon />,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (value: string) => {
        onChange(selected.includes(value)
            ? selected.filter((v) => v !== value)
            : [...selected, value]);
    };

    const triggererComponent: MultiSelectProps['triggerer'] = (selected) => {
        if (triggerer !== undefined) return triggerer(selected);

        return (
            <>
                {withCountIndicator && selected.length > 0
                    ? <Badge className='h-4 min-w-4 px-1 tabular-nums'>{selected.length}</Badge>
                    : icon
                }
                {label}
            </>
        );
    }

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
                    {triggererComponent(selected)}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto min-w-50 p-0" align="start">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandList>
                        <CommandEmpty className="px-5 py-4 text-muted-foreground">{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.id}
                                    value={option.nombre}
                                    onSelect={() => handleSelect(`${option.id}`)}
                                    className="flex items-center gap-2 w-full"
                                >
                                    <Checkbox
                                        checked={selected.includes(`${option.id}`)}
                                        className="pointer-events-none"
                                    />
                                    <span className="flex-1 whitespace-nowrap">
                                        {onOptionRender(option)}
                                    </span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export type { Option as MultiSelectOption }
