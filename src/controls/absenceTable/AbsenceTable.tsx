import React from 'react';
import { useState } from 'react';
import { IRemoteComponentContext, IRemoteComponentCoverApi } from '@directum/sungero-remote-component-types';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, List, ListItemButton, Stack, ThemeProvider } from '@mui/material';
import { useEmployeeColumns } from './hooks/useEmployeeColumns';
import { useEmployees } from './hooks/useEmployees';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { ru } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEmployeeAbsences } from './hooks/useEmployeeAbsences';
import { buildEmployeeRows } from './tools/buildEmployeeRows';
import { AbsenceButton } from './components/AbsenceButton';
import { AbsenceType } from './types';
import { GRID_RU_LOCALE_TEXT } from './gridLocale.ru';
import { getTheme } from './tools/tableStyle';

interface IProps {
  api: IRemoteComponentCoverApi;
}

const AbsenceTable: React.FC<IProps> = ({ api }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const employees = useEmployees();
  const employeeColumns = useEmployeeColumns({ width: 200, minWidth: 100, employeeCount: employees?.length });
  const absences = useEmployeeAbsences();
  const rows = buildEmployeeRows(employees, selectedDate, absences);
  const [activeAbsences, setActiveAbsences] = useState<Record<AbsenceType, boolean>>({
    [AbsenceType.vacation]: true,
    [AbsenceType.sick]: true,
    [AbsenceType.businessTrip]: true,
  });

  const activeExcludeTypes = Object.entries(activeAbsences)
    .filter(([_, isActive]) => !isActive)
    .map(([type]) => Number(type) as AbsenceType);

  const weekDaysColumns = ({
    width: 50,
    minWidth: 1,
    date: selectedDate,
    absences,
    excludeTypes: activeExcludeTypes,
  });

  const allColumns = [...employeeColumns, ...weekDaysColumns];

  const handleButtonClick = (type: AbsenceType) => {
    setActiveAbsences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <ThemeProvider theme={getTheme('light')}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
        <Box
          borderRadius="10px"
          sx={{
            width: '80%',
            height: '100%',
            border: '2px solid',
          }}
        >
          <Stack
            sx={{
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              flexDirection: 'row',
            }}
          >
            <Stack direction="row" spacing={1}>
              <AbsenceButton
                type={AbsenceType.vacation}
                active={activeAbsences[AbsenceType.vacation]}
                onClick={() => handleButtonClick(AbsenceType.vacation)}
              >
                Отпуска
              </AbsenceButton>

              <AbsenceButton
                type={AbsenceType.sick}
                active={activeAbsences[AbsenceType.sick]}
                onClick={() => handleButtonClick(AbsenceType.sick)}
              >
                Больничный
              </AbsenceButton>

              <AbsenceButton
                type={AbsenceType.businessTrip}
                active={activeAbsences[AbsenceType.businessTrip]}
                onClick={() => handleButtonClick(AbsenceType.businessTrip)}
              >
                Командировки
              </AbsenceButton>
            </Stack>

            {/* Правая часть — выбор даты */}
            <DatePicker
              label="Выберите дату"
              value={selectedDate}
              onChange={(newValue) => {
                if (newValue) setSelectedDate(newValue);
              }}
            />
          </Stack>

          <DataGrid
            columns={allColumns}
            rows={rows}
            hideFooter
            disableVirtualization
            showCellVerticalBorder
            showColumnVerticalBorder
            getRowHeight={() => 50}
            localeText={GRID_RU_LOCALE_TEXT}
          />
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};



export default AbsenceTable;



