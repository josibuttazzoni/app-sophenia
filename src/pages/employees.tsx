import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Edit from 'src/assets/edit.svg';
import Trash from 'src/assets/trash.svg';
import { Employee, Roles } from 'src/types/employee';

import emptyEmployees from '#assets/emptyTasks.png';
import AddEmployeeModal from '#components/AddEmployeeModal';
import EmptyState from '#components/EmptyState';
import { IconButton } from '#components/IconButton';
import { SIDEBAR_TABS } from '#components/Sidebar/constants';
import Table from '#components/Table';
import Layout from '#components/layout';
import { Button } from '#components/ui/button';
import { Dialog, DialogContent } from '#components/ui/dialog';
import { Switch } from '#components/ui/switch';
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
    role: Roles.Operativo
  },
  {
    id: '2',
    name: 'Juan Ontiveros',
    isAvailable: false,
    role: Roles.Operativo
  },
  {
    id: '3',
    name: 'Santiago Benedetto',
    isAvailable: true,
    role: Roles.Gerencial
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
            <DialogContent className="h-[600px] w-[850px] max-w-none rounded-xl bg-white p-8">
              <AddEmployeeModal />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="h-full w-full rounded-lg bg-white p-6">
        {employees.length > 0 ? (
          <Table sections={[t('employee'), t('isAvailable'), t('role'), t('actions')]}>
            {employees.map(employee => (
              <tr key={employee.id} className="h-16">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{employee.name}</td>
                <td className="px-10 py-4">
                  <Switch id={`switch-${employee.id}`} onCheckedChange={() => handleToggle(employee.id)} />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{employee.role}</td>
                <td className="flex items-center space-x-2 px-6 py-4">
                  <IconButton
                    icon={Edit}
                    onClick={() => {
                      // TODO
                    }}
                  />
                  <IconButton
                    icon={Trash}
                    onClick={() => {
                      // TODO
                    }}
                  />
                </td>
              </tr>
            ))}
          </Table>
        ) : (
          <EmptyState title={t('emptyEmployees')} icon={emptyEmployees} />
        )}
      </div>
    </Layout>
  );
}
