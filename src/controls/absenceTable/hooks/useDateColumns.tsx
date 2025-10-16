import React from 'react';
import { GridColDef } from "@mui/x-data-grid";
import { Box } from '@mui/material';
import { AbsenceType, EmployeeAbsence } from '../types';
import { getMonday } from '../tools/absenceCommon';
import { AbsenceCapsule } from '../components/AbsenceCapsule';

interface UseDateColumnsProps {
  width: number;
  minWidth: number;
  date: Date;
  excludeTypes?: AbsenceType[];
  period: 'Week' | 'Month';
}

export function useDateColumns({
  width,
  minWidth,
  date,
  excludeTypes = [],
  period,
}: UseDateColumnsProps): GridColDef[] {
  let dates: Date[] = [];

  if (period === 'Week') {
    const monday = getMonday(date);
    dates = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  } else if (period === 'Month') {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysCount = end.getDate();
    dates = Array.from({ length: daysCount }).map((_, i) => {
      return new Date(date.getFullYear(), date.getMonth(), i + 1);
    });
  }

  const today = stripTime(new Date());

  return dates.map((day) => ({
    field: `${day.getDate()}`,
    headerName: `${day.getDate()}`,
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
    flex: 1,
    minWidth,
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    renderCell: (params) => {

      const cellDate = new Date(today.getFullYear(), today.getMonth(), parseInt(params.field));
      const isToday = stripTime(cellDate).getTime() === today.getTime();

      if (!params.value || params.value.length === 0) {

        return (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              bgcolor: isToday ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
            }}
          />
        );
      }

      let excludeTypes = params.value as EmployeeAbsence[];
      excludeTypes = excludeTypes.filter((t) => !excludeTypes.includes(t));

      if (excludeTypes.length === 0) return null;

      return <AbsenceCapsule absences={params.value} isToday/>;
    },
  }));
}

function stripTime(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}
