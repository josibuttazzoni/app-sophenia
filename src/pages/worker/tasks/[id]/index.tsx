import useTranslation from 'next-translate/useTranslation';
import { Genres, Roles } from 'src/types/employee';

import ImageUploadButton from '#components/UploadFile';
import { Button } from '#components/ui/button';
import { TextArea } from '#components/ui/textarea';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

export default function WorkerTask() {
  const task = {
    id: '1',
    title: 'Task 1',
    status: 'pending',
    time: '10hs',
    withDetail: false,
    description: 'Sacar el orujo',
    workerAssigned: {
      id: '1',
      name: 'Matias Puyol',
      isAvailable: true,
      role: Roles.Operativo,
      genre: Genres.Male,
      email: 'test@mail.com'
    }
  };

  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);

  return (
    <div className="flex min-h-screen w-full flex-col gap-y-5 bg-white p-3">
      <div className="text-lg font-semibold">{task.title}</div>
      {task.description}
      <div className="flex gap-x-1">
        <TextArea rows={4} placeholder={t('enterDescription')} />
        <ImageUploadButton onFileSelect={file => console.log(file)} />
      </div>

      <Button>{t('markAsSolved')}</Button>
    </div>
  );
}
