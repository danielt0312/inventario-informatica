import { toOptions } from "@/lib/utils";
import { useEmpleadoQuery } from "./queries";
import { CreatableComboboxField } from "@/components/composed/@tanstack/form-field";
import type { OmitCreatableComboboxFieldsProps } from "@/lib/types";

export function EmpleadoField({
    adscripcion,
    ...props
}: OmitCreatableComboboxFieldsProps & {
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
