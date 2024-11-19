import { cx } from 'class-variance-authority';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import BackArrow from '#assets/back-arrow.svg';
import { STATUS_COLORS } from '#components/BoardColumn/constants';
import ImageUploadButton from '#components/UploadFile';
import { Button } from '#components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '#components/ui/form';
import { TextArea } from '#components/ui/textarea';
import { ROUTES } from '#constants/routes';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { Genres, RoleDto } from '#lib/enums/employees';
import { TaskStatusDto } from '#lib/enums/tasks';

export default function WorkerTask() {
  const task = {
    id: '1',
    title: 'Task 1',
    status: TaskStatusDto.PROGRESS,
    time: '10hs',
    requiresTaskReport: true,
    description: 'Sacar el orujo',
    workerAssigned: {
      id: '1',
      name: 'Matias Puyol',
      availability: true,
      role: RoleDto.WORKER,
      genre: Genres.Male,
      email: 'test@mail.com'
    }
  };

  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);

  const form = useForm({
    defaultValues: {
      taskDetail: '',
      taskPhoto: null as File | null
    }
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: { taskDetail: string; taskPhoto: File | null }) => {
    console.log('Formulario enviado:', data);
  };

  return (
    <div className="flex min-h-screen w-full flex-col gap-y-5 bg-white p-3">
      <div className="flex items-center gap-x-4">
        <Link href={`${ROUTES.WORKER}${ROUTES.TASKS}`}>
          <BackArrow />
        </Link>
        <div className="text-lg font-semibold">{task.title}</div>
      </div>
      {task.description}
      <div className="flex gap-x-2">
        <div className={cx('rounded-md px-2', STATUS_COLORS[task.status]?.bg)}>{t(task.status)} </div>
        <div className="rounded-md border px-2">{task.time}</div>
      </div>
      <Form {...form}>
        <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full gap-x-1">
            <FormField
              control={control}
              name="taskDetail"
              {...(task.requiresTaskReport && {
                rules: { required: t('required', { field: t('role') }) }
              })}
              render={({ field, fieldState }) => (
                <FormItem className="w-full py-0">
                  <FormControl>
                    <TextArea rows={4} placeholder={t('enterDescription')} {...field} />
                  </FormControl>
                  {fieldState.error && <FormMessage>{t('required')}</FormMessage>}
                </FormItem>
              )}
            />
            <FormField
              name="taskPhoto"
              control={control}
              render={() => (
                <ImageUploadButton onFileSelect={(file: File) => form.setValue('taskPhoto', file)} />
              )}
            />
          </div>
          <Button type="submit">{t('markAsSolved')}</Button>
        </form>
      </Form>
    </div>
  );
}
