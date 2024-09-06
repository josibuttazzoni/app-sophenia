import useTranslation from 'next-translate/useTranslation';

import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

// TODO
export default function AddEmployeeModal() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.EMPLOYEES);
  return (
    <div className="flex flex-col justify-between">
      <div className="text-xl font-semibold">{t('addEmployee')}</div>
    </div>
  );
}
