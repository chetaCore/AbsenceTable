import { Employee, EmployeeAbsence } from '../types';

export function buildEmployeeRows(
  employees: Employee[],
  selectedDate: Date,
  absences: EmployeeAbsence[]
) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return employees.map(emp => {
    const row: any = { 
      id: emp.id, 
      employee: emp,
      name: emp.name || '',
      department: emp.department || '',
    };

    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const currentDate = new Date(year, month, dayNum);

      const todaysAbsences = absences.filter(a =>
        a.employeeId === emp.id &&
        currentDate >= stripTime(new Date(a.startDate)) &&
        currentDate <= stripTime(new Date(a.endDate))
      );

      row[`${currentDate.getDate()}`] = todaysAbsences.length > 0 ? todaysAbsences : null;
    }

    return row;
  });
}

function stripTime(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}
