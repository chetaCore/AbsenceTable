import { useEffect, useState } from "react";
import { AbsenceType, Employee, EmployeeAbsence, Period } from "../api/types/types";
import { AbsenceTableDTO, AbsenceTableResponseDTO } from "../api/dto";
import { getAbsenceTableData } from "../api/odata";

interface UseEmployeeAbsencesProps {
  employees: Employee[];
  period: Period;
  onAbsencesChange?: (employees: EmployeeAbsence[]) => void;
  onLoadingChange?: (loading: boolean) => void;
  onError?: (error: string) => void;
}

export function useEmployeeAbsences({
  employees,
  period,
  onAbsencesChange,
  onLoadingChange,
  onError,
}: UseEmployeeAbsencesProps) {

  useEffect(() => {
    let isMounted = true; 
    const { startDate, endDate } = period;

    const employeesIds = employees?.map(e => e.id) ?? [];
    if (!employeesIds.length) {
      onAbsencesChange?.([]);
      return;
    }

    const absenceTableDTO: AbsenceTableDTO = { employeesIds, startPeriod: startDate, endPeriod: endDate };

    const fetchAbsences = async () => {
      onLoadingChange?.(true);

      try {
        const response = await getAbsenceTableData(absenceTableDTO);
        if (!isMounted || !response.data) return;

        const parsedData: AbsenceTableResponseDTO[] =
          typeof response.data === "string" ? JSON.parse(response.data) : response.data;

        const mapped: EmployeeAbsence[] = parsedData.map(a => ({
          employeeId: a.employeeId,
          type: a.type as unknown as AbsenceType,
          startDate: new Date(a.startDate),
          endDate: new Date(a.endDate),
          startWorkHour: 8,
          endWorkHour: 17,
        }));

        onAbsencesChange?.(mapped);
      } catch (error) {
        console.error("Failed to fetch absences:", error);
        onError?.("Ошибка загрузки данных");
      } finally {
        onLoadingChange?.(false);
      }
    };

    fetchAbsences();

    return () => {
      isMounted = false;
    };
  }, [employees, period, onLoadingChange, onError, onAbsencesChange]);
}
