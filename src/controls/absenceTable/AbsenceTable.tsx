import React, { useState, useMemo, useCallback } from 'react';
import { IRemoteComponentCoverApi } from '@directum/sungero-remote-component-types';
import { Box, ThemeProvider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { startOfWeek, endOfWeek } from 'date-fns';

import { useEmployeeColumns } from './hooks/useEmployeeColumns';
import { useEmployees } from './hooks/useEmployees';
import { useEmployeeAbsences } from './hooks/useEmployeeAbsences';
import { buildEmployeeRows } from './tools/buildEmployeeRows';
import { useDateColumns } from './hooks/useDateColumns';
import { GRID_RU_LOCALE_TEXT } from './gridLocale.ru';
import { getTheme } from './tools/tableStyle';
import { AbsenceToolbar } from './components/AbsenceToolbar';
import { AbsenceType, Employee, EmployeeAbsence, Period } from './api/types/types';

const AbsenceTable: React.FC<{ api: IRemoteComponentCoverApi }> = ({ api }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [loadingCount, setLoadingCount] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [absences, setAbsences] = useState<EmployeeAbsence[]>([]);
  const [filter, setFilter] = useState('');
  const [isShowIcons, setIsShowIcons] = useState(true);
  const [isWideColumns, setIsWideColumns] = useState(false);
  const [isShowEmptyEmployees, setIsShowEmptyEmployees] = useState(false);

  const [period, setPeriod] = useState<Period>({
    startDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
    endDate: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  const [absencesTypesState, setAbsencesTypesState] = useState<Record<AbsenceType, boolean>>({
    [AbsenceType.Vacation]: true,
    [AbsenceType.SickLeave]: true,
    [AbsenceType.JobDeparture]: true,
    [AbsenceType.LeaveOfAbs4h]: true,
    [AbsenceType.RemoteWork]: true,
    [AbsenceType.BusinessTripOut]: true,
  });

  // --- Callbacks and handlers ---
  const handleLoadingChange = useCallback((isLoading: boolean) => {
    setLoadingCount((count) => count + (isLoading ? 1 : -1));
  }, []);

  const handleError = useCallback((error: string) => {
    setErrors((prev) => [...prev, error]);
  }, []);

  // --- Memoized parameters to prevent infinite fetch ---
  const employeeParams = useMemo(
    () => ({
      filter,
      onEmployeesChange: setEmployees,
      onLoadingChange: handleLoadingChange,
      onError: handleError,
    }),
    [filter, handleLoadingChange, handleError]
  );

  const absencesParams = useMemo(
    () => ({
      employees,
      period,
      onAbsencesChange: setAbsences,
      onLoadingChange: handleLoadingChange,
      onError: handleError,
    }),
    [employees, period, handleLoadingChange, handleError]
  );

  // --- Custom hooks (they use useEffect inside themselves) ---
  useEmployees(employeeParams);
  useEmployeeAbsences(absencesParams);

  // --- Columns and rows ---
  const employeeColumns = useEmployeeColumns({
    width: 300,
    minWidth: 300,
    employeeCount: employees?.length,
  });

  const weekDaysColumns = useDateColumns({
    width: isWideColumns ? 200 : 100,
    minWidth: isWideColumns ? 240 : 120,
    absencesTypesState,
    period,
    isShowIcons,
  });

  const allColumns = useMemo(
    () => [...employeeColumns, ...weekDaysColumns],
    [employeeColumns, weekDaysColumns]
  );

  const rows = useMemo(
    () => buildEmployeeRows(employees, period, absences, isShowEmptyEmployees),
    [employees, absences, period, isShowEmptyEmployees]
  );

  const isLoading = loadingCount > 0;

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <Box
        sx={{
          flex: '1 1 auto',
          minWidth: 0,
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'block',
          '& table': {
            tableLayout: 'fixed',
            width: 'max-content',
            borderCollapse: 'collapse',
          },
          '& th, & td': {
            whiteSpace: 'nowrap',
          },
        }}
      >
        <AbsenceToolbar
          absencesTypesState={absencesTypesState}
          filter={filter}
          period={period}
          theme={theme}
          isShowIcons={isShowIcons}
          isWideColumns={isWideColumns}
          isShowEmptyEmployees={isShowEmptyEmployees}
          onAbsencesTypesStateToggle={setAbsencesTypesState}
          onShowIconClick={setIsShowIcons}
          onFilterValueChange={setFilter}
          onPeriodChange={setPeriod}
          onThemeChanged={(value) => setTheme(value ? 'dark' : 'light')}
          onScaleChanged={setIsWideColumns}
          onShowEmptyEmployeesChanged={setIsShowEmptyEmployees}
        />

        <DataGrid
          key={isWideColumns ? 'wide' : 'normal'}
          columns={allColumns}
          rows={rows}
          hideFooter
          disableVirtualization
          showCellVerticalBorder
          showColumnVerticalBorder
          getRowHeight={() => 60}
          localeText={GRID_RU_LOCALE_TEXT}
          loading={isLoading}
          sx={{
            flex: 1,
            width: '100%',
            height: '100%',
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
