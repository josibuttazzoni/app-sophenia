import { ReactNode } from 'react';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '#components/ui/table';

export function BaseTable({ columns, children }: { columns: string[]; children: ReactNode }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          {columns.map(column => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
}
