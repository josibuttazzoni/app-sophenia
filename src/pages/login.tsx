import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginRequestVariables } from 'src/types/auth';

import sophenia from '#assets/sophenia.png';
import BrandTagline from '#components/BrandTagline';
import { Button } from '#components/ui/button';
import { Form, FormField } from '#components/ui/form';
import { Input } from '#components/ui/input';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useLogin } from '#lib/api/auth';

export default function Login() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.LOGIN);
  const form = useForm();
  const { mutate } = useLogin();
  const onSubmit: SubmitHandler<{ [x: string]: string }> = data => mutate(data as LoginRequestVariables);
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-fit w-96 flex-col items-center gap-y-6 rounded-lg bg-white p-6">
        <Image src={sophenia} alt="Sophenia Logo" width={200} height={200} />
        <h1 className="text-2xl">{t('login')}</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              {...form}
              name="email"
              render={({ field }) => (
                <Input label={t('email')} placeholder={t('placeholder', { field: 'email' })} {...field} />
              )}
            />
            <FormField
              {...form}
              name="password"
              render={({ field }) => (
                <Input
                  label={t('password')}
                  type="password"
                  placeholder={t('placeholder', { field: 'contraseña' })}
                  {...field}
                />
              )}
            />
            <Button variant="link" className="-px-4 -mt-4 self-start text-pale-sky">
              {t('forgetPassword')}
            </Button>
            <Button type="submit" variant="primary" className="w-full">
              {t('login')}
            </Button>
          </form>
        </Form>
        <BrandTagline variant="dark" />
      </div>
    </div>
  );
}
