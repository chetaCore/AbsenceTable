import React from 'react';
import { Box, Button, TextField } from "@mui/material";
import { CalendarMonth } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { Period } from '../types';

interface PeriodPickerProps {
  period: Period;
  onPeriodChange: (period: Period) => void;
}

export const PeriodPicker: React.FC<PeriodPickerProps> = ({
  period,
  onPeriodChange,
}) => {
  const { startDate, endDate } = period;

  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());

  const handleThisWeek = () => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    const end = endOfWeek(new Date(), { weekStartsOn: 1 });

    const safeStart = start < monthStart ? monthStart : start;
    const safeEnd = end > monthEnd ? monthEnd : end;

    onPeriodChange({ startDate: safeStart, endDate: safeEnd });
  };

  const pickerStyle = {
    bgcolor: '#f0f0f0',
    borderRadius: '16px',
    px: 2,
    py: 0.5,
    minHeight: 36,
    width: 300,
    textTransform: 'none',
    '& .MuiSvgIcon-root': {
      fontSize: 20,
      color: '#000',
    },
    '&:hover': {
      bgcolor: '#e0e0e0',
    },
    '&.Mui-focused': {
      bgcolor: '#1976d2',
      color: '#fff',
      '& .MuiSvgIcon-root': { color: '#fff' },
    },
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
          minDate={monthStart}
          maxDate={endDate > monthEnd ? monthEnd : endDate}
          onChange={(date) => {
            if (!date) return;
            const newStart = date > endDate ? endDate : date;
            onPeriodChange({ startDate: newStart, endDate });
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
          minDate={startDate < monthStart ? monthStart : startDate}
          maxDate={monthEnd}
          onChange={(date) => {
            if (!date) return;
            const newEnd = date < startDate ? startDate : date;
            onPeriodChange({ startDate, endDate: newEnd });
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
