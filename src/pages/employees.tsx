import useTranslation from 'next-translate/useTranslation';

import emptyEmployees from '#assets/emptyTasks.png';
import { SIDEBAR_TABS } from '#components/Sidebar/constants';
import Layout from '#components/layout';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import Table from '#components/Table';
import EmptyState from '#components/EmptyState';
import { Employee, Roles } from 'src/types/employee';


const employees: Employee[] = [
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
]

export default function Employees() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.EMPLOYEES);
  return (
    <Layout selectedTab={SIDEBAR_TABS.EMPLOYEES}>
      <div className="flex justify-between flex-col">
        <div className="text-2xl font-semibold">{t('employees')}</div>
        <div className="h-full w-full rounded-lg bg-white p-6">
        {employees.length > 0 ? (
          <Table sections={[t('employee'), t('isAvailable'), t('role'), t('actions')]}>
            {employees.map(employee => (
              <tr key={employee.id} className="h-16">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{employee.name}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{employee.isAvailable.toString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{employee.role}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{}</td>
              </tr>
            ))}
          </Table>
        ) : (
          <EmptyState title={t('emptyEmployees')} icon={emptyEmployees} />
        )}
      </div>
      </div>
      <div className="h-full w-full rounded-lg bg-white"></div>
    </Layout>
  );
}
