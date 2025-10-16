import React from 'react';
import { GridColDef } from "@mui/x-data-grid";
import { Box } from '@mui/material';
import { AbsenceType, EmployeeAbsence } from '../types';
import { getMonday, stripTime } from '../tools/absenceCommon';
import { AbsenceCapsule } from '../components/AbsenceCapsule';

interface UseDateColumnsProps {
  width: number;
  minWidth: number;
  date: Date;
  excludeTypes?: AbsenceType[];
  period: 'Week' | 'Month';
  isShowIcons: boolean;
}

export function useDateColumns({
  width,
  minWidth,
  date,
  excludeTypes = [],
  period,
  isShowIcons
}: UseDateColumnsProps): GridColDef[] {

  const dates = React.useMemo(() => {
    if (period === 'Week') {
      const monday = getMonday(date);
      return Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
      });
    }
    if (period === 'Month') {
      const start = new Date(date.getFullYear(), date.getMonth(), 1);
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return Array.from({ length: end.getDate() }, (_, i) => new Date(date.getFullYear(), date.getMonth(), i + 1));
    }
    return [];
  }, [date, period]);

  const today = stripTime(new Date());

  const columns = React.useMemo<GridColDef[]>(() => {
    return dates.map((day) => {
      const isToday = stripTime(day).getTime() === today.getTime();
      const highlightBg = 'rgba(0, 123, 255, 0.08)';
      const highlightBorder = '1px solid rgba(0, 123, 255, 0.3)';
  
      const colWidth = period === 'Month' ? 100 : undefined;
  
      return {
        field: `${day.getDate()}`,
        headerName: `${day.getDate()}`,
        minWidth,
        flex: period === 'Week' ? 1 : undefined,
        width: colWidth,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
        editable: false,
        resizable: false,
        renderHeader: () => {
          const weekday = day.toLocaleDateString('ru-RU', { weekday: 'short' });
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
                px: 0.5,
                py: 0.5,
              }}
            >
              <span>{weekday}</span>
              <span>{day.getDate()}</span>
            </Box>
          );
        },
        renderCell: (params) => {
          const absences = (params.value as EmployeeAbsence[] || []).filter(
            (a) => !excludeTypes.includes(a.type)
          );
  
          if (absences.length === 0) {
            return (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  bgcolor: isToday ? highlightBg : 'transparent',
                  borderRadius: 1,
                  border: isToday ? highlightBorder : 'none',
                  transition: 'background-color 0.3s, border 0.3s',
                }}
              />
            );
          }
  
          return <AbsenceCapsule absences={absences} isToday={isToday} isShowIcons={isShowIcons} />;
        },
      };
    });
  }, [dates, minWidth, excludeTypes, isShowIcons, today, period]);
  

  return columns;
}


