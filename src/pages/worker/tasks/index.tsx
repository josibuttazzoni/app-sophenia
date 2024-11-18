import { cx } from 'class-variance-authority';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { Genres, Roles } from 'src/types/employee';
import { Task } from 'src/types/tasks';

import Clock from '#assets/clock.svg';
import Logout from '#assets/logout.svg';
import { STATUS_COLORS } from '#components/BoardColumn/constants';
import { ROUTES } from '#constants/routes';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { formatDateES } from '#utils/date';

const tasks: Task[] = [
  {
    _id: '1',
    data: {
      title: 'Task 1',
      status: 'pending',
      estimatedHoursToComplete: 2,
      rating: 5,
      requiresTaskReport: false,
      description: 'Sacar el orujo',
      workerAssigned: {
        _id: '1',
        fullname: 'Matias Puyol',
        wineRole: Roles.Operativo,
        email: 'test@mail.com',
        roles: [Roles.Operativo],
        status: 'available',
        password: ''
      }
    }
  },
  {
    _id: '2',
    data: {
      title: 'Task 2',
      status: 'completed',
      estimatedHoursToComplete: 2,
      rating: 5,
      requiresTaskReport: false,
      description: 'Vaciar el tanque',
      workerAssigned: {
        _id: '1',
        fullname: 'Santiago Benedetti',
        wineRole: Roles.Operativo,
        email: 'test@mail.com',
        roles: [Roles.Operativo],
        status: 'available',
        password: ''
      }
    }
  }
];

export default function Tasks() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  return (
    <>
      <div className="sticky top-0 flex w-full justify-between border-b border-claret bg-white p-3">
        <div className="text-lg font-medium text-disco">{tasks[0]?.data.workerAssigned.fullname}</div>
        {/* TODO: Add logout logic */}
        <Logout className="[&>path]:stroke-[#821744]" />
      </div>
      <div className="flex h-full w-full flex-col gap-y-3 px-4">
        <div className="text-md">
          {t('tasks')} al {formatDateES(new Date())}
        </div>
        {tasks.map(task => (
          <Link
            key={task._id}
            href={`${ROUTES.WORKER}${ROUTES.TASKS}/${task._id}`}
            className="rounded-md bg-white"
          >
            <div className="rounded-t-md bg-disco px-3 py-2 text-white">{task.data.title}</div>
            <div className="flex flex-col gap-y-2 p-2 px-3 text-sm">
              {task.data.description}
              <div className="w-full border-b border-gray-200" />
              <div className="flex justify-between text-xs">
                <div className="flex gap-x-1">
                  <Clock />
                  {task.data.estimatedHoursToComplete}
                </div>
                <div className={cx('rounded-md px-2', STATUS_COLORS[task.data.status]?.bg)}>
                  {t(task.data.status)}{' '}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
