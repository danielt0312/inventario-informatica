import { FieldLayout, type CoreFieldLayoutProps } from "@/components/ui/field-layout";
import { CreatableCombobox, type ComboboxOption } from "@/components/ui/creatable-combobox";
import { useFieldContext } from "./form-context";
import { isStringNumber } from "@/lib/utils";
import React from "react";

type CreatableComboboxFieldType = number | undefined;

interface CreatableComboboxFieldProps extends Omit<React.ComponentProps<typeof CreatableCombobox>, 'children'>, Omit<CoreFieldLayoutProps, 'children' | 'errors'> {
}

function CreatableComboboxField({
    value,
    className, description, disabled, label, required, orientation, ...creatableComboboxProps
}: CreatableComboboxFieldProps) {
    const field = useFieldContext<CreatableComboboxFieldType>();
    const [actualOption, setActualOption] = React.useState<ComboboxOption | undefined>(value);
    const derivedValue = field.state.value === undefined ? undefined : actualOption;

    return (
        <FieldLayout
            className={className}
            description={description}
            disabled={disabled}
            label={label}
            errors={field.state.meta.errors}
            required={required}
            orientation={orientation}
        >
            <CreatableCombobox
                {...creatableComboboxProps}
                value={derivedValue}
                onValueChange={(v) => {
                    const value = v?.value;
                    field.handleChange(value === undefined || !isStringNumber(value)
                        ? undefined
                        : Number(value)
                    );
                    setActualOption(v);
                }}
                disabled={disabled}
            />
        </FieldLayout>
    );
}

export {
    type CreatableComboboxFieldType,
    type CoreFieldLayoutProps,
    CreatableComboboxField
}
