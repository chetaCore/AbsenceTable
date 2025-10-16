import React, { useMemo } from 'react';
import { GridColDef, GridFilterOperator } from '@mui/x-data-grid';
import { EmployeeCard } from '../components/EmployeeCard';

interface useEmployeeColumnsProps {
  width: number;
  minWidth: number;
  employeeCount: number;
}

export function useEmployeeColumns({
  width,
  minWidth,
  employeeCount,
}: useEmployeeColumnsProps): GridColDef[] {

  const customFilterOperators: GridFilterOperator[] = [
    {
      label: 'Содержит',
      value: 'contains',
      getApplyFilterFn: (filterItem) => {

        console.log(filterItem);
        if (!filterItem.value) return null;
        const filterValue = filterItem.value.toLowerCase();
        return (params) => {
          const employee = params.value;
          if (!employee) return false;

          const nameMatch = employee.name?.toLowerCase().includes(filterValue);
          const departmentMatch = employee.department?.toLowerCase().includes(filterValue);

          return nameMatch || departmentMatch; // ищем и по имени, и по подразделению
        };
      },
    },
  ];

  const columns = useMemo<GridColDef[]>(() => [
    {
      headerName: `Сотрудники (${employeeCount})`,
      headerAlign: 'center',
      field: 'employee',
      width,
      minWidth,
      align: 'center',
      cellClassName: 'stickyColumn',
      headerClassName: 'stickyColumnHeader',
      renderCell: (params) => {
        if (!params.value) return null;
        return <EmployeeCard employee={params.value} />;
      },
      sortComparator: (a, b) => {
        const nameA = a?.name?.toLowerCase() || '';
        const nameB = b?.name?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      },
      filterOperators: customFilterOperators,
    },
  ], [width, minWidth, employeeCount]);

  return columns;
}
