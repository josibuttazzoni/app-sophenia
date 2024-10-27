import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { Button } from '#components/ui/button';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

import EditTasksContent from './EditTasksContent';
import GenerateTasksContent from './GenerateTasksContent';

export default function GenerateTasksModal() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col justify-between">
      <div className="text-xl font-semibold">{t(isEditing ? 'editTasks' : 'generateTasks')}</div>
      {isEditing ? <EditTasksContent /> : <GenerateTasksContent />}
      <div className="flex w-full justify-end">
        <Button onClick={() => setIsEditing(!isEditing)} className="px-12">
          {t('generate')}
        </Button>
      </div>
    </div>
  );
}
