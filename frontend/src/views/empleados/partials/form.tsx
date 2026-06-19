import { toOptions } from "@/lib/utils";
import { useEmpleadoQuery } from "./queries";
import { CreatableComboboxField } from "@/components/composed/@tanstack/form/field-components";
import type { TOmitCreatableComboboxFieldsProps } from "@/components/composed/@tanstack/form/field-components";

export function EmpleadoField({
    adscripcion,
    ...props
}: TOmitCreatableComboboxFieldsProps & {
    adscripcion: string;
}) {
    const { data = [] } = useEmpleadoQuery({
        select: toOptions,
        adscripciones: adscripcion ? [Number(adscripcion)] : []
    });

    return (
        <CreatableComboboxField
            options={data}
            enabled={!adscripcion}
            {...props}
        />
    );
}
