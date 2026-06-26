import { DatePickerField, FileUploaderField, TextField } from "@/components/composed/@tanstack/form/field-components";
import { withFieldGroup } from "@/components/composed/@tanstack/form/form";
import { FieldGroup } from "@/components/ui/field";
import { TipoField } from "@/views/common/productos/tipos/partials/form-fields";
import React, { useState } from "react";
import { productoFieldsGroupDefaultValues } from "./form-schema";
import { NumeroInventarioField } from "@/views/common/numero-inventario/form-fields";
import { cn, DictamenProducto, toISODate } from "@/lib/utils";

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

export type CantidadField = string;
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

export type FolioField = string;
export const FolioField = ({
    label = "Folio del oficio de solicitud",
    placeholder = "Ingresa el folio del oficio de la solicitud",
    ...props
}: React.ComponentProps<typeof TextField>) => (
    <TextField
        label={label}
        placeholder={placeholder}
        {...props}
    />
);

export type FechaSolicitudField = string;
export const FechaSolicitudField = ({
    label = "Fecha de solicitud",
    parseValue = toISODate,
    placeholder = "Selecciona la fecha de la solicitud",
    ...props
}: React.ComponentProps<typeof DatePickerField>) => (
    <DatePickerField
        label={label}
        placeholder={placeholder}
        parseValue={parseValue}
        {...props}
    />
);

export type ArchivoField = File[] | undefined;
interface ArchivoFieldProps extends Omit<React.ComponentProps<typeof FileUploaderField>, 'accept'> {}
export const ArchivoField = ({
    label = "Adjuntar oficio de solicitud",
    ...props
}: ArchivoFieldProps) => (
    <FileUploaderField
        label={label}
        accept="application/pdf"
        {...props}
    />
);
