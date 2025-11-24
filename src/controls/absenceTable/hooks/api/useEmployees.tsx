import { useEffect, useMemo, useState, useCallback } from 'react';
import { Employee } from '../../api/types/types';
import { getEmployees } from '../../api/odata';
import { useTranslation } from 'react-i18next';
import { EmployeeDTO } from '../../api/dto';
import humps from "humps";

interface UseEmployeesProps {
  filter?: number[];
  onEmployeesChange?: (employees: Employee[]) => void;
  onLoadingChange?: (loading: boolean) => void;
  onError?: (error: string) => void;
}

export function useEmployees({
  filter = [],
  onLoadingChange,
  onError,
  onEmployeesChange,
}: UseEmployeesProps = {}) {

  const { t } = useTranslation();
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);

  const loadEmployees = useCallback(async () => {
    let cancelled = false;

    try {
      onLoadingChange?.(true);

      const response = await getEmployees();

      if (!response.success || !response.data || response.data.error) {
        throw new Error(response.error ?? response.data?.error ?? t('errors.employeeLoadError'));
      }

      const parsed = JSON.parse(response.data.result ?? "[]");

      const dtos = humps.camelizeKeys(parsed) as EmployeeDTO[];

      const mapped: Employee[] = dtos.map((e) => ({
        id: e.id,
        name: e.name,
        personalPhoto: e.personalPhoto,
        department: e.department,
        uri: e.uri
      }));

      if (!cancelled) {
        setAllEmployees(mapped);
      }

    } catch (error: any) {
      if (!cancelled) {
        onError?.(error.message || t('errors.unexpectedError'));
      }
    } finally {
      if (!cancelled) {
        onLoadingChange?.(false);
      }
    }

    return () => {
      cancelled = true;
    };
  }, [onLoadingChange, onError, t]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const employees = useMemo(() => {
    const filtered = filter.length > 0
      ? allEmployees.filter((e) => filter.includes(e.id))
      : allEmployees;

    onEmployeesChange?.(filtered);
    return filtered;
  }, [filter, allEmployees, onEmployeesChange]);

  return { employees, allEmployees, refreshEmployees: loadEmployees };
}
