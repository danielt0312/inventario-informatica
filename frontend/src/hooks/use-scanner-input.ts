import React from "react";

interface UseScannerInputOptions {
    onScan: (code: string) => void;
    onWaiting?: (isWaiting: boolean) => void;
    timeout: number;
}

function useScannerInput({
    onScan,
    onWaiting,
    timeout = 2500,
}: UseScannerInputOptions) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(timeout);

    const start = React.useCallback(() => {
        onWaiting?.(true);

        // focus on next tick so the element is definitely mounted/visible
        requestAnimationFrame(() => inputRef.current?.focus());

        timeoutRef.current = setTimeout(() => {
            onWaiting?.(false);
            onScan("");
        }, timeout);
    }, [onScan, timeout]);

    // const stop = React.useCallback(() => {
    //     onWaiting?.(false);
    //     clearTimeout(timeoutRef.current);
    //     if (inputRef.current) inputRef.current.value = "";
    // }, []);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            const code = inputRef.current?.value.trim() ?? "";
            clearTimeout(timeoutRef.current);
            onWaiting?.(false);
            if (code) onScan(code);
            if (inputRef.current) inputRef.current.value = "";
        }
    }

    return { inputRef, start, handleKeyDown };
}

export {
    useScannerInput,
    type UseScannerInputOptions
}

