import React from 'react';
import { GridColDef } from "@mui/x-data-grid";
import { AbsenceCapsule } from "../components/AbsenceCapsule";
import { Box } from '@mui/material';
import { AbsenceType } from '../types';

interface UseMonthColumnsProps {
  width: number;
  minWidth: number;
  date: Date; // выбранный день
  excludeTypes?: AbsenceType[];
}

export function useMonthColumns({
  width,
  minWidth,
  date,
  excludeTypes = [],
}: UseMonthColumnsProps): GridColDef[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const selectedDay = date.getDate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // массив дней месяца
  const monthDates: Date[] = [];

  // сначала выбранная дата и дни после неё
  for (let d = selectedDay; d <= daysInMonth; d++) {
    monthDates.push(new Date(year, month, d));
  }
  // затем дни до выбранной даты
  for (let d = 1; d < selectedDay; d++) {
    monthDates.push(new Date(year, month, d));
  }

  return monthDates.map((day, dayIndex) => ({
    field: `day_${dayIndex}`,
    headerName: day.toLocaleDateString('ru-RU', { weekday: 'short' }),
    renderHeader: () => {
      const weekday = day.toLocaleDateString('ru-RU', { weekday: 'short' });
      const dateNum = day.getDate();

      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1.2,
            textTransform: 'capitalize',
            whiteSpace: 'pre-line',
          }}
        >
          <span>{weekday}</span>
          <span>{dateNum}</span>
        </Box>
      );
    },
    width,
    minWidth,
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    renderCell: (params) => {
      if (!params.value || params.value.length === 0) return null;

      const row = params.row;
      const fields = Object.keys(row).filter((key) => key.startsWith('day_'));
      const index = fields.indexOf(params.field);

      const prevDay = index > 0 ? row[fields[index - 1]] : null;
      const nextDay = index < fields.length - 1 ? row[fields[index + 1]] : null;

      let types = params.value as AbsenceType[];
      types = types.filter((t) => !excludeTypes.includes(t));
      if (types.length === 0) return null;

      const hasPrevSame = prevDay && prevDay.some((t: AbsenceType) => types.includes(t));
      const hasNextSame = nextDay && nextDay.some((t: AbsenceType) => types.includes(t));

      const rounded =
        hasPrevSame && hasNextSame
          ? 'none'
          : hasPrevSame
          ? 'right'
          : hasNextSame
          ? 'left'
          : 'both';

      return (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AbsenceCapsule
            absences={types}
            rounded={rounded}
          />
        </Box>
      );
    },
  }));
}
