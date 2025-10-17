import React, { useMemo } from 'react';
import { GridColDef, GridFilterOperator } from '@mui/x-data-grid';
import { EmployeeCard } from '../components/EmployeeCard';
import { Employee } from '../types';

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
      disableColumnMenu: true,
      renderCell: (params) => {
        if (!params.value) return null;
        return <EmployeeCard employee={params.value} />;
      },
      sortComparator: (a, b) => {
        const nameA = a?.name?.toLowerCase() || '';
        const nameB = b?.name?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      },
    },
  ], [width, minWidth, employeeCount]);

  return columns;
}
