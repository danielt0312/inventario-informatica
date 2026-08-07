import * as f from "@/components/composed/@tanstack/form/form";

const useFieldContext = () => f.useFieldContext<string | undefined>();

export {
    useFieldContext as useArchivoFieldContext
}
