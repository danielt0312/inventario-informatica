import React from "react";
import { formatFileSize } from "@/lib/utils";
import { CircleXIcon, FileTextIcon, RotateCcwIcon, UploadIcon } from "lucide-react";
import { TooltipAttachmentAction } from "../ui/tooltip-attachment-action";
import { Spinner } from "../ui/spinner";
import { Attachment } from "../ui/file-uploader";
import { AttachmentContent, AttachmentMedia } from "../ui/attachment";

export type FileAttachment = Attachment;
interface FileAttachmentProps extends React.ComponentProps<typeof Attachment> {
}
export function FileAttachment({
    archivoValue,
    value,
    disabled,
    mutation,
    onSelector,
    ...props
}: FileAttachmentProps) {
    const [archivo, setArchivo] = React.useState(archivoValue);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [file, setFile] = React.useState<File | undefined>(undefined);

    const { mutateAsync, mutate, status } = useUploadFileMutation({
        ...mutation?.options,
        onSuccess: (data, variables, onMutateResult, context) => {
            const archivo = data.data.data;
            setArchivo(archivo);
            mutation?.options?.onSuccess?.(data, variables, onMutateResult, context);
        },
    }, mutation?.queryClient);

    const hasArchivo = archivo !== undefined;
    const hasFile = file !== undefined;
    const hasValue = value !== undefined;

    return (
        <Attachment
            state={status === 'pending'
                ? 'processing'
                : status === 'success'
                    ? 'done'
                    : status}
            {...props}
        >
            <AttachmentMedia>
                {status === 'idle' && <UploadIcon />}
                {status === 'pending' && <Spinner />}
                {status === 'error' && <CircleXIcon />}
                {status === 'success' && <FileTextIcon />}
            </AttachmentMedia>

            <AttachmentContent>
                <AttachmentTitle>
                    {hasArchivo
                        ? `${archivo.nombre}.${archivo.extension}`
                        : hasFile
                            ? file.name
                            : 'Subir archivo'}
                </AttachmentTitle>
                <AttachmentDescription>
                    {hasArchivo
                        ? formatFileSize(archivo.size)
                        : hasFile
                            ? formatFileSize(file.size)
                            : 'Presiona aquí para seleccionar un archivo'}
                </AttachmentDescription>
                <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={async (e) => {
                        const file = e.target.files?.[0];
                        setFile(file);

                        if (file) {
                            await mutateAsync({ data: file });
                        }
                        e.target.value = '';
                    }}
                />
            </AttachmentContent>

            {hasValue && <AttachmentTrigger onClick={() => inputRef.current?.click()} disabled={disabled} aria-disabled={disabled} />}

            <AttachmentActions>
                {status === 'error' && file && (
                    <AttachmentFileSelectorActionRetryUpload
                        file={file}
                        mutate={mutate}
                    />
                )}

                {hasArchivo && (
                    <>
                        <AttachmentActionSeeDocument archivo={archivo} />
                        <AttachmentActionSelector onClick={onSelector} />
                    </>
                )}
            </AttachmentActions>
        </Attachment >
    );
}

export function AttachmentFileSelectorActionRetryUpload({
    file,
    tooltipMessage = 'Reintentar',
    icon = <RotateCcwIcon />,
    mutate,
    ...props
}: Omit<React.ComponentProps<typeof TooltipAttachmentAction>, 'onClick'> & Pick<ReturnType<typeof useUploadFileMutation>, 'mutate'> & {
    file: File;
}) {
    return (
        <TooltipAttachmentAction
            tooltipMessage={tooltipMessage}
            icon={icon}
            onClick={() => mutate({ data: file })}
            {...props}
        />
    );
}
