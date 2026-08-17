import { useScannerInput, type UseScannerInputOptions } from "@/hooks/use-scanner-input";
import { Button } from "./button";
import { ScanQrCodeIcon } from "lucide-react";
import { Spinner } from "./spinner";
import React from "react";

type Status = "idle" | "waiting" | "success" | "timeout";
interface ScannerButtonProps extends Omit<React.ComponentProps<typeof Button>, 'children'> {
    onStatusChange?: (status: Status) => void;
    onScannedCode?: UseScannerInputOptions['onScan'];
    timeout?: UseScannerInputOptions['timeout'];
    children?: (status: Status) => React.ReactNode;
}

const defaultChildrenRender = (status: Status) => {
    if (status === 'waiting') {
        return (
            <>
                <Spinner /> Esperando...
            </>
        );
    }

    return (
        <>
            <ScanQrCodeIcon /> Escanear QR
        </>
    );
}

function ScannerButton({
    onStatusChange,
    onScannedCode,
    onClick,
    timeout = 2500,
    children = defaultChildrenRender,
    ...props
}: ScannerButtonProps) {
    const [status, setStatus] = React.useState<Status>("idle");

    const handleStatusChange = React.useCallback((nextStatus: Status) => {
        setStatus(nextStatus);
        onStatusChange?.(nextStatus);
    }, [setStatus, onStatusChange]);

    const handleScan = React.useCallback((code: string) => {
        console.log(code);

        if (!code) {
            handleStatusChange("timeout");
            return;
        }
        handleStatusChange("success");
        onScannedCode?.(code);
    }, []);

    const { inputRef, start, handleKeyDown } = useScannerInput({
        onScan: handleScan,
        onWaiting: (isWating) => handleStatusChange(isWating ? 'waiting' : 'idle'),
        timeout,
    });

    return (
        <>
            <Button
                onClick={(e) => {
                    start();
                    onClick?.(e);
                }}
                disabled={status === 'waiting'}
                variant="outline"
                {...props}
            >
                {children(status)}
            </Button>

            <input
                ref={inputRef}
                onKeyDown={handleKeyDown}
                className="absolute opacity-0 pointer-events-none"
            />
        </>
    );
}

export {
    ScannerButton
}
