import type { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

export function usePagination (initialState: Partial<PaginationState> = {}) {
    return useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
        ...initialState,
    });
};
