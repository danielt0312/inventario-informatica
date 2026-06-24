import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"

import { cleanText, cn } from "@/lib/utils"
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export type ComboboxOption = {
    value: string;
    label: string;
    group?: string;
}

export interface CreatableComboboxProps {
    options: ComboboxOption[];
    value?: string;
    onValueChange?: (value: string) => void;
    onCreateRequest?: (searchValue: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    widthClass?: string;
    disabled?: boolean;
    className?: string;
}

export function CreatableCombobox({
    options,
    value,
    onValueChange,
    onCreateRequest,
    placeholder = "Selecciona una opción",
    searchPlaceholder = "Buscar...",
    emptyMessage = "No se encontraron resultados.",
    widthClass = "w-[280px]",
    disabled = false,
    className
}: CreatableComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const selectedOption = options.find((o) => o.value === value);

    const filteredOptions = React.useMemo(() => {
        if (!search) return options;

        const searchCleaned = cleanText(search);

        if (!searchCleaned) return options;

        const labelMatches = options.filter((o) =>
            cleanText(o.label).includes(searchCleaned)
        );

        if (labelMatches.length > 0) {
            return labelMatches;
        }

        const groupMatches = options.filter((o) =>
            o.group && cleanText(o.group).includes(searchCleaned)
        );

        return groupMatches;
    }, [options, search]);

    const groups = React.useMemo(() => {
        const map = new Map<string | undefined, ComboboxOption[]>();
        for (const o of filteredOptions) {
            const key = o.group
            if (!map.has(key)) map.set(key, [])
            map.get(key)!.push(o)
        }
        return map;
    }, [filteredOptions]);

    // Validación exacta usando la misma limpieza de texto
    const exactMatchExists = options.some(
        (o) => cleanText(o.label) === cleanText(search)
    );

    const showCreateAction = !!onCreateRequest && search.trim().length > 0 && !exactMatchExists;

    function handleSelect(optionValue: string) {
        onValueChange?.(optionValue === value ? '' : optionValue);
        setOpen(false);
        setSearch('');
    }

    function handleCreateClick() {
        if (onCreateRequest) {
            onCreateRequest(search.trim());
            setOpen(false);
            setSearch('');
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn("justify-between font-normal", widthClass, className)}
                >
                    <span className={cn("truncate", !selectedOption && "text-muted-foreground")}>
                        {selectedOption?.label ?? placeholder}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className={cn("p-0", widthClass)} align="start">
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder={searchPlaceholder}
                        value={search}
                        onValueChange={setSearch}
                    />

                    <CommandList>
                        {!showCreateAction && filteredOptions.length === 0 && (
                            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                                {emptyMessage}
                            </CommandEmpty>
                        )}

                        {[...groups.entries()].map(([groupName, items]) => (
                            <CommandGroup key={groupName ?? "__ungrouped"} heading={groupName}>
                                {items.map((o) => (
                                    <CommandItem
                                        key={o.value}
                                        value={o.value}
                                        onSelect={() => handleSelect(o.value)}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === o.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {o.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))}

                        {showCreateAction && (
                            <>
                                {filteredOptions.length > 0 && <CommandSeparator />}
                                <CommandGroup>
                                    <CommandItem
                                        value={`__create__${search}`}
                                        onSelect={handleCreateClick}
                                        className="gap-2 text-primary cursor-pointer font-medium"
                                    >
                                        <PlusCircle className="h-4 w-4 shrink-0" />
                                        <span>
                                            Crear &ldquo;{search.trim()}&rdquo;
                                        </span>
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
