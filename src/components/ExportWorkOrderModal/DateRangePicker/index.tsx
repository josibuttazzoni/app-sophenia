import { cx } from 'class-variance-authority';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '#components/ui/button';
import { Calendar } from '#components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '#components/ui/popover';

export function DateRangePicker({ date, setDate }) {
  return (
    <div className={cx('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cx('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'MM/dd/yyyy')} - {format(date.to, 'MM/dd/yyyy')}
                </>
              ) : (
                format(date.from, 'MM/dd/yyyy')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
