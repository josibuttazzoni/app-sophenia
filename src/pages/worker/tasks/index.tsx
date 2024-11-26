import { cx } from 'class-variance-authority';
import { deleteCookie } from 'cookies-next';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Clock from '#assets/clock.svg';
import Logout from '#assets/logout.svg';
import { STATUS_COLORS } from '#components/BoardColumn/constants';
import { COOKIES } from '#constants/cookies';
import { PAGES_PATHS } from '#constants/pages';
import { ROUTES } from '#constants/routes';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { queryClient } from '#lib/api';
import { useProfile } from '#lib/api/auth';
import { useWorkerBoard } from '#lib/api/workOrders/useWorkerBoard';
import { formatDateES } from '#utils/date';

export default function Tasks() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.TASKS);
  const { data: user } = useProfile();
  const workerBoard = useWorkerBoard({ variables: { id: user?._id } });
  const data = workerBoard?.data;
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie(COOKIES.AUTH_TOKEN);
    deleteCookie(COOKIES.AUTH_ROLE);
    queryClient.clear();
    router.replace(PAGES_PATHS.LOGIN);
  };
  return (
    <div className="min-h-screen w-full">
      <div className="sticky top-0 flex w-full justify-between border-b border-claret bg-white p-3">
        <div className="text-lg font-medium text-disco">{user?.fullname}</div>
        <Logout onClick={handleLogout} className="cursor-pointer [&>path]:stroke-[#821744]" />
      </div>
      <div className="flex h-full w-full flex-col gap-y-3 px-4 pt-3">
        <div className="text-md">
          {t('tasks')} al {formatDateES(new Date())}
        </div>
        {data?.map(task => (
          <Link
            key={task.id}
            href={`${ROUTES.WORKER}${ROUTES.TASKS}/${task.id}`}
            className="rounded-md bg-white"
          >
            <div className="rounded-t-md bg-disco px-3 py-2 text-white">{task.title}</div>
            <div className="flex flex-col gap-y-2 p-2 px-3 text-sm">
              {task.description}
              <div className="w-full border-b border-gray-200" />
              <div className="flex justify-between text-xs">
                <div className="flex gap-x-1">
                  <Clock />
                  {task.estimatedHoursToComplete}
                </div>
                <div className={cx('rounded-md px-2', STATUS_COLORS[task.status]?.bg)}>{t(task.status)} </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
