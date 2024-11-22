import useTranslation from 'next-translate/useTranslation';
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
  setCommentModalOpen: (open: boolean) => void;
};

export default function CommentModal({
  id,
  rating,
  ratingComment,
  title,
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

  const { mutate: editMutate, status } = useRating(() => setCommentModalOpen(false));

  const onSubmit = ({ rating, ratingComment }: { rating?: number; ratingComment?: string }) => {
    editMutate({ id, rating: rating || 0, ratingComment });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between gap-y-1">
        <div className="text-xl font-semibold">{title}</div>
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
              {fieldState.error && <FormMessage className="!mt-4">{fieldState.error.message}</FormMessage>}
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
          <Button status={status === 'pending' ? 'pending' : 'enabled'} className="mt-6" type="submit">
            {tCommon('save')}
          </Button>
        )}
      </form>
    </Form>
  );
}
