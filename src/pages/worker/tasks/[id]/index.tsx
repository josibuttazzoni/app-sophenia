import { cx } from 'class-variance-authority';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CompleteTaskVariables } from 'src/types/tasks';

import BackArrow from '#assets/back-arrow.svg';
import Tick from '#assets/tick.svg';
import { STATUS_COLORS } from '#components/BoardColumn/constants';
import Loading from '#components/LoadingWrapper/components/Loading';
import ImageUploadButton from '#components/UploadFile';
import { Button } from '#components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '#components/ui/form';
import { TextArea } from '#components/ui/textarea';
import { ROUTES } from '#constants/routes';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useUploadImage } from '#lib/api/images/useUploadImage';
import { useTask } from '#lib/api/tasks';
import { useCompleteTask } from '#lib/api/tasks/useCompleteTask';

export default function WorkerTask() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);

  const router = useRouter();

  const id = router.query.id as string;

  const { data } = useTask({ variables: { id } });

  const form = useForm({
    defaultValues: {
      detail: '',
      photoUrl: ''
    }
  });

  const { control, handleSubmit } = form;

  const { mutate: completeTask, status } = useCompleteTask();

  const onSubmit = (data: CompleteTaskVariables) => {
    completeTask({ photoUrl: data.photoUrl, detail: data.detail, id });
  };

  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleUploadPhoto = (fileUrl: string) => {
    form.setValue('photoUrl', fileUrl);
    setImage(fileUrl);
  };

  const { mutate: uploadImage, isPending } = useUploadImage(handleUploadPhoto);

  return (
    data && (
      <div className="flex min-h-screen w-full flex-col gap-y-5 bg-white p-3">
        <div className="flex items-center gap-x-4">
          <Link href={`${ROUTES.WORKER}${ROUTES.TASKS}`}>
            <BackArrow />
          </Link>
          <div className="text-lg font-semibold">{data.title}</div>
        </div>
        {data.description}
        <div className="flex gap-x-2">
          <div className={cx('rounded-md px-2', STATUS_COLORS[data.status]?.bg)}>{t(data.status)} </div>
          <div className="rounded-md border px-2">{data.estimatedHoursToComplete} hs</div>
        </div>
        <Form {...form}>
          <form
            className="flex h-full flex-grow flex-col justify-between gap-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex w-full flex-col gap-y-3">
              <div className="flex w-full gap-x-1">
                <FormField
                  control={control}
                  name="detail"
                  {...(data.requiresTaskReport && {
                    rules: { required: t('required', { field: t('role') }) }
                  })}
                  render={({ field, fieldState }) => (
                    <FormItem className="w-full py-0">
                      <FormControl>
                        <TextArea rows={4} placeholder={t('enterDescription')} {...field} />
                      </FormControl>
                      {data.requiresTaskReport && (
                        <div className={`text-sm ${fieldState.error && 'text-red-700'}`}>
                          {t('requiresTaskReport')}{' '}
                        </div>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  name="photoUrl"
                  control={control}
                  render={() => (
                    <ImageUploadButton
                      onFileSelect={(file: File) => {
                        uploadImage(file);
                        setImageFile(file);
                      }}
                    />
                  )}
                />
              </div>
            </div>
            {(image || isPending) && (
              <div className="flex flex-row items-center justify-between rounded-md border border-slate-200 p-3">
                {isPending ? (
                  <Loading small className="z-10 [&>div>svg]:h-5 [&>div>svg]:w-5" />
                ) : (
                  <>
                    <Image
                      alt="upload-image"
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/${image}`}
                      width={20}
                      height={20}
                    />
                    {imageFile?.name}
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200">
                      <Tick />
                    </div>
                  </>
                )}
              </div>
            )}
            <Button type="submit">{t('readyForReview')}</Button>
          </form>
        </Form>
      </div>
    )
  );
}
