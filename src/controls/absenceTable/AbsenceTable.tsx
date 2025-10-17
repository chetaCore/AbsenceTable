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
import { AbsenceType, Period } from './types';
import { AbsenceToolbar } from './components/AbsenceToolbar';
import { startOfWeek, endOfWeek } from 'date-fns';

const AbsenceTable: React.FC<{ api: IRemoteComponentCoverApi }> = ({ api }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [period, setPeriod] = useState<Period>({
    startDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
    endDate: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });
  const [isShowIcons, setIsShowIcons] = useState(true);
  const [filter, setFilter] = useState('');
  const [isScaleX2, setIsScaleX2] = useState(false);

  const employeesData = useEmployees(filter);
  const absences = useEmployeeAbsences();

  const employeeColumns = useEmployeeColumns({
    width: 300,
    minWidth: 300,
    employeeCount: employeesData?.length
  });

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
    width: isScaleX2 ? 200 : 100,
    minWidth: isScaleX2 ? 240 : 120,
    excludeTypes: activeExcludeTypes,
    period: period,
    isShowIcons
  });

  const allColumns = [...employeeColumns, ...weekDaysColumns];
  const rows = buildEmployeeRows(employeesData.map(e => e.employee), period, absences);

  const handleAbsenceToggle = (type: AbsenceType) => {
    setActiveAbsences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <Box
        borderRadius="10px"
        minWidth={1750}
        width='80%'
        height='100%'
        border='2px solid'
      >

        <AbsenceToolbar
          activeAbsences={activeAbsences}
          filter={filter}
          period={period}
          theme={theme}
          onAbsenceToggle={handleAbsenceToggle}
          onShowIconClick={setIsShowIcons}
          onFilterValueChange={setFilter}
          onPeriodChange={setPeriod}
          onThemeChanged={(value) => setTheme(value ? 'dark' : 'light')}
          onScaleChanged={setIsScaleX2}
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
          sx={{
            maxHeight: 60 * 10,
            '& .MuiDataGrid-virtualScroller': {
              overflowY: 'auto',
            },
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default AbsenceTable;
