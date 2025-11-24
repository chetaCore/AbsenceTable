import { DataGrid } from '@mui/x-data-grid';
import React, { useMemo } from 'react';
import { Employee, EmployeeAbsence, Period, AbsenceType } from '../api/types/types';
import { GRID_RU_LOCALE_TEXT } from '../gridLocale.ru';
import { useDateColumns } from '../hooks/gridColumns/useDateColumns';
import { useEmployeeColumns } from '../hooks/gridColumns/useEmployeeColumns';
import { buildEmployeeRows } from '../tools/buildEmployeeRows';
import { RequestResult } from '../api/api';
import { EditAbsenceDTO, RemoveAbsenceDTO } from '../api/dto';
import { COLUMN_HEIGHT, DATE_COLUMNS_WIDTH, EMPLOYEE_COLUMNS_WIDTH, MIN_DATE_COLUMNS_WIDTH, MIN_EMPLOYEE_COLUMNS_WIDTH, MIN_WIDE_DATE_COLUMNS_WIDTH, WIDE_DATE_COLUMNS_WIDTH } from '../constants';

export const AbsenceGrid: React.FC<{
  theme: 'dark' | 'light';
  filter: number[],
  allEmployees: Employee[];
  employees: Employee[];
  absences: EmployeeAbsence[];
  period: Period;
  absencesTypesState: Record<AbsenceType, boolean>;
  isShowIcons: boolean;
  isWideColumns: boolean;
  isShowEmptyEmployees: boolean;
  isLoading: boolean;
  onFilterChange: (employeesIds: number[]) => void;
  onEditAbsence?: (absence: EditAbsenceDTO) => Promise<RequestResult>;
  onRemoveAbsence?: (data: RemoveAbsenceDTO) => Promise<RequestResult>;
}> = ({
  theme,
  filter,
  allEmployees,
  employees,
  absences,
  period,
  absencesTypesState,
  isShowIcons,
  isWideColumns,
  isShowEmptyEmployees,
  isLoading,
  onEditAbsence,
  onRemoveAbsence,
  onFilterChange
}) => {
  const employeeColumns = useEmployeeColumns({
    width: EMPLOYEE_COLUMNS_WIDTH,
    minWidth: MIN_EMPLOYEE_COLUMNS_WIDTH,
    filter: filter,
    employees: allEmployees,
    onFilterChange
  });

  const weekDaysColumns = useDateColumns({
    theme,
    width: isWideColumns ? WIDE_DATE_COLUMNS_WIDTH : DATE_COLUMNS_WIDTH,
    minWidth: isWideColumns ? MIN_WIDE_DATE_COLUMNS_WIDTH : MIN_DATE_COLUMNS_WIDTH,
    absencesTypesState,
    period,
    isShowIcons,
    onEditAbsence,
    onRemoveAbsence
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
      getRowHeight={() => COLUMN_HEIGHT}
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
