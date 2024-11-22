import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import { Task } from 'src/types/tasks';
import { User } from 'src/types/users';

import CrossIcon from '#assets/cross.svg';
import { Button } from '#components/ui/button';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useSuggestWorkOrder } from '#lib/api/workOrders';
import { useWorkOrderSuggestionContext } from '#lib/providers/WorkOrderSuggestionContext';

export default function GenerateWorkOrderContent({
  setSuggestionsDone,
  setAvailableWorkers,
  tasks,
  workers
}: {
  setSuggestionsDone: (done: boolean) => void;
  setAvailableWorkers: (workers: User[]) => void;
  tasks: Task[];
  workers: User[];
}) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  const [availableEmployees, setAvailableEmployees] = useState<User[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

  const { setSuggestions } = useWorkOrderSuggestionContext(({ setSuggestions }) => ({
    setSuggestions
  }));

  useEffect(() => {
    setAvailableEmployees((workers || []).filter(worker => worker.availability));
    setSelectedTasks(tasks || []);
  }, [workers, tasks]);

  const handleSuccessSuggestions = (data: { taskId: string; workerId: string }[]) => {
    setSuggestions(
      data
        .map(({ taskId, workerId }) => ({
          task: selectedTasks.find(t => t.id == taskId),
          worker: availableEmployees.find(e => e.id == workerId)
        }))
        .filter(suggestion => suggestion.task && suggestion.worker) as {
        task: Task;
        worker: User;
      }[]
    );
    setAvailableWorkers(availableEmployees);
    setSuggestionsDone(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate: suggestAssingnments, status } = useSuggestWorkOrder(handleSuccessSuggestions);

  return (
    <div className="flex flex-col justify-between overflow-scroll">
      <div className="mb-4 text-xl font-semibold">{t('generateOT')}</div>
      <section>
        <div className="mb-2 flex flex-row items-center gap-x-4">
          {t('tasks')}
          <div className="rounded-full bg-disco px-4 text-white">
            {selectedTasks.reduce((total, task) => total + task.estimatedHoursToComplete, 0)}hs
          </div>
        </div>
        <div className="flex h-[200px] flex-col gap-y-3 overflow-auto rounded-md border border-mischka p-4">
          {selectedTasks.map(({ title, id, estimatedHoursToComplete }) => (
            <div key={id} className="justify-betweenpy-2 flex w-full flex-row items-center">
              <div className="flex w-full items-center gap-x-2">
                <div>{title}</div>
                <div className="rounded-full bg-claret bg-opacity-15 px-2 py-1 text-oxford-blue">
                  {estimatedHoursToComplete}hs
                </div>
              </div>
              <div className="flex gap-x-2">
                <CrossIcon
                  className="cursor-pointer"
                  onClick={() =>
                    selectedTasks.length > 1 && setSelectedTasks(selectedTasks.filter(t => t.id !== id))
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <div className="flex flex-row items-center gap-x-4">
            {t('availableEmployees')}
            <div className="rounded-full bg-disco px-4 text-white">{availableEmployees.length}</div>
          </div>
          <div className="flex max-h-[100px] flex-wrap gap-2 rounded-lg border border-slate-200 p-2">
            {availableEmployees.map(empl => (
              <div
                key={empl.id}
                className="flex items-center gap-2 rounded-md bg-claret bg-opacity-15 px-2 py-1 text-oxford-blue"
              >
                {empl.fullname}
                <div
                  onClick={() =>
                    availableEmployees.length > 1 &&
                    setAvailableEmployees(availableEmployees.filter(e => e.id !== empl.id))
                  }
                  className="cursor-pointer"
                >
                  <CrossIcon />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mt-8 flex w-full justify-end">
        <Button
          status={status === 'pending' ? 'loading' : 'enabled'}
          className="px-12"
          onClick={() => {
            suggestAssingnments({
              taskIds: selectedTasks.map(t => t.id),
              workersIds: availableEmployees.map(e => e.id)
            });
          }}
        >
          {t('continue')}
        </Button>
      </div>
    </div>
  );
}
