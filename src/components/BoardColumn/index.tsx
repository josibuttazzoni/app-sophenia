import useTranslation from 'next-translate/useTranslation';
import { Task } from 'src/types/tasks';

import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { TaskStatusDto } from '#lib/enums/tasks';

import { BoardCard } from './BoardCard';
import { STATUS_COLORS, getStatusTitle } from './constants';

export type BoardColumnProps = {
  status: TaskStatusDto;
  tasks: Task[];
};

export function BoardColumn({ status, tasks }: BoardColumnProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.BOARD);

  return (
    <div className="no-scrollbar flex h-full max-h-[85vh] flex-col gap-y-3 overflow-auto rounded-xl bg-white px-3">
      <div className="sticky top-0 flex items-center justify-between bg-white py-2 text-sm">
        <div className={`w-fit rounded-lg lg:max-w-32 ${STATUS_COLORS[status].bg} p-1 lg:px-2`}>
          {getStatusTitle(t)[status]}
        </div>
        <div>{tasks.length}</div>
      </div>
      <div className="flex flex-col gap-y-1">
        {tasks.map((task, index) => (
          <BoardCard key={task.id} index={index} {...task} />
        ))}
      </div>
    </div>
  );
}
