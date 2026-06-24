import { TextField } from "@/components/composed/@tanstack/form/field-components";
import { withFieldGroup } from "@/components/composed/@tanstack/form/form";
import { FieldGroup } from "@/components/ui/field";
import { ProductoTipo } from "@/lib/constants";
import { TipoField } from "@/views/common/productos/tipos/partials/form-fields";
import type React from "react";
import { useState } from "react";
import { productoFieldsGroupDefaultValues } from "./form-schema";
import { NumeroInventarioField } from "@/views/common/numero-inventario/form-fields";

const defaultProps: React.ComponentProps<typeof FieldGroup> = {}

export const ProductoFieldGroup = withFieldGroup({
    defaultValues: productoFieldsGroupDefaultValues,
    props: defaultProps,
    render: ({ group, className, ...props }) => {
        const [showNumeroInventarioField, setShowNumeroInventarioField] = useState(false);

        return (
            <FieldGroup className="flex flex-col" {...props}>
                <group.AppField
                    name="producto_tipo_id"
                    children={() => <TipoField />}
                    listeners={{
                        onChange: ({ value }) => {
                            const esComputadora = ProductoTipo.esCategoriaComputadora(value);
                            setShowNumeroInventarioField(esComputadora);

                            if (!esComputadora) {
                                group.setFieldValue('numero_inventario', '');
                            }
                        }
                    }}
                />

                {showNumeroInventarioField && (
                    <group.AppField
                        name="numero_inventario"
                        children={(field) => (
                            <>
                                <NumeroInventarioField />
                                {console.log(field.state.meta.errors)}
                            </>
                        )}
                    />
                )}
            </FieldGroup>
        );
    }
});

export const CantidadField = ({
    label = "Cantidad",
    placeholder = "Ingresa la cantidad solicitada",
    ...props
}: React.ComponentProps<typeof TextField>) => (
    <TextField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);
