import useTranslation from 'next-translate/useTranslation';
import { User } from 'src/types/users';

import { Button } from '#components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#components/ui/select';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useWorkOrderSuggestionContext } from '#lib/providers/WorkOrderSuggestionContext';

export const EditWorkOrderSuggestion = ({ workers }: { workers: User[] }) => {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  const { suggestions, setSuggestions } = useWorkOrderSuggestionContext(
    ({ suggestions, setSuggestions }) => ({
      suggestions,
      setSuggestions
    })
  );

  const createWorkOrder = () => {
    console.log('suggestions', suggestions);
  };

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
        <div className="flex max-h-[400px] flex-col gap-y-3 overflow-auto rounded-md border border-mischka p-4">
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
        <div className="flex w-full justify-end pt-3">
          <Button className="px-12" onClick={createWorkOrder}>
            {t('generate')}
          </Button>
        </div>
      </div>
    </section>
  );
};
