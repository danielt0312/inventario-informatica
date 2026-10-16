import { NullableNumberInputField, type NullableNumberInputFieldType } from "@/components/ui/input-field";
import { InputGroupAddon, InputGroupText } from "@/components/ui/input-group";

export type ProcesadorNucleoFieldType = NullableNumberInputFieldType;
export const ProcesadorNucleoField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof NullableNumberInputField>) => (
    <NullableNumberInputField
        fieldLayout={{
            label: "Cantidad de núcleos de CPU",
            ...fieldLayout
        }}
        placeholder="4, 8..."
        {...props}
    />
);

export type ProcesadorHilosFieldType = NullableNumberInputFieldType;
export const ProcesadorHilosField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof NullableNumberInputField>) => (
    <NullableNumberInputField
        fieldLayout={{
            label: "Cantidad de hilos de CPU",
            ...fieldLayout
        }}
        placeholder="4, 8, 12..."
        {...props}
    />
);

export type ProcesadorFrecuenciaMaximaGhzFieldType = NullableNumberInputFieldType;
export const ProcesadorFrecuenciaMaximaGhzField = ({
    fieldLayout,
    ...props
}: React.ComponentProps<typeof NullableNumberInputField>) => (
    <NullableNumberInputField
        fieldLayout={{
            label: "Frecuencia máxima de reloj",
            ...fieldLayout
        }}
        placeholder="2.8, 4.6, 6..."
        {...props}
    >
        <InputGroupAddon align="inline-end">
            <InputGroupText>GHz</InputGroupText>
        </InputGroupAddon>
    </NullableNumberInputField>
);
