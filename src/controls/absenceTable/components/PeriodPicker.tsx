import React from 'react';
import { Box, Button, Paper, Stack } from "@mui/material";
import { CalendarMonth } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import { addDays, differenceInDays } from 'date-fns';
import { Period } from '../api/types/types';
import { MAX_PERIOD_PICKER_PERIOD_DAYS } from '../constants';

dayjs.extend(weekday);

interface PeriodPickerProps {
  period: Period;
  onPeriodChange: (period: Period) => void;
}

export const PeriodPicker: React.FC<PeriodPickerProps> = ({
  period,
  onPeriodChange,
}) => {
  const { startDate, endDate } = period;

  const handleStartChange = (value: Dayjs | null) => {
    if (!value) return;
    const date = value.toDate();
    let newEnd = endDate;

    if (differenceInDays(newEnd, date) > MAX_PERIOD_PICKER_PERIOD_DAYS) {
      newEnd = addDays(date, MAX_PERIOD_PICKER_PERIOD_DAYS);
    }
    if (date > newEnd) newEnd = date;

    onPeriodChange({ startDate: date, endDate: newEnd });
  };

  const handleEndChange = (value: Dayjs | null) => {
    if (!value) return;
    const date = value.toDate();
    let newStart = startDate;

    if (differenceInDays(date, newStart) > MAX_PERIOD_PICKER_PERIOD_DAYS) {
      newStart = addDays(date, -MAX_PERIOD_PICKER_PERIOD_DAYS);
    }
    if (date < newStart) newStart = date;

    onPeriodChange({ startDate: newStart, endDate: date });
  };

  const handleThisWeek = () => {
    const today = dayjs();
    const start = today.weekday(1);
    const end = today.weekday(7); 
    onPeriodChange({ startDate: start.toDate(), endDate: end.toDate() });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <Stack spacing={1}>
        <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
          <Paper
            elevation={3}>
            
            <DatePicker
              label="Начало периода"
              value={dayjs(startDate)}
              onChange={(newValue) => handleStartChange(newValue as Dayjs | null)}
              slots={{ openPickerIcon: CalendarMonth }}
              slotProps={{ textField: { size: 'small', variant: 'outlined' } as any }}
              sx={{ width: 150 }}
            />
          </Paper>

          <Paper
            elevation={3}>
            <DatePicker
              label="Конец периода"
              value={dayjs(endDate)}
              onChange={(newValue) => handleEndChange(newValue as Dayjs | null)}
              slots={{ openPickerIcon: CalendarMonth }}
              slotProps={{ textField: { size: 'small', variant: 'outlined' } as any }}
              sx={{ width: 150 }}
            />
          </Paper>
        </Stack>

        <Paper
          elevation={3}
          sx={{
            width: '100%',
          }}>
          <Button
            fullWidth
            onClick={handleThisWeek}
            variant='outlined'
            color='inherit'
          >
            Эта неделя
          </Button>
        </Paper>
      </Stack>
    </LocalizationProvider>
  );
};
