import { DialogClose } from '@radix-ui/react-dialog';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Edit from 'src/assets/edit.svg';
import Export from 'src/assets/export.svg';
import Add from 'src/assets/plus.svg';
import Trash from 'src/assets/trash.svg';
import { User } from 'src/types/users';

import emptyEmployees from '#assets/emptyTasks.png';
import EmployeeModal from '#components/EmployeeModal';
import { getRoleTitle } from '#components/EmployeeModal/constants';
import { SIDEBAR_TABS } from '#components/Sidebar/constants';
import PaginatedTableWrapper from '#components/Table';
import WarningModal from '#components/WarningModal';
import Layout from '#components/layout';
import { Button } from '#components/ui/button';
import { Dialog, DialogContent } from '#components/ui/dialog';
import { Switch } from '#components/ui/switch';
import { TableCell } from '#components/ui/table';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useDeleteUser } from '#lib/api/users/useDeleteUser';
import { useUpdateUser } from '#lib/api/users/useUpdateUser';
import { useUsers } from '#lib/api/users/useUsers';
import { RoleDto } from '#lib/enums/employees';
import { useLoading } from '#lib/hooks/user/useLoading';
import { getReportByWorker } from '#lib/services/reports';
import { sortBy } from '#utils/list';

const DialogTrigger = dynamic(() => import('#components/ui/dialog').then(mod => mod.DialogTrigger), {
  ssr: false
});

export default function Employees() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.EMPLOYEES);

  const { data } = useUsers();

  const { mutate: editMutate } = useUpdateUser();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);

  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const [employees, setEmployees] = useState(sortBy(data, sortDirection, 'fullname'));

  const loading = useLoading(employees);

  useEffect(() => {
    setEmployees(sortBy(data, sortDirection, 'fullname'));
    setSortDirection(sortDirection);
  }, [data]);

  const handleToggle = (id: string) => {
    setEmployees((prevEmployees: User[]) =>
      prevEmployees?.map(employee =>
        employee.id === id ? { ...employee, availability: !employee.availability } : employee
      )
    );
    const employee = employees?.find((employee: User) => employee.id === id);
    editMutate({
      id,
      data: {
        availability: !employee?.availability
      }
    });
  };

  const { mutateAsync, isPending } = useDeleteUser(() => setDeleteModalOpen(false));

  const handleDeleteWorker = async (id?: string) => {
    if (!id) return;
    await mutateAsync({ id });
  };

  const handleSort = () => {
    setEmployees(sortBy(employees, sortDirection, 'fullname'));
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleExport = async (id: string) => {
    const response = await getReportByWorker(id);
    const url = window.URL.createObjectURL(new Blob([response as BlobPart]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `report_${id}.csv`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  const renderEmployeeRow = (employee: User) => {
    const { id, fullname, role, availability } = employee;
    const employeeRole = getRoleTitle(t)[role as RoleDto];
    return (
      <>
        <TableCell className="font-medium">{fullname}</TableCell>
        <TableCell>
          <Switch
            checked={availability}
            className="ml-4"
            id={`switch-${id}`}
            onCheckedChange={() => handleToggle(id)}
          />
        </TableCell>
        <TableCell className="font-medium">{employeeRole}</TableCell>
        <TableCell className="ml-1 flex gap-x-2">
          <Dialog
            open={editModalOpen}
            onOpenChange={isOpen => {
              setEditModalOpen(isOpen);
              if (isOpen) setSelectedEmployee(employee);
            }}
          >
            <DialogTrigger>
              <Edit className="text-pale-sky hover:text-disco" />
            </DialogTrigger>
            <DialogContent className="w-full max-w-lg rounded-xl bg-white p-8">
              <EmployeeModal setEmployeeModalOpen={setEditModalOpen} {...selectedEmployee} />
            </DialogContent>
          </Dialog>
          <Dialog
            open={deleteModalOpen}
            onOpenChange={isOpen => {
              setDeleteModalOpen(isOpen);
              if (isOpen) setSelectedEmployee(employee);
            }}
          >
            <DialogTrigger>
              <Trash className="text-pale-sky hover:text-disco" />
            </DialogTrigger>
            <DialogContent className="w-full max-w-sm rounded-xl bg-white p-8">
              <WarningModal>
                <>
                  <div className="text-md text-center font-semibold text-ebony-clay">
                    {t('wantToDeleteEmployee', { employee: selectedEmployee?.fullname })}
                  </div>
                  <div className="flex w-full justify-between gap-x-3">
                    <DialogClose className="w-1/2">
                      <Button className="w-full" variant="secondary">
                        {t('cancel')}
                      </Button>
                    </DialogClose>
                    <Button
                      onClick={() => handleDeleteWorker(selectedEmployee?.id)}
                      className="w-1/2"
                      disabled={isPending}
                    >
                      {t('delete')}
                    </Button>
                  </div>
                </>
              </WarningModal>
            </DialogContent>
          </Dialog>
          <div className="h-auto w-px bg-black" />
          <div className="cursor-pointer" onClick={() => handleExport(id)}>
            <Export className="text-pale-sky hover:text-disco" />
          </div>
        </TableCell>
      </>
    );
  };

  return (
    <Layout selectedTab={SIDEBAR_TABS.EMPLOYEES}>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">{t('employees')}</div>
        <div className="flex gap-x-4">
          <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
            <DialogTrigger>
              <Button className="px-8" variant="primary">
                <Add className="mr-2 h-4 w-4 text-white" />
                {t('addEmployee')}
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-lg rounded-xl bg-white p-8">
              <EmployeeModal setEmployeeModalOpen={setCreateModalOpen} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="h-full w-full rounded-lg bg-white px-8 pb-6 pt-4">
        <PaginatedTableWrapper
          data={employees}
          columns={[t('employee'), t('isAvailable'), t('role'), t('actions')]}
          row={renderEmployeeRow}
          onSort={handleSort}
          sortColumn={t('employee')}
          sortDirection={sortDirection}
          className="w-[10%]"
          loading={loading}
          emptyStateIcon={emptyEmployees}
          emptyStateTitle={t('emptyEmployees')}
        />
      </div>
    </Layout>
  );
}
