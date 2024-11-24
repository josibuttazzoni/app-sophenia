import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '#components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '#components/ui/form';
import { TextArea } from '#components/ui/textarea';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useRating } from '#lib/api/tasks/useRating';

import { RATING_COLORS } from './constants';

type CommentModalProps = {
  id: string;
  rating?: number;
  ratingComment?: string;
  title?: string;
  photoUrl?: string;
  detail?: string;
  setCommentModalOpen: (open: boolean) => void;
};

export default function CommentModal({
  id,
  rating,
  ratingComment,
  title,
  photoUrl,
  detail,
  setCommentModalOpen
}: CommentModalProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.BOARD);
  const { t: tCommon } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);

  const isEditable = !rating;

  const form = useForm({
    defaultValues: {
      rating: rating,
      ratingComment: ratingComment || ''
    }
  });

  const { control, handleSubmit, setValue, watch } = form;

  const currentRating = watch('rating');

  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const { mutate: editMutate, status } = useRating(() => setCommentModalOpen(false));

  const onSubmit = ({ rating, ratingComment }: { rating?: number; ratingComment?: string }) => {
    editMutate({ id, rating: rating || 0, ratingComment });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between gap-y-2">
        <div className="text-xl font-semibold">{title}</div>
        <div className="rounded-lg bg-oxford-blue bg-opacity-5 p-2">
          <div className="text-sm">
            <FormLabel>{t('workerDetail')}</FormLabel>
            {': '}
            {detail}
          </div>
          {photoUrl && (
            <div
              className={`relative mt-3 cursor-pointer transition-all duration-300 ${
                isImageZoomed ? 'h-[480px] w-full' : 'h-32 w-32'
              }`}
              onClick={() => setIsImageZoomed(!isImageZoomed)}
            >
              <Image
                alt="photo"
                className="object-left"
                src={photoUrl}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
        </div>

        <FormField
          control={control}
          name="rating"
          rules={{
            required: t('requiredRating'),
            validate: value => !!value || t('requiredRating')
          }}
          render={({ fieldState }) => (
            <FormItem>
              <FormLabel>{isEditable ? t('addRating') : t('rating')}</FormLabel>
              <FormControl>
                <div className="flex w-full flex-row justify-between">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value: number) => (
                    <div
                      key={value}
                      onClick={() =>
                        isEditable ? setValue('rating', value, { shouldValidate: true }) : null
                      }
                      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-opacity-60 
                      p-2 ${RATING_COLORS[value].bg}
                        ${currentRating === value ? `${RATING_COLORS[value].ring} font-medium ring-2` : ''}`}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </FormControl>
              {fieldState.error && <FormMessage className="!mt-2">{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="ratingComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isEditable ? t('addComment') : t('ratingComment')}</FormLabel>
              <FormControl>
                <TextArea disabled={!isEditable} placeholder={t('ratingComment')} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {isEditable && (
          <Button status={status === 'pending' ? 'pending' : 'enabled'} className="mt-4" type="submit">
            {tCommon('save')}
          </Button>
        )}
      </form>
    </Form>
  );
}
