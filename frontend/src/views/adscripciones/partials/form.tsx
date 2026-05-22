import { toOptions } from "@/lib/utils";
import { useAdscripcionQuery } from "./queries";
import { CreatableComboboxField } from "@/components/composed/@tanstack/form-field";
import type { OmitCreatableComboboxFieldsProps } from "@/lib/types";

export function AdscripcionField({
    ...props
}: OmitCreatableComboboxFieldsProps) {
    const { data = [] } = useAdscripcionQuery({
        select: toOptions,
    });

    return (
        <CreatableComboboxField
            options={data}
            label="Área de Adscripción"
            {...props}
        />
    );
}
