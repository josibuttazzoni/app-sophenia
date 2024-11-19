import { DialogClose } from '@radix-ui/react-dialog';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Edit from 'src/assets/edit.svg';
import Trash from 'src/assets/trash.svg';
import { Employee } from 'src/types/employee';

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
import { useEmployees } from '#lib/api/employess/useEmployees';
import { useDeleteUser } from '#lib/api/users/useDeleteUser';
import { useUpdateUser } from '#lib/api/users/useUpdateUser';

const DialogTrigger = dynamic(() => import('#components/ui/dialog').then(mod => mod.DialogTrigger), {
  ssr: false
});

export default function Employees() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.EMPLOYEES);

  const { data, refetch } = useEmployees();
  const { mutate: editMutate } = useUpdateUser();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const [employees, setEmployees] = useState(data);

  useEffect(() => {
    setEmployees(data);
  }, [data]);

  const handleToggle = (id: string) => {
    setEmployees(prevEmployees =>
      prevEmployees?.map(employee =>
        employee.id === id ? { ...employee, availability: !employee.availability } : employee
      )
    );
    const employee = employees?.find(employee => employee.id === id);
    editMutate(
      {
        id,
        data: {
          availability: !employee?.availability
        }
      },
      {
        onSuccess: () => refetch()
      }
    );
  };

  const { mutateAsync, isPending } = useDeleteUser();

  const handleDeleteWorker = async (id: string) => {
    await mutateAsync({ id });
    setIsDeleteDialogOpen(false);
  };

  const handleEditOpen = (isOpen: boolean, employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(isOpen);
  };

  const handleEditClose = () => {
    setSelectedEmployee(null);
    setIsEditDialogOpen(false);
  };

  const handleEditWorker = () => {
    refetch();
    handleEditClose();
    setIsCreateDialogOpen(false);
  };

  const renderEmployeeRow = (employee: Employee) => {
    const { id, fullname, availability } = employee;
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
        <TableCell className="ml-1 flex gap-x-2">
          <Dialog open={isEditDialogOpen} onOpenChange={isOpen => handleEditOpen(isOpen, employee)}>
            <DialogTrigger>
              <Edit />
            </DialogTrigger>
            <DialogContent className="w-full max-w-lg rounded-xl bg-white p-8">
              <EmployeeModal onSuccess={handleEditWorker} {...selectedEmployee} />
            </DialogContent>
          </Dialog>
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger>
              <Trash />
            </DialogTrigger>
            <DialogContent className="w-full max-w-sm rounded-xl bg-white p-8">
              <WarningModal>
                <>
                  <div className="text-md text-center font-semibold text-ebony-clay">
                    {t('wantToDeleteEmployee', { employee: fullname })}
                  </div>
                  <div className="flex w-full justify-between gap-x-3">
                    <DialogClose className="w-1/2">
                      <Button className="w-full" variant="secondary">
                        {t('cancel')}
                      </Button>
                    </DialogClose>
                    <Button onClick={() => handleDeleteWorker(id)} className="w-1/2" disabled={isPending}>
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
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger>
              <Button className="px-8" variant="primary">
                {t('addEmployee')}
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-lg rounded-xl bg-white p-8">
              <EmployeeModal onSuccess={handleEditWorker} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="h-full w-full rounded-lg bg-white p-6">
        {!!employees && employees.length > 0 ? (
          <PaginatedTableWrapper
            data={employees}
            columns={[t('employee'), t('isAvailable'), t('actions')]}
            row={renderEmployeeRow}
          />
        ) : (
          <EmptyState title={t('emptyEmployees')} icon={emptyEmployees} />
        )}
      </div>
    </Layout>
  );
}
