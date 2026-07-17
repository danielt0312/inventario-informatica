import { DatePickerField } from "@/components/composed/@tanstack/form/date-picker-field";
import { InputField, NumberInputField } from "@/components/composed/@tanstack/form/input-field";
import { withFieldGroup } from "@/components/composed/@tanstack/form/form";
import { FieldGroup } from "@/components/ui/field";
import { ProductoTipoField } from "@/views/common/productos/tipos/form-fields";
import React, { useState } from "react";
import { productoFieldsGroupDefaultValues } from "./form-schema";
import { NullableNumeroInventarioField } from "@/views/common/articulos/form-fields";
import { cn, DictamenProducto } from "@/lib/utils";
import { PdfFileField } from "@/views/common/archivos/form-fields";

export const ProductoFieldGroup = withFieldGroup({
    defaultValues: productoFieldsGroupDefaultValues,
    props: {} as React.ComponentProps<typeof FieldGroup>,
    render: ({ group, className, ...props }) => {
        const [showNumeroInventarioField, setShowNumeroInventarioField] = useState(false);

        return (
            <FieldGroup className={cn("flex flex-col", className)} {...props}>
                <group.AppField
                    name="producto_tipo_id"
                    children={() => <ProductoTipoField />}
                    listeners={{
                        onChange: ({ value }) => {
                            const requiereNumeroInventario = DictamenProducto.tipoRequiereNumeroInventario(value);

                            setShowNumeroInventarioField(requiereNumeroInventario);

                            if (!requiereNumeroInventario) {
                                group.setFieldValue('numero_inventario', null);
                            }
                        }
                    }}
                />

                {showNumeroInventarioField && (
                    <group.AppField
                        name="numero_inventario"
                        children={() => <NullableNumeroInventarioField />}
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
}: React.ComponentProps<typeof InputField>) => (
    <NumberInputField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);

export type FolioField = InputField;
export const FolioField = ({
    label = "Folio del oficio de solicitud",
    placeholder = "Ingresa el folio del oficio de la solicitud",
    ...props
}: React.ComponentProps<typeof InputField>) => (
    <InputField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);

export type FechaSolicitudField = DatePickerField;
export const FechaSolicitudField = ({
    label = "Fecha de solicitud",
    placeholder = "Selecciona la fecha de la solicitud",
    ...props
}: React.ComponentProps<typeof DatePickerField>) => (
    <DatePickerField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);

export type OficioField = PdfFileField;
export const OficioField = ({
    label = "Adjuntar oficio de solicitud",
    ...props
}: React.ComponentProps<typeof PdfFileField>) => (
    <PdfFileField
        label={label}
        {...props}
    />
);
