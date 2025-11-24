import { Employee, EmployeeAbsence } from '../api/types/types';
import { getFieldKeyByDate, stripTime } from './absenceCommon';

export function buildEmployeeRows(
  employees: Employee[],
  period: { startDate: Date; endDate: Date },
  absences: EmployeeAbsence[],
  isShowEmptyEmployees: boolean 
) {
  const { startDate, endDate } = period;

  const dates: Date[] = [];
  let current = new Date(startDate);
  while (current <= endDate) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return employees
    .map(emp => {
      const row: any = { 
        id: emp.id, 
        employee: emp,
        name: emp.name || '',
        department: emp.department || '',
      };

      let hasAnyAbsence = false;

      for (const date of dates) {
        const todaysAbsences = absences.filter(a =>
          a.employeeId === emp.id
        );

        if (todaysAbsences.length > 0) hasAnyAbsence = true;

        row[`${getFieldKeyByDate(date)}`] = todaysAbsences.length > 0 ? todaysAbsences : null;
      }

      if (!isShowEmptyEmployees && !hasAnyAbsence) return null;

      return row;
    })
    .filter(Boolean);
}