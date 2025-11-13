import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect, useMemo } from 'react';
import { Employee, EmployeeAbsence, Period, AbsenceType } from '../api/types/types';
import { GRID_RU_LOCALE_TEXT } from '../gridLocale.ru';
import { useDateColumns } from '../hooks/gridColumns/useDateColumns';
import { useEmployeeColumns } from '../hooks/gridColumns/useEmployeeColumns';
import { buildEmployeeRows } from '../tools/buildEmployeeRows';

export const AbsenceGrid: React.FC<{
  employees: Employee[];
  absences: EmployeeAbsence[];
  period: Period;
  absencesTypesState: Record<AbsenceType, boolean>;
  isShowIcons: boolean;
  isWideColumns: boolean;
  isShowEmptyEmployees: boolean;
  isLoading: boolean;
}> = ({
  employees,
  absences,
  period,
  absencesTypesState,
  isShowIcons,
  isWideColumns,
  isShowEmptyEmployees,
  isLoading,
}) => {
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

  const allColumns = useMemo(() => [...employeeColumns, ...weekDaysColumns], [employeeColumns, weekDaysColumns]);
  const rows = useMemo(() => buildEmployeeRows(employees, period, absences, isShowEmptyEmployees), [employees, absences, period, isShowEmptyEmployees]);

  return (
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
        '& .MuiDataGrid-virtualScroller': { overflowY: 'auto' },
      }}
    />
  );
};
