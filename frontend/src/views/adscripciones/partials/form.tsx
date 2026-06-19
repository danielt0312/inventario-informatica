import { toOptions } from "@/lib/utils";
import { useAdscripcionQuery } from "./queries";
import { CreatableComboboxField } from "@/components/composed/@tanstack/form/field-components";
import type { TOmitCreatableComboboxFieldsProps } from "@/components/composed/@tanstack/form/field-components";

export function AdscripcionField({
    ...props
}: TOmitCreatableComboboxFieldsProps) {
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
