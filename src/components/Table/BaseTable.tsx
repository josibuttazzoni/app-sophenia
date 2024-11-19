import { ReactNode } from 'react';

import Arrow from '#assets/arrow.svg';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '#components/ui/table';
import { cn } from '#utils/components';

export type BaseTableProps = {
  columns: string[];
  children?: ReactNode;
  onSort?: (column: string) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  className?: string;
};

export function BaseTable({
  columns,
  children,
  onSort,
  sortColumn,
  sortDirection,
  className
}: BaseTableProps) {
  const isSortColumn = (column: string) => onSort && sortColumn === column;
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          {columns.map(column => (
            <TableHead
              key={column}
              onClick={() => (isSortColumn(column) ? onSort?.(column) : null)}
              className={cn(`${isSortColumn(column) ? 'cursor-pointer' : ''}`, className)}
            >
              <div className="flex items-center">
                {column}
                {onSort && sortColumn === column && (
                  <Arrow
                    className={`ml-2 transition-transform ${
                      sortDirection === 'asc' ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                )}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
}
