import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { Task } from 'src/types/tasks';

import emptyTasks from '#assets/emptyTasks.png';
import { BoardColumn } from '#components/BoardColumn';
import EmptyState from '#components/EmptyState';
import { SIDEBAR_TABS } from '#components/Sidebar/constants';
import Layout from '#components/layout';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useTasks } from '#lib/api/tasks/useTasks';
import { useUpdateTask } from '#lib/api/tasks/useUpdateTask';
import { TaskStatusDto } from '#lib/enums/tasks';

export default function Board() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.BOARD);

  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  const { data } = useTasks();

  const { mutate: editMutate } = useUpdateTask();

  const [tasks, setTasks] = useState<Task[] | undefined>(data);

  const getTasksByStatus = tasks?.reduce(
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
    const destinationStatus = destination.droppableId as TaskStatusDto;

    if (sourceStatus === destinationStatus) return;

    setTasks(prevTasks =>
      prevTasks?.map(task => (task.id === draggableId ? { ...task, status: destinationStatus } : task))
    );

    editMutate({ id: draggableId, status: destinationStatus });
  };

  console.log('tasks', tasks);

  return (
    <Layout selectedTab={SIDEBAR_TABS.BOARD}>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">{t('board')}</div>
      </div>

      {winReady && (
        <div className="min-h-screen w-full rounded-lg p-6">
          {!!tasks && tasks.length > 0 ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="flex w-full min-h-screen justify-between gap-x-2">
                {Object.values(TaskStatusDto).map(status => (
                  <Droppable droppableId={status} key={status}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex w-full flex-col gap-y-3 rounded-xl bg-white p-2"
                      >
                        <BoardColumn status={status} tasks={getTasksByStatus?.[status] || []} />
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
      )}
    </Layout>
  );
}
