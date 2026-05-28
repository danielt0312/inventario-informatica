import {
    useState,
    useRef,
    useCallback,
    useEffect
} from "react";

export function useMinSpinning(isFetching: boolean, minDuration = 500) {
    const [isSpinning, setIsSpinning] = useState(false);
    const spinStartRef = useRef<number | null>(null);
    const stopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startSpin = useCallback(() => {
        if (!isSpinning) {
            spinStartRef.current = Date.now();
            setIsSpinning(true);
        }
    }, [isSpinning]);

    useEffect(() => {
        if (!isFetching && isSpinning && spinStartRef.current !== null) {
            const elapsed = Date.now() - spinStartRef.current;
            const remaining = minDuration - elapsed;

            if (remaining <= 0) {
                setIsSpinning(false);
                spinStartRef.current = null;
            } else {
                stopTimeoutRef.current = setTimeout(() => {
                    setIsSpinning(false);
                    spinStartRef.current = null;
                }, remaining);
            }
        }

        return () => {
            if (stopTimeoutRef.current) {
                clearTimeout(stopTimeoutRef.current);
                stopTimeoutRef.current = null;
            }
        };
    }, [isFetching, isSpinning, minDuration]);

    return { isSpinning, startSpin };
}
