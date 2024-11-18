import { DialogClose } from '@radix-ui/react-dialog';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Edit from 'src/assets/edit.svg';
import Trash from 'src/assets/trash.svg';
import { Employee, Genres, Roles } from 'src/types/employee';

import emptyEmployees from '#assets/emptyTasks.png';
import EmployeeModal from '#components/EmployeeModal';
import EmptyState from '#components/EmptyState';
import { SIDEBAR_TABS } from '#components/Sidebar/constants';
import PaginatedTableWrapper from '#components/Table';
import WarningModal from '#components/WarningModal';
import Layout from '#components/layout';
import { Button } from '#components/ui/button';
import { Dialog, DialogContent } from '#components/ui/dialog';
import { Switch } from '#components/ui/switch';
import { TableCell } from '#components/ui/table';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';

const DialogTrigger = dynamic(() => import('#components/ui/dialog').then(mod => mod.DialogTrigger), {
  ssr: false
});

// TODO: delete when back is ready
const initialEmployees: Employee[] = [
  {
    id: '1',
    name: 'Matias Puyol',
    isAvailable: true,
    role: Roles.Operativo,
    genre: Genres.Male,
    email: 'test@mail.com'
  },
  {
    id: '2',
    name: 'Juan Ontiveros',
    isAvailable: false,
    role: Roles.Operativo,
    genre: Genres.Male,
    email: 'test@mail.com'
  },
  {
    id: '3',
    name: 'Santiago Benedetti',
    isAvailable: true,
    role: Roles.Operativo,
    genre: Genres.Male,
    email: 'test@mail.com'
  },
  {
    id: '4',
    name: 'Maria Jose Buttazzoni',
    isAvailable: true,
    role: Roles.Operativo,
    genre: Genres.Female,
    email: 'test-josi@mail.com'
  },
  {
    id: '5',
    name: 'Martina Mattioli',
    isAvailable: false,
    role: Roles.Operativo,
    genre: Genres.Female,
    email: 'test-martu@mail.com'
  },
  {
    id: '6',
    name: 'Joaquin Martin',
    isAvailable: true,
    role: Roles.Gerencial,
    genre: Genres.Male,
    email: 'test-joaquin@mail.com'
  }
];

export default function Employees() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.EMPLOYEES);
  const [employees, setEmployees] = useState(initialEmployees);

  const handleToggle = (id: string) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.id === id ? { ...employee, isAvailable: !employee.isAvailable } : employee
      )
    );
  };

  const renderEmployeeRow = (employee: Employee) => {
    return (
      <>
        <TableCell className="font-medium">{employee.name}</TableCell>
        <TableCell>
          <Switch
            className="ml-4"
            id={`switch-${employee.id}`}
            onCheckedChange={() => handleToggle(employee.id)}
          />
        </TableCell>
        <TableCell className="font-medium">{employee.role}</TableCell>
        <TableCell className="ml-1 flex gap-x-2">
          <Dialog>
            <DialogTrigger>
              <Edit />
            </DialogTrigger>
            <DialogContent className="w-full max-w-lg rounded-xl bg-white p-8">
              <EmployeeModal email={employee.email} role={employee.role} genre={employee.genre} />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <Trash />
            </DialogTrigger>
            <DialogContent className="w-full max-w-sm rounded-xl bg-white p-8">
              <WarningModal>
                <>
                  <div className="text-md text-center font-semibold text-ebony-clay">
                    {t('wantToDeleteEmployee', { employee: employee.name })}
                  </div>
                  <div className="flex w-full justify-between gap-x-3">
                    <DialogClose className="w-1/2">
                      <Button className="w-full" variant="secondary">
                        {t('cancel')}
                      </Button>
                    </DialogClose>
                    {/* TODO: Add */}
                    <Button onClick={() => {}} className="w-1/2">
                      {t('delete')}
                    </Button>
                  </div>
                </>
              </WarningModal>
            </DialogContent>
          </Dialog>
        </TableCell>
      </>
    );
  };

  return (
    <Layout selectedTab={SIDEBAR_TABS.EMPLOYEES}>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">{t('employees')}</div>
        <div className="flex gap-x-4">
          <Dialog>
            <DialogTrigger>
              <Button className="px-8" variant="primary">
                {t('addEmployee')}
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-lg rounded-xl bg-white p-8">
              <EmployeeModal />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="h-full w-full rounded-lg bg-white p-6">
        {employees.length > 0 ? (
          <PaginatedTableWrapper
            data={employees}
            columns={[t('employee'), t('isAvailable'), t('role'), t('actions')]}
            row={renderEmployeeRow}
          />
        ) : (
          <EmptyState title={t('emptyEmployees')} icon={emptyEmployees} />
        )}
      </div>
    </Layout>
  );
}
