import { cx } from 'class-variance-authority';
import useTranslation from 'next-translate/useTranslation';
import { Genres, Roles } from 'src/types/employee';
import { Task } from 'src/types/tasks';

import Clock from '#assets/clock.svg';
import { STATUS_COLORS } from '#components/BoardColumn/constants';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

const tasks: Task[] = [
  {
    id: '1',
    title: 'Task 1',
    status: 'pending',
    time: '10hs',
    withDetail: false,
    description: 'Sacar el orujo',
    workerAssigned: {
      id: '1',
      name: 'Matias Puyol',
      isAvailable: true,
      role: Roles.Operativo,
      genre: Genres.Male,
      email: 'test@mail.com'
    }
  },
  {
    id: '2',
    title: 'Task 2',
    status: 'completed',
    time: '3hs',
    withDetail: false,
    description: 'Limpiar el tanque',
    workerAssigned: {
      id: '1',
      name: 'Matias Puyol',
      isAvailable: true,
      role: Roles.Operativo,
      genre: Genres.Male,
      email: 'test@mail.com'
    }
  },
  {
    id: '3',
    title: 'Task 3',
    status: 'review',
    time: '2hs',
    withDetail: true,
    description: 'Limpiar el tanque',
    workerAssigned: {
      id: '1',
      name: 'Matias Puyol',
      isAvailable: true,
      role: Roles.Operativo,
      genre: Genres.Male,
      email: 'test@mail.com'
    }
  },
  {
    id: '4',
    title: 'Task 4',
    status: 'pending',
    time: '10hs',
    withDetail: false,
    description: 'Limpiar el tanque',
    workerAssigned: {
      id: '1',
      name: 'Matias Puyol',
      isAvailable: true,
      role: Roles.Operativo,
      genre: Genres.Male,
      email: 'test@mail.com'
    }
  },
  {
    id: '5',
    title: 'Task 5',
    status: 'completed',
    time: '3hs',
    withDetail: false,
    description: 'Limpiar el tanque',
    workerAssigned: {
      id: '1',
      name: 'Matias Puyol',
      isAvailable: true,
      role: Roles.Operativo,
      genre: Genres.Male,
      email: 'test@mail.com'
    }
  },
  {
    id: '6',
    title: 'Task 6',
    status: 'review',
    time: '2hs',
    withDetail: true,
    description: 'Limpiar el tanque',
    workerAssigned: {
      id: '1',
      name: 'Matias Puyol',
      isAvailable: true,
      role: Roles.Operativo,
      genre: Genres.Male,
      email: 'test@mail.com'
    }
  },
  {
    id: '7',
    title: 'Task 7',
    status: 'pending',
    time: '10hs',
    withDetail: false,
    description: 'Limpiar el tanque',
    workerAssigned: {
      id: '1',
      name: 'Matias Puyol',
      isAvailable: true,
      role: Roles.Operativo,
      genre: Genres.Male,
      email: 'test@mail.com'
    }
  }
];

export default function Tasks() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  return (
    <div className="flex h-full flex-col gap-y-3 px-4 py-2">
      <div className="text-lg font-semibold">{tasks[0]?.workerAssigned.name}</div>
      <div className="text-sm">{Date()}</div>
      {tasks.map(task => (
        <div className="rounded-md bg-white">
          <div className="rounded-t-md bg-disco px-3 py-2 text-white">{task.title}</div>
          <div className="flex flex-col gap-y-2 p-2 px-3 text-sm">
            {task.description}
            <div className="w-full border-b border-gray-200" />
            <div className="flex justify-between text-xs">
              <div className="flex gap-x-1">
                <Clock />
                {task.time}
              </div>
              <div className={cx('rounded-md px-2', STATUS_COLORS[task.status]?.bg)}>{t(task.status)} </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
