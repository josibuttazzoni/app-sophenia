import useTranslation from 'next-translate/useTranslation';
import { useForm } from 'react-hook-form';
import { RegisterRequestVariables } from 'src/types/auth';
import { UpdateUserRequestVariables } from 'src/types/users';

import CustomSelect from '#components/CustomSelect';
import { Button } from '#components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '#components/ui/form';
import { Input } from '#components/ui/input';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useRegister } from '#lib/api/auth/useRegister';
import { useUpdateUser } from '#lib/api/users';
import { WineRoleDto } from '#lib/enums/employees';

type EmployeeModalProps = {
  id?: string;
  fullname?: string;
  email?: string;
  role?: string;
  onSuccess: () => void;
};

export default function EmployeeModal({ id, fullname, email, role, onSuccess }: EmployeeModalProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.EMPLOYEES);

  const form = useForm({
    defaultValues: {
      fullname: fullname || '',
      email: email || '',
      role: role || ''
    }
  });

  const { control, handleSubmit } = form;

  const { mutate: editMutate } = useUpdateUser();

  const { mutate: createMutate } = useRegister();

  // TODO: fix when back is fixed (wineRole / role)
  const onSubmit = (data: UpdateUserRequestVariables) => {
    console.log('Formulario enviado:', data);
    if (!id) {
      return createMutate(
        { fullname: data.fullname, email: data.email, role: 'WORKER' } as RegisterRequestVariables,
        {
          onSuccess: onSuccess
        }
      );
    } else {
      return editMutate(
        {
          id,
          data
        },
        {
          onSuccess: onSuccess
        }
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between gap-y-4">
        <div className="mb-2 text-xl font-semibold">{email ? t('editEmployee') : t('addEmployee')}</div>
        <FormField
          control={control}
          name="fullname"
          render={({ field, fieldState }) => (
            <FormItem className="!py-0">
              <FormLabel>{t('fullname')}</FormLabel>
              <FormControl>
                <Input placeholder={t('enterThe', { field: t('fullname').toLowerCase() })} {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
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
            <FormItem className="!py-0">
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
                items={Object.values(WineRoleDto)}
                placeholder={t('role')}
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </div>
          )}
        />
        <Button className="mt-10" type="submit">
          {t('save')}
        </Button>
      </form>
    </Form>
  );
}
