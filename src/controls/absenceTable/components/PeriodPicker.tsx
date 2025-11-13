import React from 'react';
import { Box, Button } from "@mui/material";
import { CalendarMonth } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { startOfWeek, endOfWeek, addDays, subDays } from 'date-fns';
import { Period } from '../api/types/types';

interface PeriodPickerProps {
  period: Period;
  onPeriodChange: (period: Period) => void;
}

export const PeriodPicker: React.FC<PeriodPickerProps> = ({
  period,
  onPeriodChange,
}) => {
  const { startDate, endDate } = period;

  const today = new Date();
  const rangeStart = subDays(today, 31);
  const rangeEnd = addDays(today, 31);

  const handleThisWeek = () => {
    const start = startOfWeek(today, { weekStartsOn: 1 });
    const end = endOfWeek(today, { weekStartsOn: 1 });

    const safeStart = start < rangeStart ? rangeStart : start;
    const safeEnd = end > rangeEnd ? rangeEnd : end;

    onPeriodChange({ startDate: safeStart, endDate: safeEnd });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          borderRadius: '16px',
          overflow: 'hidden',
          width: '100%',
          maxWidth: 400,
          p: 1,
        }}
      >
        {/* Выбор начальной даты */}
        <DatePicker
          label="Начало периода"
          value={startDate}
          minDate={rangeStart}
          maxDate={endDate > rangeEnd ? rangeEnd : endDate}
          onChange={(date) => {
            if (!date) return;
            const newStart = date > endDate ? endDate : date;
            onPeriodChange({ startDate: newStart as Date, endDate });
          }}
          slots={{ openPickerIcon: CalendarMonth }}
          slotProps={{
            textField: {
              size: 'small',
              variant: 'outlined',
            } as any,
          }}
        />

        {/* Выбор конечной даты */}
        <DatePicker
          label="Конец периода"
          value={endDate}
          minDate={startDate < rangeStart ? rangeStart : startDate}
          maxDate={rangeEnd}
          onChange={(date) => {
            if (!date) return;
            const newEnd = date < startDate ? startDate : date;
            onPeriodChange({ startDate, endDate: newEnd as Date });
          }}
          slots={{ openPickerIcon: CalendarMonth }}
          slotProps={{
            textField: {
              size: 'small',
              variant: 'outlined',
            } as any,
          }}
        />

        {/* Кнопка "Эта неделя" */}
        <Button
          variant="contained"
          sx={{
            mt: 1,
            bgcolor: '#1976d2',
            '&:hover': { bgcolor: '#125ea5' },
            borderRadius: '16px',
            textTransform: 'none',
            px: 2,
            py: 0.5,
            minHeight: 36,
            width: 300,
          }}
          onClick={handleThisWeek}
        >
          Эта неделя
        </Button>
      </Box>
    </LocalizationProvider>
  );
};
