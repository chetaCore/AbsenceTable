
import React from 'react';
import { useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { EmployeeCard } from '../components/EmployeeCard';

interface useEmployeeColumnsProps {
  width: number;
  minWidth: number;
  employeeCount: number;
}

export function useEmployeeColumns({ width, minWidth, employeeCount }: useEmployeeColumnsProps): GridColDef[] {
  const columns = useMemo<GridColDef[]>(() => {
    const employeeColumn: GridColDef = {
      headerName: `Сотрудники (${employeeCount})`,
      headerAlign: "center",
      field: 'employee',
      width,
      minWidth,
      align: 'center', 
      cellClassName: 'stickyColumn',
      headerClassName: 'stickyColumnHeader',
      renderCell: (params) => {
        if (!params.value) return null;

        return (<EmployeeCard employee={params.value}/>
        );
      }
    };

    return [employeeColumn];
  }, [width, minWidth, employeeCount]);

  return columns;
}