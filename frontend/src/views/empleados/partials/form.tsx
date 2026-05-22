import { toOptions } from "@/lib/utils";
import { useEmpleadoQuery } from "./queries";
import { CreatableComboboxField } from "@/components/composed/@tanstack/form-field";
import type { IdValue, OmitCreatableComboboxFieldsProps } from "@/lib/types";

export function EmpleadoField({
    adscripcion,
    ...props
}: OmitCreatableComboboxFieldsProps & {
    adscripcion: IdValue
}) {
    const { data = [] } = useEmpleadoQuery({
        select: toOptions,
        adscripciones: adscripcion ? [adscripcion] : []
    });

    return (
        <CreatableComboboxField
            options={data}
            enabled={!adscripcion}
            {...props}
        />
    );
}
