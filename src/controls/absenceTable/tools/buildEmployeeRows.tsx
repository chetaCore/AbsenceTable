import { Employee } from '../types';
import { EmployeeAbsence } from '../hooks/useEmployeeAbsences';
import { getMonday } from './absenceCommon';

export function buildEmployeeRows(
  employees: Employee[],
  selectedDate: Date,
  absences: EmployeeAbsence[]
) {
  const monday = getMonday(selectedDate);

  return employees.map(emp => {
    const row: any = { id: emp.id, name: emp.name };

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(monday);
      currentDate.setDate(monday.getDate() + i);

      const todaysAbsences = absences.filter(a =>
        a.employeeId === emp.id &&
        currentDate >= stripTime(new Date(a.startDate)) &&
        currentDate <= stripTime(new Date(a.endDate))
      );

      row[`day_${i}`] = todaysAbsences.length > 0 ? todaysAbsences.map(a => a.type) : null;
    }

    return row;
  });
}

function stripTime(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}
