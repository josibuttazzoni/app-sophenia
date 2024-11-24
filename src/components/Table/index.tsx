import { StaticImageData } from 'next/image';
import { ReactNode, useState } from 'react';
import { Employee } from 'src/types/employee';
import { Backlog } from 'src/types/tasks';
import { WorkOrder } from 'src/types/workOrders';

import EmptyState from '#components/EmptyState';
import LoadingWrapper from '#components/LoadingWrapper';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '#components/ui/pagination';
import { TableRow } from '#components/ui/table';

import { BaseTable, BaseTableProps } from './BaseTable';
import { ITEMS_PER_PAGE } from './constants';

type TableData = Backlog | Employee | WorkOrder;

type PaginatedTableWrapperProps<T extends TableData> = {
  data?: T[];
  columns: string[];
  itemsPerPage?: number;
  row: (item: T) => JSX.Element | ReactNode;
  emptyStateIcon: StaticImageData;
  emptyStateTitle: string;
  loading?: boolean;
} & BaseTableProps;

export default function PaginatedTableWrapper<T extends TableData>({
  data,
  columns,
  itemsPerPage = ITEMS_PER_PAGE,
  row,
  emptyStateIcon,
  emptyStateTitle,
  loading,
  ...props
}: PaginatedTableWrapperProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((data?.length ?? 0) / itemsPerPage);
  const paginatedData = data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <LoadingWrapper loading={loading}>
      {!!data && data.length > 0 ? (
        <div className="flex h-full flex-col justify-between">
          <BaseTable columns={columns} {...props}>
            {paginatedData?.map((item, index) => <TableRow key={index}>{row(item)}</TableRow>)}
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
      ) : (
        <EmptyState title={emptyStateTitle} icon={emptyStateIcon} />
      )}
    </LoadingWrapper>
  );
}
