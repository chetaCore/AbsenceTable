import { useEffect, useState, useCallback } from "react";
import { AbsenceType, Employee, EmployeeAbsence, Period } from "../../api/types/types";
import { AbsenceTableDTO, AbsenceTableResponseDTO } from "../../api/dto";
import { getAbsenceTableData } from "../../api/odata";
import humps from "humps";

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

  const fetchAbsences = useCallback(async () => {
    const { startDate, endDate } = period;
    const employeesIds = employees?.map(e => e.id) ?? [];

    if (!employeesIds.length) {
      onAbsencesChange?.([]);
      return;
    }

    const absenceTableDTO: AbsenceTableDTO = { employeesIds, startPeriod: startDate, endPeriod: endDate };
    onLoadingChange?.(true);

    try {
      const response = await getAbsenceTableData(absenceTableDTO);
      if (!response.success || !response.data || response.data.error) {
        throw new Error(response.error ?? response.data?.error ?? 'Ошибка загрузки отсутствий');
      }

      const result: AbsenceTableResponseDTO[] = humps.camelizeKeys(JSON.parse(response.data.result ?? ""));
      const mapped: EmployeeAbsence[] = result.map(a => ({
        id: a.id,
        employeeId: a.employeeId,
        type: a.type as unknown as AbsenceType,
        startDate: new Date(a.startDate),
        endDate: new Date(a.endDate),
        startWorkHour: 8,
        endWorkHour: 17,
      }));

      onAbsencesChange?.(mapped);
    } catch (error) {
      onError?.("Ошибка загрузки данных");
    } finally {
      onLoadingChange?.(false);
    }
  }, [employees, period, onAbsencesChange, onLoadingChange, onError]);

  useEffect(() => {
    fetchAbsences();
  }, [fetchAbsences]);

  return { refreshAbcences: fetchAbsences };
}
