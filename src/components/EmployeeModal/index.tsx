import useTranslation from 'next-translate/useTranslation';
import { useForm } from 'react-hook-form';

import CustomSelect from '#components/CustomSelect';
import { Button } from '#components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '#components/ui/form';
import { Input } from '#components/ui/input';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { Genres, Roles } from '#lib/enums/employee';

type EmployeeModalProps = {
  email?: string;
  role?: string;
  genre?: string;
};

export default function EmployeeModal({ email, role, genre }: EmployeeModalProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.EMPLOYEES);

  const form = useForm({
    defaultValues: {
      email: email || '',
      role: role || '',
      genre: genre || ''
    }
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: { email: string; role: string; genre: string }) => {
    console.log('Formulario enviado:', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between gap-y-6">
        <div className="text-xl font-semibold">{email ? t('editEmployee') : t('addEmployee')}</div>

        <FormField
          control={control}
          name="email"
          rules={{
            required: t('validation.required', { field: t('email') }),
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: t('validation.invalidEmail')
            }
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input placeholder={t('enterThe', { field: t('email').toLowerCase() })} {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="role"
          rules={{ required: t('validation.required', { field: t('role') }) }}
          render={({ field, fieldState }) => (
            <div>
              <CustomSelect
                label={t('role')}
                items={Object.values(Roles)}
                placeholder={t('role')}
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </div>
          )}
        />
        <FormField
          control={control}
          name="genre"
          rules={{ required: t('validation.required', { field: t('genre') }) }}
          render={({ field, fieldState }) => (
            <div>
              <CustomSelect
                label={t('genre')}
                items={Object.values(Genres)}
                placeholder={t('genre')}
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}{' '}
            </div>
          )}
        />

        <Button type="submit">{t('save')}</Button>
      </form>
    </Form>
  );
}
