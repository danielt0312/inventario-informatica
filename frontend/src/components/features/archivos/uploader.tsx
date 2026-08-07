import { ArchivoSelector, ArchivoSelectorAction, ArchivoSelectorActionViewer, type ArchivoSelectorType, ArchivoSelectorActionSwitcher } from "@/components/features/archivos/selector";
import { Attachment, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentActions, AttachmentMedia, AttachmentTitle, AttachmentTrigger } from "@/components/ui/attachment";
import { Spinner } from "@/components/ui/spinner";
import { useFormMutation, type FormMutation } from "@/hooks/use-form-mutation";
import type { Archivo } from "@/types/documentos";
import type { LaravelValidationErrors, TResponse } from "@/types/generics";
import { CircleXIcon, FileTextIcon, RotateCcwIcon, UploadIcon } from "lucide-react";
import React from "react";
import { getFileName as getFileNameFromArchivo } from "./utils";
import { TooltipAttachmentAction } from "@/components/ui/tooltip-attachment-action";
import { formatFileSize } from "@/lib/utils";
import type { MutationStatus, QueryClient } from "@tanstack/react-query";

const getFileName = (value?: Archivo | File | undefined) =>
    value instanceof File
        ? value.name
        : value !== undefined
            ? getFileNameFromArchivo(value)
            : undefined;

const getFileSize = (value?: Archivo | File | undefined) =>
    value instanceof File
        ? formatFileSize(value.size)
        : value !== undefined
            ? formatFileSize(value.size)
            : undefined;

const Uploader = ArchivoSelector;
const UploaderContent = AttachmentContent;
const UploaderActions = AttachmentActions;
const UploaderAction = ArchivoSelectorAction;
const UploaderActionViewer = ArchivoSelectorActionViewer;
const UploaderGroup = AttachmentGroup;
type UploaderType = ArchivoSelectorType;

type UseMutationOptions = Omit<FormMutation<TResponse<Archivo>, File, LaravelValidationErrors>, 'url' | 'toFormData'>;

const useMutation = (options?: UseMutationOptions, queryClient?: QueryClient) => useFormMutation<TResponse<Archivo>, File>({
    url: 'api/archivos',
    toFormData: (file) => {
        const formData = new FormData;
        formData.append('archivo', file);
        return formData;
    },
    ...options
}, queryClient);

type UploaderProps = React.ComponentProps<typeof Uploader>;
type UploaderState = NonNullable<UploaderProps['state']>;
const getState = (status: MutationStatus): UploaderState => {
    if (status === 'pending') return 'uploading';
    if (status === 'success') return 'done';
    return status;
}

function UploaderLayout({
    value,
    onValueChange,
    triggererDisabled,
    mutation,
    ...props
}: Omit<React.ComponentProps<typeof Uploader>, 'children' | 'state'> & {
    onValueChange?: (value: UploaderType) => void;
    onSelectorClick?: () => void;
    triggererDisabled?: boolean;
    mutation?: {
        options?: UseMutationOptions;
        queryClient?: QueryClient;
    }
}) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [file, setFile] = React.useState<File | undefined>(undefined);

    const { mutate, mutateAsync, status } = useMutation({
        onSuccess: (data, variables, onMutateResult, context) => {
            const archivo = data.data.data;
            onValueChange?.(archivo);
            mutation?.options?.onSuccess?.(data, variables, onMutateResult, context);
        },
        ...mutation?.options
    }, mutation?.queryClient);

    const state = getState(status);
    const fileName = getFileName(file ?? value);
    const fileSize = getFileSize(file ?? value);

    return (
        <Uploader
            value={value}
            state={state}
            {...props}
        >
            <UploaderInput ref={inputRef} mutateAsync={mutateAsync} onFileChange={setFile} />
            <UploaderMedia state={state} />
            <UploaderContent>
                <UploaderTitle
                    state={state}
                    labels={{
                        done: fileName,
                    }}
                />
                <UploaderDescription
                    labels={{
                        done: fileSize
                    }}
                />
            </UploaderContent>
            <UploaderActions>
                {state === 'error' && file && <UploaderActionRetrier file={file} mutate={mutate} />}
                {value && <UploaderActionViewer archivo={value} />}
                {file && <UploaderActionSwitcher inputRef={inputRef} />}
            </UploaderActions>
            {!triggererDisabled && <UploaderTrigger inputRef={inputRef} />}
        </Uploader>
    );
}


