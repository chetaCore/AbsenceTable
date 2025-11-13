import { useEffect, useMemo, useState, useCallback } from 'react';
import { Employee } from '../../api/types/types';
import { getEmployees } from '../../api/odata';

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
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);

  const loadEmployees = useCallback(async () => {
    let cancelled = false;

    try {
      onLoadingChange?.(true);

      const result = await getEmployees();
      if (!result.success || !result.data) {
        throw new Error(result.error ?? 'Ошибка загрузки сотрудников');
      }

      if (!cancelled) {
        setAllEmployees(result.data);
      }
    } catch (error: any) {
      if (!cancelled) {
        onError?.(error.message || 'Неизвестная ошибка');
      }
    } finally {
      if (!cancelled) {
        onLoadingChange?.(false);
      }
    }

    return () => {
      cancelled = true;
    };
  }, [onLoadingChange, onError]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const employees = useMemo(() => {
    const filtered =
      filter.length > 0
        ? allEmployees.filter((e) => filter.includes(e.id))
        : allEmployees;

    onEmployeesChange?.(filtered);
    return filtered;
  }, [filter, allEmployees, onEmployeesChange]);

  return { employees, allEmployees, refreshEmployees: loadEmployees };
}
