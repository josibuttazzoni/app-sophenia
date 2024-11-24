import { getCookie } from 'cookies-next';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginRequestVariables } from 'src/types/auth';

import sophenia from '#assets/sophenia.png';
import BrandTagline from '#components/BrandTagline';
import LoadingWrapper from '#components/LoadingWrapper';
import { Button } from '#components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '#components/ui/form';
import { Input } from '#components/ui/input';
import { COOKIES } from '#constants/cookies';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useLogin } from '#lib/api/auth';
import { getRedirectPageByRole } from '#lib/api/auth/useLogin';
import { RoleDto } from '#lib/enums/employees';

export default function Login({ role }: { role: RoleDto }) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.LOGIN);
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { handleSubmit, control } = form;

  const { mutate, status } = useLogin(role);
  const onSubmit: SubmitHandler<{ [x: string]: string }> = data =>
    mutate({ ...data, role } as LoginRequestVariables);

  const token = useMemo(() => getCookie(COOKIES.AUTH_TOKEN), []);
  const authRole = useMemo(() => getCookie(COOKIES.AUTH_ROLE) as RoleDto, []);

  useEffect(() => {
    if (token && authRole) {
      router.push(getRedirectPageByRole(authRole));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [token, router, authRole]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingWrapper loading={loading}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-6 rounded-lg bg-white p-6 md:h-fit md:w-96">
          <Image src={sophenia} alt="Sophenia Logo" width={200} height={200} />
          <h1 className="text-2xl">{t('login')}</h1>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
                      <Input placeholder={t('placeholder', { field: 'email' })} {...field} />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                rules={{
                  required: t('validation.required', { field: t('password') }),
                  minLength: {
                    value: 5,
                    message: t('validation.minLength', { field: t('password'), count: 5 })
                  }
                }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>{t('password')}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t('placeholder', { field: 'contraseña' })}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <Button variant="link" className="-px-4 -mt-4 self-start text-pale-sky">
                {t('forgetPassword')}
              </Button>
              <Button
                status={status === 'pending' ? 'pending' : 'enabled'}
                type="submit"
                variant="primary"
                className="mt-5 w-full"
              >
                {t('login')}
              </Button>
            </form>
          </Form>
          <BrandTagline variant="dark" />
        </div>
      </LoadingWrapper>
    </div>
  );
}
