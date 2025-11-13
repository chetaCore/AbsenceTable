import React, { useState, useMemo } from 'react';
import { Employee, EmployeeAbsence } from '../../api/types/types';
import { useEmployeeAbsences } from '../api/useEmployeeAbsences';
import { useEmployees } from '../api/useEmployees';


export function useEmployeeData({ filter, period, onLoadingChange, onError }: any) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [absences, setAbsences] = useState<EmployeeAbsence[]>([]);

  const employeeParams = useMemo(
    () => ({ filter, onEmployeesChange: setEmployees, onLoadingChange, onError }),
    [filter, onLoadingChange, onError]
  );

  const absencesParams = useMemo(
    () => ({ employees, period, onAbsencesChange: setAbsences, onLoadingChange, onError }),
    [employees, period, onLoadingChange, onError]
  );

  const { allEmployees, refreshEmployees } = useEmployees(employeeParams);
  const { refreshAbcences } = useEmployeeAbsences(absencesParams);

  return { employees, allEmployees, absences, refreshAbcences, refreshEmployees };
}
