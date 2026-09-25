import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ComboboxFieldSimple, type ComboboxFieldSimpleProps } from "@/components/ui/combobox-field-simple";
import React from "react";
import type { InferComboboxItemFromFn } from "@/components/ui/combobox-layout.shared";
import type { AdscripcionFieldType } from "../adscripciones/field";
import { empleadosQueryOptions } from "./queries";

type FieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>;

type FieldProps<Multiple extends boolean | undefined = false> = Omit<
    ComboboxFieldSimpleProps<
        InferComboboxItemFromFn<typeof toComboboxCatalogItems>,
        Multiple
    >,
    'items' | 'enabled'
> & {
    adscripcionId?: AdscripcionFieldType<false>;
}

function Field<Multiple extends boolean | undefined = false>({
    adscripcionId,
    layout,
    disabled,
    ...props
}: FieldProps<Multiple>) {
    const { data = [] } = useQuery({
        ...empleadosQueryOptions(adscripcionId),
        enabled: !disabled
    });

    const items = React.useMemo(() => toComboboxCatalogItems(data), [data]);

    return (
        <ComboboxFieldSimple
            items={items}
            disabled={disabled}
            layout={{
                label: "Resguardante",
                ...layout
            }}
            {...props}
        />
    );
}

export {
    Field as EmpleadoField,
    type FieldType as EmpleadoFieldType
}
