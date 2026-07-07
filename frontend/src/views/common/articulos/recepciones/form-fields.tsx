import { withFieldGroup } from "@/components/composed/@tanstack/form/form";
import { NullableTextareaField } from "@/components/composed/@tanstack/form/textarea-field";
import { resultadoEsperadoFieldGroupDefaultValues } from "./form-schema";
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

export type ResultadoEsperadoField = BooleanField;
export const ResultadoEsperadoField = ({
    label = "¿Es el resultado esperado?",
    ...props
}: React.ComponentProps<typeof BooleanField>) => (
    <BooleanField label={label} {...props} />
);

export const ResultadoEsperadoFieldGroup = withFieldGroup({
    defaultValues: resultadoEsperadoFieldGroupDefaultValues,
    props: {} as Omit<React.ComponentProps<typeof FieldGroup>, 'children'>,
    render: ({ group, className, ...props }) => {
        const resultadoEsperado = useStore(group.store, (state) => state.values.resultado_esperado);

        return (
            <FieldGroup
                className={cn("flex flex-row gap-7")}
                {...props}
            >
                <group.AppField
                    name="resultado_esperado"
                    children={() => <ResultadoEsperadoField className="w-1/4" />}
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
