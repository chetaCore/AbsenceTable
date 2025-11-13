import React from 'react';
import { GridColDef } from "@mui/x-data-grid";
import { Box } from '@mui/material';
import { AbsenceType, EmployeeAbsence, Period } from '../../api/types/types';
import { getFieldKeyByDate, stripTime } from '../../tools/absenceCommon';
import { AbsenceCapsule } from '../../components/AbsenceCapsule';
import { ClickableEmptySlot } from '../../components/ClickableEmptySlot';
import { CreateAbsenceDialog } from '../../components/dialogs/CreateAbsenceDialog';

interface UseDateColumnsProps {
  width: number;
  minWidth: number;
  absencesTypesState?: Record<AbsenceType, boolean>;
  period: Period;
  isShowIcons: boolean;
}

export function useDateColumns({
  width,
  minWidth,
  absencesTypesState,
  period,
  isShowIcons
}: UseDateColumnsProps): GridColDef[] {

  const dates = React.useMemo(() => {
    const { startDate, endDate } = period;
    const days: Date[] = [];
    let current = new Date(startDate);

    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  }, [period]);

  const today = stripTime(new Date());

  const columns = React.useMemo<GridColDef[]>(() => {
    return dates.map((day) => {
      const isToday = stripTime(day).getTime() === today.getTime();
      const highlightBg = 'rgba(0, 123, 255, 0.08)';
      const highlightBorder = '1px solid rgba(0, 123, 255, 0.3)';

      return {
        field: `${getFieldKeyByDate(day)}`,
        headerName: `${day.getDate()}`,
        width,
        minWidth,
        flex: 1,
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
          const month = day.toLocaleDateString('ru-RU', { month: 'short' });
          return (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
                px: 0.5,
                py: 0.5,
                textTransform: 'capitalize',
                transition: 'width 0.3s ease-in-out',
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                color: isToday ? 'red' : 'inherit',
                fontWeight: isToday ? 600 : 400,
              }}
            >
              <span>{weekday},</span>
              <span>{day.getDate()}</span>
              <span>{month}</span>
            </Box>
          );
        },
        renderCell: (params) => {
          const absences = (params.value as EmployeeAbsence[] || []).filter(
            (a) => !absencesTypesState || absencesTypesState[a.type]
          );

          if (absences.length === 0) {
            return (
              <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                <ClickableEmptySlot onClick={() => console.log("Клик")} />
              </Box>
            );
          }

          return (
            <AbsenceCapsule
              absences={absences}
              isToday={isToday}
              isShowIcons={isShowIcons}
            />
          );
        },
      };
    });
  }, [dates, width, minWidth, absencesTypesState, isShowIcons, today]);

  return columns;
}
