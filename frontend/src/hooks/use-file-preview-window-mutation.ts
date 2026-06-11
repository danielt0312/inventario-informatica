import { getStreamedFile } from '@/lib/utils';
import { useMutation } from "@tanstack/react-query";

export const useFilePreviewWindowMutation = () =>
  useMutation({
    mutationFn: ({ uuid }: { uuid: string; title?: string }) => getStreamedFile(uuid),
    onMutate: () => {
      const newWindow = window.open('about:blank', '_blank');
      return { newWindow };
    },
    onSuccess: (blob, variables, context) => {
      const url = window.URL.createObjectURL(blob);

      if (context?.newWindow) {
        context.newWindow.location.href = url;
        context.newWindow.document.title = variables.title || variables.uuid;
      }
    },
  });
