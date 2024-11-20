import useTranslation from 'next-translate/useTranslation';
import { useForm } from 'react-hook-form';

import CustomSelect from '#components/CustomSelect';
import { Button } from '#components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '#components/ui/form';
import { Input } from '#components/ui/input';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useRating } from '#lib/api/tasks/useRating';

type CommentModalProps = {
  id: string;
  title?: string;
};

export default function CommentModal({ id, title }: CommentModalProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.EMPLOYEES);

  const form = useForm({
    defaultValues: {
      rating: 1,
      ratingComment: ''
    }
  });

  const { control, handleSubmit } = form;

  const { mutate: editMutate } = useRating();

  const onSubmit = ({ rating, ratingComment }: { rating: number; ratingComment?: string }) => {
    console.log('Formulario enviado:', rating, ratingComment);
    editMutate({ id, rating, ratingComment });
  };

  // TODO: [martina] ver si la task tiene rating y a partir de eso mostrar info o form
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between gap-y-6">
        <div className="text-xl font-semibold">{title}</div>
        <FormField
          control={control}
          name="rating"
          rules={{ required: t('validation.required', { field: t('rating') }) }}
          render={({ field, fieldState }) => (
            <div>
              <CustomSelect
                label={t('rating')}
                placeholder={t('rating')}
                // items={[1, 2, 3, 4, 5].map(rating => ({ label: rating.toString(), value: rating }))}
                items={[
                  value:1,
                  label:'1'
                ]}
                value={{
                  value: field.value,
                  label: '1'
                }}
                onChange={field.onChange}
              />
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </div>
          )}
        />
        <FormField
          control={control}
          name="ratingComment"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t('ratingComment')}</FormLabel>
              <FormControl>
                <Input placeholder={t('enterThe', { field: t('ratingComment').toLowerCase() })} {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">{t('save')}</Button>
      </form>
    </Form>
  );
}
