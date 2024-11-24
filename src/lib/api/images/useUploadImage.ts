import useTranslation from 'next-translate/useTranslation';
import { createMutation } from 'react-query-kit';
import { ImageResponse } from 'src/types/images';

import { uploadImage } from '#lib/services/images';
import { mapQueryOptions } from '#utils/queries';

import { queryClient } from '..';
import { handleServerResponse } from '../handleServerResponse';

export const useUploadImage = (setImage: (id: string) => void) => {
  const { t: tCommon } = useTranslation('common');
  return createMutation({
    mutationFn: (image: File) => uploadImage(image).then(handleServerResponse<ImageResponse>),
    onSettled: response => {
      queryClient.invalidateQueries({ queryKey: ['/image'] });
      if (response) setImage(response.fileId);
    },
    ...mapQueryOptions(tCommon)
  })();
};