import { getStreamedFile } from '@/lib/utils';
import { useMutation } from "@tanstack/react-query";

export const useFilePreviewWindowMutation = (uuid: string, title?: string) => useMutation({
    mutationFn: () => getStreamedFile(uuid),
    onMutate: () => {
        const newWindow = window.open('about:blank', '_blank');
        return { newWindow };
    },
    onSuccess: (blob, _, context) => {
        const url = window.URL.createObjectURL(blob);

        if (context?.newWindow) {
            context.newWindow.location.href = url;
            context.newWindow.document.title = title || uuid;
        }
    },
});
