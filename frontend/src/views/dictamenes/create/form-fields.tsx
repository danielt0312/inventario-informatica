import { TextField } from "@/components/composed/@tanstack/form/field-components";
import { withFieldGroup } from "@/components/composed/@tanstack/form/form";
import { FieldGroup } from "@/components/ui/field";
import { TipoField } from "@/views/common/productos/tipos/partials/form-fields";
import { useState } from "react";
import { productoFieldsGroupDefaultValues } from "./form-schema";
import { NumeroInventarioField } from "@/views/common/numero-inventario/form-fields";
import { cn, DictamenProducto } from "@/lib/utils";

const defaultProps: React.ComponentProps<typeof FieldGroup> = {}
export const ProductoFieldGroup = withFieldGroup({
    defaultValues: productoFieldsGroupDefaultValues,
    props: defaultProps,
    render: ({ group, className, ...props }) => {
        const [showNumeroInventarioField, setShowNumeroInventarioField] = useState(false);

        return (
            <FieldGroup className={cn("flex flex-col", className)} {...props}>
                <group.AppField
                    name="producto_tipo_id"
                    children={() => <TipoField />}
                    listeners={{
                        onChange: ({ value }) => {
                            const requiereNumeroInventario = DictamenProducto.tipoRequiereNumeroInventario(value);

                            setShowNumeroInventarioField(requiereNumeroInventario);

                            if (!requiereNumeroInventario) {
                                group.setFieldValue('numero_inventario', '');
                            }
                        }
                    }}
                />

                {showNumeroInventarioField && (
                    <group.AppField
                        name="numero_inventario"
                        children={() => <NumeroInventarioField />}
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
