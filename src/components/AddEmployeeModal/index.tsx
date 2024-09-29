import useTranslation from 'next-translate/useTranslation';

import CustomSelect from '#components/CustomSelect';
import { Button } from '#components/ui/button';
import { Input } from '#components/ui/input';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

// TODO
export default function AddEmployeeModal() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.EMPLOYEES);
  const roles = ['employee', 'managerial'];
  const genres = ['female', 'male'];
  return (
    <div className="flex flex-col justify-between gap-y-6">
      <div className="text-xl font-semibold">{t('addEmployee')}</div>
      <Input label={t('email')} placeholder={t('enterThe', { field: t('email').toLowerCase() })} />
      <div>
        <CustomSelect items={roles} t={t} label={t('role')} placeholder={t('role')} />
      </div>
      <div>
        <CustomSelect items={genres} t={t} label={t('gender')} placeholder={t('gender')} />
      </div>
      <Button>{t('save')}</Button>
    </div>
  );
}
