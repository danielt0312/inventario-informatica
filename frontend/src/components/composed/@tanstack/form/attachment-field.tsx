import React from "react";
import { Attachment } from "../../attachment";
import { useFieldContext } from "./form";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { LaravelValidationErrors, TResponse } from "@/types/generics";
import type { Archivo } from "@/types/documentos";
import api from "@/lib/axios";

export type AttachmentField = Attachment;
export function AttachmentField({
    archivo: initialState,
    ...props
}: AttachmentFieldProps) {
    const field = useFieldContext<AttachmentField>();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [file, setFile] = React.useState<File | undefined>(undefined);
    const [archivo, setArchivo] = React.useState(initialState);

    const { mutateAsync, status } = useMutation<AxiosResponse<TResponse<Archivo>>, AxiosError<LaravelValidationErrors>, File>({
        mutationFn: (file) => {
            setArchivo(undefined);
            field.setErrorMap({ onChange: undefined });
            const formData = new FormData;
            formData.append('archivo', file);
            return api.post('api/archivos', formData);
        },
        onSuccess: (data) => {
            const archivo = data.data.data;
            setArchivo(archivo);
            field.handleChange(archivo.uuid);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || error.message;
            field.setErrorMap({
                onChange: errorMessage
            });
        }
    });

    const initialStateIsDefined = initialState !== undefined;

    const title = initialStateIsDefined
        ? `${initialState.nombre}.${initialState.extension}`
        : !!file
            ? file.name
            : 'Subir archivo';

    const description = initialStateIsDefined
        ? formatFileSize(initialState.size)
        : !!file
            ? formatFileSize(file.size)
            : 'Presiona aquí para seleccionar un archivo';

    const state: AttachmentState = status === 'pending'
        ? 'processing'
        : status === 'success'
            ? 'done'
            : status;

    const fieldProps: FieldProps = { className, description, disabled, errors: field.state.meta.errors, label, required, orientation: fieldOrientation };

    return (
        <Field {...fieldProps}>
            <Attachment state={state} {...props}>
                <AttachmentMedia>
                    {status === 'idle'
                        ? <UploadIcon />
                        : status === 'pending'
                            ? <Spinner />
                            : <FileTextIcon />
                    }
                </AttachmentMedia>
                <AttachmentContent>
                    <AttachmentTitle>{title}</AttachmentTitle>
                    <AttachmentDescription>{description}</AttachmentDescription>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            setFile(file);

                            if (file) {
                                await mutateAsync(file);
                            } else {
                                field.handleChange(undefined);
                            }
                            e.target.value = '';
                        }}
                    />
                </AttachmentContent>
                {!value && <AttachmentTrigger onClick={() => inputRef.current?.click()} disabled={disabled} aria-disabled={disabled} />}
                <AttachmentActions>
                    {status === 'error' && file && (
                        <Tooltip>
                            <TooltipContent>
                                Reintentar
                            </TooltipContent>
                            <TooltipTrigger asChild onClick={async () => await mutateAsync(file)}>
                                <AttachmentAction>
                                    <RotateCcwIcon />
                                </AttachmentAction>
                            </TooltipTrigger>
                        </Tooltip>
                    )}

                    {!!initialState && (
                        <AttachmentActionSeeDocument archivo={initialState} />
                    )}

                    {(!!file || !!initialState) && (
                        <Tooltip>
                            <TooltipContent>
                                Elegir otro archivo
                            </TooltipContent>
                            <TooltipTrigger asChild>
                                <AttachmentAction disabled={status === 'pending'} onClick={() => inputRef.current?.click()}>
                                    <ArrowLeftRightIcon />
                                </AttachmentAction>
                            </TooltipTrigger>
                        </Tooltip>
                    )}
                </AttachmentActions>
            </Attachment>
        </Field>
    );
}

function AttachmentActionSeeDocument({ archivo }: { archivo: Archivo }) {
    const { mutate } = useFilePreviewWindowMutation();

    return (
        <Tooltip>
            <TooltipContent>
                Ver documento
            </TooltipContent>
            <TooltipTrigger asChild>
                <AttachmentAction onClick={() => mutate({ title: archivo.nombre, uuid: archivo.uuid })}>
                    <EyeIcon />
                </AttachmentAction>
            </TooltipTrigger>
        </Tooltip>
    );
}
