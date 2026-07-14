import { withFieldGroup } from "@/components/composed/@tanstack/form/form";
import { NullableTextareaField } from "@/components/composed/@tanstack/form/textarea-field";
import { useStore } from "@tanstack/react-form";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { BooleanField } from "@/components/custom/boolean-field";

export type ObservacionesField = NullableTextareaField;
export const ObservacionesField = ({
    label = "Observaciones/Aclaraciones",
    placeholder = "Ingresa cualquier observación, aclaración, o nota importante a declarar",
    ...props
}: React.ComponentProps<typeof NullableTextareaField>) => (
    <NullableTextareaField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);

export type EsResultadoEsperadoField = BooleanField;
export const EsResultadoEsperadoField = ({
    label = "¿Es el resultado esperado?",
    ...props
}: React.ComponentProps<typeof BooleanField>) => (
    <BooleanField label={label} {...props} />
);


export type RecepcionFieldGroup = {
    es_resultado_esperado: EsResultadoEsperadoField;
    observaciones: ObservacionesField;
}

export const recepcionFieldGroupDefaultValues: RecepcionFieldGroup = {
    es_resultado_esperado: undefined,
    observaciones: null
}

export const RecepcionFieldGroup = withFieldGroup({
    defaultValues: recepcionFieldGroupDefaultValues,
    props: {} as Omit<React.ComponentProps<typeof FieldGroup>, 'children'>,
    render: ({ group, className, ...props }) => {
        const resultadoEsperado = useStore(group.store, (state) => state.values.es_resultado_esperado);

        return (
            <FieldGroup
                className={cn("flex flex-row gap-7", className)}
                {...props}
            >
                <group.AppField
                    name="es_resultado_esperado"
                    children={() => <EsResultadoEsperadoField className="w-1/4" />}
                />

                {resultadoEsperado === false && (
                    <group.AppField
                        name="observaciones"
                        children={() => <ObservacionesField />}
                    />
                )}
            </FieldGroup>
        )
    }
});
