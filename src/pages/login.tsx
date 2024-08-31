import useTranslation from 'next-translate/useTranslation';
import { useForm } from 'react-hook-form';

import TextLogo from '#assets/textLogo.svg';
import { Button } from '#components/ui/button';
import { Form, FormField } from '#components/ui/form';
import { Input } from '#components/ui/input';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

export default function Login() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.LOGIN);
  const form = useForm();
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-fit w-96 flex-col items-center gap-y-6 rounded-lg bg-white p-6">
        <TextLogo />
        {t('login')}
        <Form {...form}>
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
          <Button type="submit" variant="primary">
            {t('login')}
          </Button>
        </Form>
      </div>
    </div>
  );
}
