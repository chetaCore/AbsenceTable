import { useMemo } from 'react';
import { AbsenceType } from '../types';

export interface EmployeeAbsence {
  employeeId: number;
  type: AbsenceType;
  startDate: Date;
  endDate: Date;
}

// Хук для получения отсутствий сотрудников
export function useEmployeeAbsences(): EmployeeAbsence[] {
  const absences: EmployeeAbsence[] = useMemo(() => [
    {
      employeeId: 1,
      type: AbsenceType.sick,
      startDate: new Date('2025-10-13'),
      endDate: new Date('2025-10-15'),
    },
    {
      employeeId: 1,
      type: AbsenceType.businessTrip,
      startDate: new Date('2025-10-13'),
      endDate: new Date('2025-10-18'),
    },
    {
      employeeId: 2,
      type: AbsenceType.vacation,
      startDate: new Date('2025-10-14'),
      endDate: new Date('2025-10-18'),
    },
    {
      employeeId: 3,
      type: AbsenceType.sick,
      startDate: new Date('2025-10-17'),
      endDate: new Date('2025-10-19'),
    },
  ], []);

  return absences;
}
