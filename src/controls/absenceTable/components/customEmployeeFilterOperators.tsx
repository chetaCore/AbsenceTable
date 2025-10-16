import { GridFilterOperator } from '@mui/x-data-grid';
import { Employee } from '../types';
import React from 'react';

// Компонент для ввода значения фильтра (можно кастомизировать)
const EmployeeFilterInput = (props: any) => {
  const { item, applyValue } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyValue({ ...item, value: event.target.value });
  };

  return <input type="text" value={item.value || ''} onChange={handleChange} style={{ width: '100%' }} />;
};

export const customEmployeeFilterOperators: GridFilterOperator<Employee, string>[] = [
  {
    label: 'Содержит',
    value: 'contains',
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) return null;

      const filterValue = filterItem.value.toLowerCase();

      return (params) => {
        const employee: Employee | null = params as Employee;
        if (!employee) return false;

        const nameMatch = employee.name?.toLowerCase().includes(filterValue);
        const departmentMatch = employee.department?.toLowerCase().includes(filterValue);

        return nameMatch || departmentMatch;
      };
    },
    InputComponent: EmployeeFilterInput,
  },
];
