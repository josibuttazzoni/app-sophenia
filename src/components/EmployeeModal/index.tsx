import useTranslation from 'next-translate/useTranslation';
import { Genres, Roles } from 'src/types/employee';

import CustomSelect from '#components/CustomSelect';
import { Button } from '#components/ui/button';
import { Input } from '#components/ui/input';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

type EmployeeModalProps = {
  email?: string;
  role?: string;
  genre?: string;
};

export default function EmployeeModal({ email, role, genre }: EmployeeModalProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.EMPLOYEES);

  return (
    <div className="flex flex-col justify-between gap-y-6">
      <div className="text-xl font-semibold">{email ? t('editEmployee') : t('addEmployee')}</div>
      <Input
        value={email}
        label={t('email')}
        placeholder={t('enterThe', { field: t('email').toLowerCase() })}
      />
      <div>
        <CustomSelect value={role} items={Object.values(Roles)} label={t('role')} placeholder={t('role')} />
      </div>
      <div>
        <CustomSelect
          value={genre}
          items={Object.values(Genres)}
          label={t('gender')}
          placeholder={t('gender')}
        />
      </div>
      <Button>{t('save')}</Button>
    </div>
  );
}
