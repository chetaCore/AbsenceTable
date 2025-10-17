import { Employee, EmployeeAbsence } from '../types';

export function buildEmployeeRows(
  employees: Employee[],
  period: { startDate: Date; endDate: Date },
  absences: EmployeeAbsence[]
) {
  const { startDate, endDate } = period;

  // Генерируем все даты в периоде
  const dates: Date[] = [];
  let current = new Date(startDate);
  while (current <= endDate) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return employees.map(emp => {
    const row: any = { 
      id: emp.id, 
      employee: emp,
      name: emp.name || '',
      department: emp.department || '',
    };

    for (const date of dates) {
      const todaysAbsences = absences.filter(a =>
        a.employeeId === emp.id &&
        stripTime(date) >= stripTime(new Date(a.startDate)) &&
        stripTime(date) <= stripTime(new Date(a.endDate))
      );

      row[`${date.getDate()}`] = todaysAbsences.length > 0 ? todaysAbsences : null;
    }

    return row;
  });
}

function stripTime(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}
