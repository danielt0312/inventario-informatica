import { CreatableCombobox } from "@/components/composed/combobox-creatable";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import api from "@/lib/axios";
import type { ResponseCatalogo, TCatalogo } from "@/lib/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export const FieldTipo = () => {
    const queryClient = useQueryClient();
    const { data = [] } = useQuery({
        queryKey: ['disco_tipos'],
        queryFn: () => api.get<{ data: TCatalogo[] }>('api/disco_tipos')
            .then(r => r.data.data)
            .then(data => data.map(v => ({ value: v.id.toString(), label: v.nombre }))),
        staleTime: Infinity
    });

    const [value, setValue] = React.useState('');

    return (
        <CreatableCombobox
            options={data}
            value={value}
            onValueChange={setValue}
            onCreateOption={async (label) => {
                const { data: { data } } = await api.post<ResponseCatalogo>('api/disco_tipos', {
                    nombre: label
                });
                queryClient.invalidateQueries({ queryKey: ['disco_tipos'] });
                return { value: data.id.toString(), label: data.nombre };
            }}
        />
    );
}

export const Form = () => {
    return (
        <FieldGroup>
            <Field>
                <FieldLabel>
                    Tipo:
                </FieldLabel>
                <FieldTipo />
                <FieldError  />
            </Field>
        </FieldGroup>
    );
}
