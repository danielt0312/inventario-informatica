import { getStreamedFile } from '@/lib/utils';
import { useMutation } from "@tanstack/react-query";

export interface FilePreviewWindowMutationFn {
    uuid: string;
    title: string
}

export const useFilePreviewWindowMutation = () =>
  useMutation({
    mutationFn: ({ uuid }: FilePreviewWindowMutationFn) => getStreamedFile(uuid),
    onMutate: () => {
      const newWindow = window.open('about:blank', '_blank');
      return { newWindow };
    },
    onSuccess: (blob, variables, context) => {
      const url = window.URL.createObjectURL(blob);

      if (context?.newWindow) {
        context.newWindow.location.href = url;
        context.newWindow.document.title = variables.title;
      }
    },
  });
