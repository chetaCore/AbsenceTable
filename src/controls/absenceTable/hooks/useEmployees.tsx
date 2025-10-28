import { useEffect } from 'react';
import { Employee } from '../api/types/types';
import { getEmployees } from '../api/odata';

interface UseEmployeesProps {
  filter?: string;
  onEmployeesChange?: (employees: Employee[]) => void;
  onLoadingChange?: (loading: boolean) => void;
  onError?: (error: string) => void;
}

export function useEmployees({
  filter = '',
  onLoadingChange,
  onError,
  onEmployeesChange,
}: UseEmployeesProps = {}) {
  useEffect(() => {
    let cancelled = false;

    const loadEmployees = async () => {
      try {
        onLoadingChange?.(true);

        const result = await getEmployees();
        if (!result.success || !result.data) {
          throw new Error(result.error ?? 'Ошибка загрузки сотрудников');
        }

        const employees = result.data;

        const lower = filter.trim().toLowerCase();
        const filtered = !lower
          ? employees
          : employees.filter(
              (e) =>
                e.name.toLowerCase().includes(lower) ||
                e.department?.name.toLowerCase().includes(lower)
            );

        if (!cancelled) {
          onEmployeesChange?.(filtered);
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
    };

    loadEmployees();

    return () => {
      cancelled = true;
    };
  }, [filter, onLoadingChange, onError, onEmployeesChange]);
}
