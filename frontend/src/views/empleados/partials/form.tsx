import { toOptions } from "@/lib/utils";
import { useEmpleadoQuery } from "./queries";
import { CreatableComboboxField } from "@/components/composed/@tanstack/form-fields";
import type { TOmitCreatableComboboxFieldsProps } from "@/components/composed/@tanstack/form-fields";

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
