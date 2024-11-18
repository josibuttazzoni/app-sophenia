import useTranslation from 'next-translate/useTranslation';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from 'src/types/tasks';

import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

import { STATUS_COLORS, getStatusTitle } from './constants';
import { TaskStatusDto } from '#lib/enums/tasks';

export type BoardColumnProps = {
  status: TaskStatusDto;
  tasks: Task[];
};

export function BoardColumn({ status, tasks }: BoardColumnProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.BOARD);

  return (
    <div className="flex w-full flex-col gap-y-3 rounded-xl bg-white p-2">
      <div className="flex items-center justify-between text-sm lg:text-base">
        <div className={`w-fit lg:max-w-32 rounded-lg ${STATUS_COLORS[status].bg} p-1 lg:px-2`}>
          {getStatusTitle(t)[status]}
        </div>
        <div>{tasks.length}</div>
      </div>
      <div className="flex flex-col gap-y-1">
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`min-h-28 h-fit w-full flex flex-col gap-y-2 rounded-lg border-l-4 bg-athens-gray ${STATUS_COLORS[status].stroke} p-2`}
              >
                <span className='text-sm font-medium'>
                {task.title}
                </span>

                <span className='text-xs text-gray-500'>
                {task.description}
                </span>
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
}
