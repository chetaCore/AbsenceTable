import React from 'react';
import { GridColDef } from "@mui/x-data-grid";
import { Box } from '@mui/material';
import { AbsenceType, EmployeeAbsence, Period } from '../../api/types/types';
import { getFieldKeyByDate, stripTime } from '../../tools/absenceCommon';
import { AbsenceCapsule } from '../../components/AbsenceCapsule';
import { RequestResult } from '../../api/api';
import { RemoveAbsenceDTO, EditAbsenceDTO } from '../../api/dto';

interface UseDateColumnsProps {
  theme: 'dark' | 'light';
  width: number;
  minWidth: number;
  absencesTypesState?: Record<AbsenceType, boolean>;
  period: Period;
  isShowIcons: boolean;
  onEditAbsence?: (absence: EditAbsenceDTO) => Promise<RequestResult>;
  onRemoveAbsence?: (data: RemoveAbsenceDTO) => Promise<RequestResult>;
}

export function useDateColumns({
  theme,
  width,
  minWidth,
  absencesTypesState,
  period,
  isShowIcons,
  onEditAbsence,
  onRemoveAbsence
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

          const employeeName = params.row?.name;

          return (
            <AbsenceCapsule
              theme={theme}
              capsuleDate={new Date(params.field)}
              employeeName={employeeName}
              absences={absences}
              isShowIcons={isShowIcons}
              onEditAbsence={onEditAbsence}
              onRemoveAbsence={onRemoveAbsence}
            />
          );
        },
      };
    });
  }, [dates, width, minWidth, absencesTypesState, isShowIcons, today]);

  return columns;
}
