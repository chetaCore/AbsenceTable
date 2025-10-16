export interface Employee {
    id: number;
    name: string;
    icon?: string;
    department?: string;
    uri?: string;
}

export interface EmployeeAbsence {
  employeeId: number;
  type: AbsenceType;
  startDate: Date;
  endDate: Date;
  startWorkHour: number;
  endWorkHour: number;
}

export enum AbsenceType {
    vacation,       // Отпуск
    sick,           // Больничный
    businessTrip,   // Командировка
    halfDay,        // Отгул менее 4 часов
    remoteWork,     // Удалённая работа
    businessTripOut // Выезд по работе
}

export interface AsencesInfo
{
    color: string;
    type: AbsenceType;
}