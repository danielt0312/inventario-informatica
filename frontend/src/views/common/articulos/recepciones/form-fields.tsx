import { useFieldContext, withFieldGroup } from "@/components/composed/@tanstack/form/form";
import { RadioGroupField, RadioGroupFieldItem } from "@/components/composed/@tanstack/form/radio-group-field";
import { TextareaField } from "@/components/composed/@tanstack/form/textarea-field";
import { resultadoEsperadoFieldGroupDefaultValues } from "./form-schema";
import { useStore } from "@tanstack/react-form";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export type ObservacionesField = string | null;
export const ObservacionesField = ({
    label = "Observaciones/Aclaraciones",
    placeholder = "Ingresa cualquier observación, aclaración, o nota importante a declarar",
    ...props
}: React.ComponentProps<typeof TextareaField>) => {
    const field = useFieldContext<ObservacionesField>();

    return (
        <TextareaField
            label={label}
            value={field.state.value ?? ''}
            onChange={(e) => {
                const value = e.target.value;
                field.handleChange(value.trim().length === 0 ? null : value);
            }}
            placeholder={placeholder}
            {...props}
        />
    );
};

export type ResultadoEsperadoField = boolean | null;
export const ResultadoEsperadoField = ({
    label = "¿Es el resultado esperado?",
    className,
    ...props
}: Omit<React.ComponentProps<typeof RadioGroupField>, 'children'>) => {
    const field = useFieldContext<ResultadoEsperadoField>();

    return (
        <RadioGroupField
            label={label}
            value={field.state.value === true
                ? 'true'
                : field.state.value === false
                    ? 'false'
                    : ''
            }
            onValueChange={(value) => field.handleChange(
                value === 'true'
                    ? true
                    : value === 'false'
                        ? false
                        : null
            )}
            className={cn("**:data-[slot='radio-group']:flex **:data-[slot='radio-group']:gap-7 **:data-[slot='field']:max-w-fit", className)}
            {...props}
        >
            <RadioGroupFieldItem value="true" label="Si" />
            <RadioGroupFieldItem value="false" label="No" />
        </RadioGroupField>
    );
};

const defaultProps: Omit<React.ComponentProps<typeof FieldGroup>, 'children'> = {}
export const ResultadoEsperadoFieldGroup = withFieldGroup({
    defaultValues: resultadoEsperadoFieldGroupDefaultValues,
    props: defaultProps,
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
