import { useEffect, useCallback, useState } from "react";
import { AbsenceType, Employee, EmployeeAbsence, Period } from "../../api/types/types";
import { AbsenceTableDTO, AbsenceTableResponseDTO, AbsenceDTO } from "../../api/dto";
import { getAbsenceTableData } from "../../api/odata";
import humps from "humps";
import { useTranslation } from "react-i18next";

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
  const [canUseToolbar, setCanUseToolbar] = useState(false);
  const { t } = useTranslation();

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
        throw new Error(response.error ?? response.data?.error ?? t("errors.absenceLoadError"));
      }

      const result: AbsenceTableResponseDTO = humps.camelizeKeys(JSON.parse(response.data.result ?? "")) as AbsenceTableResponseDTO;

      const mapped: EmployeeAbsence[] = (result.absences ?? []).map((a: AbsenceDTO) => ({
        id: a.id,
        employeeId: a.employeeId,
        type: a.type as unknown as AbsenceType,
        startDate: new Date(a.startDate),
        endDate: new Date(a.endDate),
        applicationDate: a.applicationDate,
        hours: a.hours,
        startWorkHour: a.startWorkHour,
        endWorkHour: a.endWorkHour,
        tooltipData: a.tooltipData
      }));

      onAbsencesChange?.(mapped);

      setCanUseToolbar(result.canUseToolbar);

    } catch (error) {
      onError?.((error as Error).message);
    } finally {
      onLoadingChange?.(false);
    }
  }, [employees, period, onAbsencesChange, onLoadingChange, onError]);

  useEffect(() => {
    fetchAbsences();
  }, [fetchAbsences]);

  return { refreshAbcences: fetchAbsences, canUseToolbar };
}
