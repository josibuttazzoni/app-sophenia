import { Translate } from 'next-translate';
import { toast } from 'react-toastify';

export const mapQueryOptions = (tCommon: Translate, errorMessage: string, successMessage?: string) => {
  return {
    onError: () => {
      toast.error(tCommon('toastMutationError', { error: errorMessage }) as string);
    },
    ...(successMessage && {
      onSuccess: () => {
        toast.success(successMessage);
      }
    })
  };
};
