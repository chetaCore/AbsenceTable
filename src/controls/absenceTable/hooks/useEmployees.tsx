import React from 'react';
import { useMemo } from 'react';
import { Employee } from '../types';

export function useEmployees(): Employee[] {
  const rows = useMemo<Employee[]>(() => {
    const employeeStub: Employee[] = [
      { id: 1, name: "Иванов И.И." },
      { id: 2, name: "Петров П.П." },
      { id: 3, name: "Сидоров С.С." },
    ];

    return employeeStub;
  }, []);

  return rows;
}
