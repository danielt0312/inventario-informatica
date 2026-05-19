import { useState } from "react";
import { useDebounce } from "./use-debounce";

export function useDebouncedFilters<TFilters>(
    initialState: TFilters,
    delay?: number
) {
    const [filters, setFilters] = useState<TFilters>(initialState);
    const debouncedFilters = useDebounce<TFilters>(filters, delay);

    return {
        filters,
        setFilters,
        debouncedFilters
    }
}
