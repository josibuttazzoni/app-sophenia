import { ReactNode, useState } from 'react';
import { Employee } from 'src/types/employee';
import { Task } from 'src/types/tasks';
import { WorkOrder } from 'src/types/workOrders';

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '#components/ui/pagination';
import { TableRow } from '#components/ui/table';

import { BaseTable } from './BaseTable';
import { ITEMS_PER_PAGE } from './constants';

type TableData = Task | Employee | WorkOrder;

type PaginatedTableWrapperProps<T extends TableData> = {
  data: T[];
  columns: string[];
  itemsPerPage?: number;
  row: (item: T) => JSX.Element | ReactNode;
};

export default function PaginatedTableWrapper<T extends TableData>({
  data,
  columns,
  itemsPerPage = ITEMS_PER_PAGE,
  row
}: PaginatedTableWrapperProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex h-full flex-col justify-between">
      <BaseTable columns={columns}>
        {paginatedData.map((item, index) => (
          <TableRow key={index}>{row(item)}</TableRow>
        ))}
      </BaseTable>
      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink isActive={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
