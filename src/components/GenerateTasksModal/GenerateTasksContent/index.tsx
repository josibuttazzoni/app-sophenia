import useTranslation from 'next-translate/useTranslation';
import { useForm } from 'react-hook-form';
import { Backlog } from 'src/types/tasks';

import CustomSelect from '#components/CustomSelect';
import { Button } from '#components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '#components/ui/form';
import { TextArea } from '#components/ui/textarea';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useSuggestTasks } from '#lib/api/tasks';
import { SeasonMoment } from '#lib/enums/tasks';
import { useTasksContext } from '#lib/providers/TasksContext';

import { WEATHER_ICONS, WEATHER_MOCK } from './mocks';

type GenerateTasksContentProps = {
  setIsEditing: (editing: boolean) => void;
};

export default function GenerateTasksContent({ setIsEditing }: GenerateTasksContentProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  const form = useForm({
    defaultValues: {
      weeklyGoal: '',
      seasonMoment: ''
    }
  });

  const { setSuggestedTasks } = useTasksContext(({ setSuggestedTasks }) => ({
    setSuggestedTasks
  }));

  const { control, handleSubmit } = form;

  const handleSuccess = (tasks: Backlog[]) => {
    setSuggestedTasks(tasks);
    setIsEditing(true);
  };
  const { mutate: suggestTasks } = useSuggestTasks(handleSuccess);

  const onSubmit = (data: { weeklyGoal: string; seasonMoment: string }) => {
    suggestTasks({ seasonMoment: data.seasonMoment });
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        {t('weekWeather')}
        <div className="flex gap-x-3">
          {WEATHER_MOCK.map(({ day, min, max, weather }) => {
            const Icon = WEATHER_ICONS[weather];
            return (
              <div
                key={day}
                className="flex w-14 flex-col items-center rounded-full bg-claret bg-opacity-15 py-3 text-disco shadow-md"
              >
                {day.slice(0, 1).toUpperCase()}
                <div className="flex h-10 items-center">
                  <Icon />
                </div>
                <span className="text-xs">{min.toString()}°</span> {max.toString()}°
              </div>
            );
          })}
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4">
            <FormField
              control={control}
              name="seasonMoment"
              rules={{ required: t('validation.required', { field: t('role') }) }}
              render={({ field, fieldState }) => (
                <CustomSelect
                  label={t('seasonMoment')}
                  items={Object.values(SeasonMoment)}
                  placeholder={t('seasonMoment')}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <FormField
              control={control}
              rules={{ required: t('required') }}
              name="weeklyGoal"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('weeklyGoal')}</FormLabel>
                  <FormControl>
                    <TextArea
                      placeholder={t('enterThe', { field: t('weeklyGoal').toLowerCase() })}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-end">
            <Button type="submit" className="px-12">
              {t('generate')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
