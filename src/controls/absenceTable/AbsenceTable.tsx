import React, { useState } from 'react';
import { IRemoteComponentCoverApi } from '@directum/sungero-remote-component-types';
import { Box, Stack, ThemeProvider } from '@mui/material';
import { useEmployeeColumns } from './hooks/useEmployeeColumns';
import { useEmployees } from './hooks/useEmployees';
import { useEmployeeAbsences } from './hooks/useEmployeeAbsences';
import { buildEmployeeRows } from './tools/buildEmployeeRows';
import { useDateColumns } from './hooks/useDateColumns';
import { GRID_RU_LOCALE_TEXT } from './gridLocale.ru';
import { getTheme } from './tools/tableStyle';
import { DataGrid } from '@mui/x-data-grid';
import { subWeeks, addWeeks } from 'date-fns';
import { AbsenceType } from './types';
import { AbsenceFilter } from './components/AbsenceFilter';

const AbsenceTable: React.FC<{ api: IRemoteComponentCoverApi }> = ({ api }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const employeesData = useEmployees();
  const employeeColumns = useEmployeeColumns({ width: 300, minWidth: 300, employeeCount: employeesData?.length });
  const absences = useEmployeeAbsences();
  const [activeAbsences, setActiveAbsences] = useState<Record<AbsenceType, boolean>>({
    [AbsenceType.vacation]: true,
    [AbsenceType.sick]: true,
    [AbsenceType.businessTrip]: true,
    [AbsenceType.halfDay]: true,
    [AbsenceType.remoteWork]: true,
    [AbsenceType.businessTripOut]: true,
  });

  const activeExcludeTypes = Object.entries(activeAbsences)
  .filter(([_, isActive]) => !isActive)
  .map(([type]) => Number(type) as AbsenceType);
  
  const weekDaysColumns = useDateColumns({
    width: 50,
    minWidth: 60,
    date: selectedDate,
    excludeTypes: activeExcludeTypes,
    period: 'Month'
  });
  
  const allColumns = [...employeeColumns, ...weekDaysColumns];
  const rows = buildEmployeeRows(employeesData.map(e => e.employee), selectedDate, absences);


  const handleAbsenceToggle = (type: AbsenceType) => {
    setActiveAbsences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <ThemeProvider theme={getTheme('light')}>
      <Box
        borderRadius="10px"
        sx={{
          width: '80%',
          height: '100%',
          border: '2px solid',
        }}
      >
        <AbsenceFilter
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          activeAbsences={activeAbsences}
          onAbsenceToggle={handleAbsenceToggle}
          onShowIconClick={() => true}
          onShowMonthClick={() => true}
        />

        <DataGrid
          columns={allColumns}
          rows={rows}
          hideFooter
          disableVirtualization
          showCellVerticalBorder
          showColumnVerticalBorder
          getRowHeight={() => 60}
          localeText={GRID_RU_LOCALE_TEXT}
        />
      </Box>
    </ThemeProvider>
  );
};

export default AbsenceTable;
