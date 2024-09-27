import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import emptyTasks from '#assets/emptyTasks.png';
import { BoardColumn } from '#components/BoardColumn';
import { STATUS } from '#components/BoardColumn/constants';
import EmptyState from '#components/EmptyState';
import { SIDEBAR_TABS } from '#components/Sidebar/constants';
import Layout from '#components/layout';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

type Task = {
  id: string;
  name: string;
  status: string;
};

export default function Board() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.BOARD);

  // TODO: delete when backend is ready
  const TASKS_MOCK: Task[] = [
    { id: '1', name: 'Task 1', status: STATUS.PENDING },
    { id: '2', name: 'Task 2', status: STATUS.PROGRESS },
    { id: '3', name: 'Task 3', status: STATUS.REVIEW },
    { id: '4', name: 'Task 4', status: STATUS.COMPLETED },
    { id: '5', name: 'Task 5', status: STATUS.PENDING },
    { id: '6', name: 'Task 6', status: STATUS.PENDING },
    { id: '7', name: 'Task 7', status: STATUS.REVIEW }
  ];

  const [tasks, setTasks] = useState<Task[]>(TASKS_MOCK);

  const getTasksByStatus = tasks.reduce(
    (acc, task) => {
      acc[task.status] = acc[task.status] ? [...acc[task.status], task] : [task];
      return acc;
    },
    {} as { [key: string]: Task[] }
  );

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;

    if (sourceStatus === destinationStatus) return;

    // TODO: change in backend?
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === draggableId ? { ...task, status: destinationStatus } : task))
    );
  };

  return (
    <Layout selectedTab={SIDEBAR_TABS.BOARD}>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">{t('board')}</div>
      </div>

      <div className="w-full rounded-lg p-6">
        {tasks.length > 0 ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex w-full justify-between gap-x-2">
              {Object.values(STATUS).map(status => (
                <Droppable droppableId={status} key={status}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex w-full flex-col gap-y-3 rounded-xl bg-white p-2"
                    >
                      <BoardColumn status={status} tasks={getTasksByStatus[status] || []} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        ) : (
          <EmptyState title={t('emptyTasks')} icon={emptyTasks} />
        )}
      </div>
    </Layout>
  );
}
