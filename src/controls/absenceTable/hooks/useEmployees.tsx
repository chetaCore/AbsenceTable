import React, { useMemo } from 'react';
import { Employee } from '../types';

export function useEmployees() {
  const rows = useMemo(() => {
    const departments = [
      'Отдел разработки',
      'Отдел продаж',
      'HR',
      'Бухгалтерия',
      'Маркетинг',
    ];

    const names = [
      'Иван Иванов',
      'Петр Петров',
      'Сергей Смирнов',
      'Анна Кузнецова',
      'Мария Волкова',
      'Алексей Федоров',
      'Дарья Попова',
      'Никита Морозов',
      'Ольга Павлова',
      'Кирилл Козлов',
    ];

    const employeeStub = Array.from({ length: 100 }, (_, i) => {
      const name = names[i % names.length];
      const department = departments[i % departments.length];
      const avatarId = (i % 70) + 1; // разные лица до 70

      const employee: Employee = {
        id: i + 1,
        name,
        icon: `https://i.pravatar.cc/150?img=${avatarId}`,
        department: department,
        uri: `https://company.example.com/employees/${i + 1}`,
      };

      return {
        id: i + 1,
        employee,
      };
    });

    return employeeStub;
  }, []);

  return rows;
}
