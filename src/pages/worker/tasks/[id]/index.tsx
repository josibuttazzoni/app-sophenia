import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { Form, useForm } from 'react-hook-form';
import { Genres, Roles } from 'src/types/employee';

import BackArrow from '#assets/back-arrow.svg';
import ImageUploadButton from '#components/UploadFile';
import { Button } from '#components/ui/button';
import { FormField } from '#components/ui/form';
import { TextArea } from '#components/ui/textarea';
import { ROUTES } from '#constants/routes';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

export default function WorkerTask() {
  const task = {
    id: '1',
    title: 'Task 1',
    status: 'pending',
    time: '10hs',
    requiresTaskReport: false,
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

  const form = useForm();

  return (
    <div className="flex min-h-screen w-full flex-col gap-y-5 bg-white p-3">
      <div className="flex items-center gap-x-4">
        <Link href={`${ROUTES.WORKER}${ROUTES.TASKS}`}>
          <BackArrow />
        </Link>
        <div className="text-lg font-semibold">{task.title}</div>
      </div>
      {task.description}
      {/* TODO: Make forms work */}
      <Form className="flex flex-col gap-y-5" onSubmit={values => console.log(values)} {...form}>
        <div className="flex gap-x-1">
          <FormField
            name="taskDetail"
            {...form}
            {...(task.requiresTaskReport && { required: true })}
            render={() => <TextArea rows={4} placeholder={t('enterDescription')} />}
          />
          <FormField
            name="taskPhoto"
            {...form}
            render={() => <ImageUploadButton onFileSelect={file => console.log(file)} />}
          />
        </div>
        <Button type="submit">{t('markAsSolved')}</Button>
      </Form>
    </div>
  );
}
