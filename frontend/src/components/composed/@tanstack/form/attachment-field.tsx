import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeftRightIcon, EyeIcon, FileTextIcon, RotateCcwIcon, UploadIcon } from "lucide-react";
import type { Archivo } from "@/types/documentos";
import type { LaravelValidationErrors, TResponse } from "@/types/generics";
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle, AttachmentTrigger } from "@/components/ui/attachment";
import { Field, type FieldProps } from "../../field";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useFieldContext } from "./form";
import { useStore } from "@tanstack/react-form";
import { formatFileSize } from "@/lib/utils";
import type { AxiosError, AxiosResponse } from "axios";
import { Spinner } from "@/components/ui/spinner";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";

type AttachmentState = React.ComponentProps<typeof Attachment>['state'];

export interface AttachmentFieldProps extends Omit<React.ComponentProps<typeof Attachment>, 'children' | 'state'>, Omit<FieldProps, 'orientation' | 'errors'> {
    fieldOrientation?: FieldProps['orientation'];
}

export type AttachmentField = string | undefined;
export function AttachmentField({
    className,
    description,
    disabled,
    label,
    required,
    fieldOrientation,
    ...props
}: AttachmentFieldProps) {
    const field = useFieldContext<AttachmentField>();
    const value = useStore(field.store, (state) => state.value);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [file, setFile] = React.useState<File | undefined>(undefined);
    const [archivo, setArchivo] = React.useState<Archivo | undefined>(undefined);
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

    const attachmentTitle = !!archivo
        ? `${archivo.nombre}.${archivo.extension}`
        : !!file
            ? file.name
            : 'Subir archivo';

    const attachmentDescription = !!archivo
        ? formatFileSize(archivo.size)
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
                    <AttachmentTitle>{attachmentTitle}</AttachmentTitle>
                    <AttachmentDescription>{attachmentDescription}</AttachmentDescription>
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

                    {status === 'success' && !!archivo && (
                        <AttachmentActionSeeDocument archivo={archivo} />
                    )}

                    {(!!file || !!archivo) && (
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
