import { useMemo } from "react";
import { AbsenceType } from "../types";

export interface EmployeeAbsence {
  employeeId: number;
  type: AbsenceType;
  startDate: Date;
  endDate: Date;
  startWorkHour: number;
  endWorkHour: number;
}

export function useEmployeeAbsences(): EmployeeAbsence[] {
  const absences: EmployeeAbsence[] = useMemo(() => [
    // Сотрудник 1 — работает с 8 до 17
    {
      employeeId: 1,
      type: AbsenceType.vacation,
      startDate: new Date("2025-10-14T08:00"),
      endDate: new Date("2025-10-14T17:00"),
      startWorkHour: 8,
      endWorkHour: 17,
    },

    // Сотрудник 2 — работает с 9 до 18
    {
      employeeId: 2,
      type: AbsenceType.remoteWork,
      startDate: new Date("2025-10-15T09:00"),
      endDate: new Date("2025-10-15T18:00"),
      startWorkHour: 9,
      endWorkHour: 18,
    },

    // Сотрудник 3 — работает с 7 до 16
    {
      employeeId: 3,
      type: AbsenceType.sick,
      startDate: new Date("2025-10-14T07:00"),
      endDate: new Date("2025-10-16T16:00"),
      startWorkHour: 7,
      endWorkHour: 16,
    },

    // Сотрудник 4 — работает с 10 до 19
    {
      employeeId: 4,
      type: AbsenceType.businessTrip,
      startDate: new Date("2025-10-16T10:00"),
      endDate: new Date("2025-10-16T19:00"),
      startWorkHour: 10,
      endWorkHour: 19,
    },

    // Сотрудник 5 — работает с 8 до 17, несколько видов отсутствий
    {
      employeeId: 5,
      type: AbsenceType.remoteWork,
      startDate: new Date("2025-10-14T08:00"),
      endDate: new Date("2025-10-16T17:00"),
      startWorkHour: 8,
      endWorkHour: 17,
    },
    {
      employeeId: 5,
      type: AbsenceType.sick,
      startDate: new Date("2025-10-14T08:00"),
      endDate: new Date("2025-10-18T12:00"),
      startWorkHour: 8,
      endWorkHour: 17,
    },
     {
      employeeId: 5,
      type: AbsenceType.vacation,
      startDate: new Date("2025-10-14T13:00"),
      endDate: new Date("2025-10-16T16:00"),
      startWorkHour: 8,
      endWorkHour: 17,
    },
  ], []);

  return absences;
}
