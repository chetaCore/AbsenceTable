import React from 'react';
import { Box, Button, ButtonGroup } from "@mui/material";
import { CalendarMonth } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';

interface DatePickerWithControlsProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  steps?: {
    label: string;
    days: number;
  }[];
}

export const DatePickerWithControls: React.FC<DatePickerWithControlsProps> = ({
  selectedDate,
  onDateChange,
  steps = [
    { label: 'Ближе', days: -7 },
    { label: 'Сейчас', days: 0 },
    { label: 'Дальше', days: 7 },
  ],
}) => {
  const handleStepClick = (days: number) => {
    if (days === 0) {
      onDateChange(new Date());
    } else {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + days);
      onDateChange(newDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid #ccc',
          width: '100%',
          maxWidth: 380,
        }}
      >
        {/* DatePicker */}
        <Box sx={{ flex: 1 }}>
          <DatePicker
            value={selectedDate}
            onChange={(newValue) => newValue && onDateChange(newValue)}
            slots={{ openPickerIcon: CalendarMonth }}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            }}
          />
        </Box>

        {/* Buttons снизу */}
        <ButtonGroup
          variant="contained"
          fullWidth
          sx={{
            '& .MuiButton-root': {
              borderRadius: 0,
              textTransform: 'none',
              px: 2,
              bgcolor: '#1976d2',
              color: '#fff',
              '&:hover': { bgcolor: '#125ea5' },
            },
            '& .MuiButton-root:first-of-type': {
              borderBottomLeftRadius: '16px',
            },
            '& .MuiButton-root:last-of-type': {
              borderBottomRightRadius: '16px',
            },
          }}
        >
          {steps.map((step) => (
            <Button key={step.label} onClick={() => handleStepClick(step.days)}>
              {step.label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </LocalizationProvider>
  );
};
