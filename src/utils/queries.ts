import { Translate } from 'next-translate';
import { toast } from 'react-toastify';

export const mapQueryOptions = (tCommon: Translate) => {
  return {
    onError: (error: Error) => {
      toast.error(tCommon('toastMutationError', { error: error.message }) as string);
    },
    onSuccess: () => {
      toast.success(tCommon('toastMutationSuccess') as string);
    }
  };
};
