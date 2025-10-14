
import React from 'react';
import { useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Employee } from '../types';
import { Box } from '@mui/material';

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
      field: 'name',
      width,
      minWidth,
      align: 'center', 
      cellClassName: 'stickyColumn',
      headerClassName: 'stickyColumnHeader',
      renderCell: (params) => {
        if (!params.value) return null;

        return (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
            }}
          >
            {params.value}
          </Box>
        );
      }
    };

    return [employeeColumn];
  }, [width, minWidth, employeeCount]);

  return columns;
}