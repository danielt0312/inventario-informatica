import { getStreamedFile } from '@/lib/utils';
import { useMutation } from "@tanstack/react-query";

export const useFileDownloadMutation = (uuid: string, title?: string) => useMutation({
    mutationFn: () => getStreamedFile(uuid),
    onSuccess: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', title || uuid);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    },
});

