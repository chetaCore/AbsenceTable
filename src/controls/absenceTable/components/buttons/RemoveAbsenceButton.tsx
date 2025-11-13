import React, { useState } from 'react';
import { Button } from '@mui/material';
import { RemoveAbsenceDialog } from '../dialogs/RemoveAbsenceDialog';
import { Employee, EmployeeAbsence } from '../../api/types/types';
import { removeAbsence } from '../../api/odata';

interface RemoveAbsenceButtonProps {
  employees: Employee[];
  absences: EmployeeAbsence[];
  onRefresh: () => Promise<void>;
}

export const RemoveAbsenceButton: React.FC<RemoveAbsenceButtonProps> = ({
  employees,
  absences,
  onRefresh,
}) => {
  const [open, setOpen] = useState(false);

  const handleRemove = async (absenceId: number) => {
    const response = await removeAbsence({ absenceId });

    if (!response.success) {
      throw new Error('Ошибка при удалении отсутствия');
    }

    await onRefresh();
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={() => setOpen(true)}>
        Удалить отсутствие
      </Button>

      <RemoveAbsenceDialog
        open={open}
        employees={employees}
        absences={absences}
        onClose={() => setOpen(false)}
        onRemove={handleRemove}
      />
    </>
  );
};
