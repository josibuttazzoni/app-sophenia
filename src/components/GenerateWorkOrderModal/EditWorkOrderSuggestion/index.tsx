import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { User } from 'src/types/users';

import { Button } from '#components/ui/button';
import { Input } from '#components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#components/ui/select';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useCreateWorkOrder } from '#lib/api/workOrders';
import { useWorkOrderSuggestionContext } from '#lib/providers/WorkOrderSuggestionContext';

export const EditWorkOrderSuggestion = ({ workers }: { workers: User[] }) => {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  const router = useRouter();
  const { suggestions, setSuggestions } = useWorkOrderSuggestionContext(
    ({ suggestions, setSuggestions }) => ({
      suggestions,
      setSuggestions
    })
  );
  const [workOrderName, setWorkOrderName] = useState('');
  const [nameError, setNameError] = useState(false);

  const { mutate: createWorkOrder } = useCreateWorkOrder(() => router.push('/board'));

  const handleSelectChange = (taskId: string, workerId: string) => {
    setSuggestions(
      suggestions.map(s => {
        const worker = workers.find(w => w.id === workerId);
        return s.task.id === taskId && worker ? { task: s.task, worker } : s;
      })
    );
  };

  return (
    <section>
      <div className="flex flex-col gap-y-3">
        <div className="text-xl font-semibold">{t('editWorkorderSuggestions')}</div>
        <Input
          value={workOrderName}
          onChange={e => {
            setWorkOrderName(e.target.value);
            setNameError(false);
          }}
          placeholder={`Ingresá el ${t('workOrderName')}`}
          label={t('workOrderName')}
          className={nameError ? 'border-red-700' : ''}
        />
        <div className="flex max-h-[350px] flex-col gap-y-3 overflow-auto rounded-md border border-mischka p-4">
          {suggestions.map(({ task, worker }) => {
            return (
              <div key={task.id} className="flex w-full flex-row items-center justify-between gap-x-4">
                <div className="flex w-full flex-col gap-y-1">
                  <div className="font-semibold">{task.title}</div>
                  <Select value={worker.id} onValueChange={workerId => handleSelectChange(task.id, workerId)}>
                    <SelectTrigger>
                      <SelectValue placeholder={''} />
                    </SelectTrigger>
                    <SelectContent>
                      {workers
                        .map(w => ({ label: w.fullname, value: w.id }))
                        .map(item => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex w-full justify-end pt-2">
          <Button
            className="px-12"
            onClick={() => {
              if (workOrderName === '') {
                setNameError(true);
              } else {
                createWorkOrder({
                  workOrderTasks: suggestions.map(s => ({
                    taskId: s.task.id,
                    workerAssignedId: s.worker.id
                  })),
                  name: workOrderName
                });
              }
            }}
          >
            {t('generate')}
          </Button>
        </div>
      </div>
    </section>
  );
};
