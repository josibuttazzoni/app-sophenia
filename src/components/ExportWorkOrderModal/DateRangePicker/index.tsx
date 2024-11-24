import { cx } from 'class-variance-authority';
import { es } from 'date-fns/locale';
import * as React from 'react';

import { Calendar } from '#components/ui/calendar';

export function DateRangePicker({ className, date, setDate }) {
  return (
    <div className={cx('grid h-96 gap-2', className)}>
      <Calendar
        initialFocus
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        locale={es}
      />
    </div>
  );
}