type IconState = Record<UploaderState, React.ReactNode>;
const DEFAULT_ICONS: IconState = {
    idle: <UploadIcon />,
    uploading: <Spinner />,
    processing: <Spinner />,
    error: <CircleXIcon />,
    done: <FileTextIcon />
} as const;
function UploaderMedia({
    state = 'idle',
    ...props
}: Omit<React.ComponentProps<typeof AttachmentMedia>, 'children' | 'icon'> & {
    state?: React.ComponentProps<typeof Attachment>['state'];
    icons?: Partial<IconState>;
}) {
    const icons = { ...DEFAULT_ICONS, ...props.icons };

    return (
        <AttachmentMedia variant="icon" {...props}>
            {icons[state]}
        </AttachmentMedia>
    );
}

type LabelState = Record<UploaderState, React.ReactNode>;

const DEFAULT_TITLE_LABELS: LabelState = {
    idle: 'Subir archivo',
    uploading: 'Subiendo archivo...',
    processing: 'Procesando...',
    error: 'Ocurrió un error al subir el archivo',
    done: 'Archivo subido correctamente',
} as const;
function UploaderTitle({
    state = 'idle',
    ...props
}: Omit<React.ComponentProps<typeof AttachmentTitle>, 'children'> & {
    state?: UploaderState;
    file?: File;
    labels?: Partial<LabelState>;
}) {
    const labels = { ...DEFAULT_TITLE_LABELS, ...props.labels };

    return (
        <AttachmentTitle {...props}>
            {labels[state]}
        </AttachmentTitle>
    );
}

const DEFAULT_DESCRIPTION_LABELS: LabelState = {
    idle: 'Presiona aquí para subir un nuevo archivo',
    uploading: 'Espera un momento...',
    processing: 'Espera un momento...',
    error: 'Reintenta de nuevo o selecciona otro archivo',
    done: 'El archivo se subió de manera exitosa'
} as const;
function UploaderDescription({
    state = 'idle',
    ...props
}: Omit<React.ComponentProps<typeof AttachmentDescription>, 'children'> & {
    state?: UploaderState;
    labels?: Partial<LabelState>;
}) {
    const labels = { ...DEFAULT_DESCRIPTION_LABELS, ...props.labels }

    return (
        <AttachmentDescription {...props}>
            {labels[state]}
        </AttachmentDescription>
    );
}

function UploaderActionRetrier({
    file,
    mutate,
    tooltipMessage = 'Reintentar',
    icon = <RotateCcwIcon />,
    ...props
}: Omit<React.ComponentProps<typeof TooltipAttachmentAction>, 'onClick'> & Pick<ReturnType<typeof useMutation>, 'mutate'> & {
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

function UploaderActionSwitcher({
    inputRef,
    ...props
}: Omit<React.ComponentProps<typeof ArchivoSelectorActionSwitcher>, 'onClick'> & {
    inputRef: React.RefObject<HTMLInputElement | null>
}) {
    return (
        <ArchivoSelectorActionSwitcher
            onClick={() => inputRef.current?.click()}
            {...props}
        />
    );
}

interface UploaderInputProps extends Omit<React.ComponentProps<'input'>, 'type' | 'accept' | 'className' | 'onChange'> {
    mutateAsync: ReturnType<typeof useMutation>['mutateAsync'];
    onFileChange: (file: File | undefined) => void;
}

function UploaderInput({
    onFileChange,
    mutateAsync,
    ...props
}: UploaderInputProps) {
    return (
        <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={async (e) => {
                const file = e.target.files?.[0];
                onFileChange(file);

                if (file) {
                    await mutateAsync({ data: file });
                }
                e.target.value = '';
            }}
            {...props}
        />
    );
}

function UploaderTrigger({
    inputRef,
    ...props
}: React.ComponentProps<typeof AttachmentTrigger> & {
    inputRef: React.RefObject<HTMLInputElement | null>
}) {
    return (
        <AttachmentTrigger
            onClick={() => inputRef.current?.click()}
            {...props}
        />
    );
}

export {
    type UploaderType as ArchivoUploaderType,
    Uploader as ArchivoUploader,
    UploaderLayout as ArchivoUploaderLayout,
    UploaderInput as ArchivoUploaderInput,
    UploaderTitle as ArchivoUploaderTitle,
    UploaderDescription as ArchivoUploaderDescription,
    UploaderTrigger as ArchivoUploaderTrigger,
    UploaderAction as ArchivoUploaderAction,
    UploaderActionViewer as ArchivoUploaderActionViewer,
    UploaderActionSwitcher as ArchivoUploaderActionSwitcher,
    UploaderActionRetrier as ArchivoUploaderActionRetrier,
    UploaderMedia as ArchivoUploaderMedia,
    UploaderGroup as ArchivoUploaderAttachmentGroup,
    UploaderContent as ArchivoUploaderAttachmentContent,
    UploaderActions as ArchivoUploaderAttachmentActions,
}
