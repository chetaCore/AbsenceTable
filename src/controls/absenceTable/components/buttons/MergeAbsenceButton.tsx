import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Employee, EmployeeAbsence } from '../../api/types/types';
import { mergeAbsences } from '../../api/odata';
import { MergeAbsenceDialog } from '../dialogs/MergeAbsenceDialog';

interface MergeAbsenceButtonProps {
  employees: Employee[];
  absences: EmployeeAbsence[];
  onRefresh: () => Promise<void>;
}

export const MergeAbsenceButton: React.FC<MergeAbsenceButtonProps> = ({
  employees,
  absences,
  onRefresh,
}) => {
  const [open, setOpen] = useState(false);

  const handleMerge = async (sourceId: number, mergedIds: number[], newKind: string | null) => {
    const response = await mergeAbsences({ sourceId, mergedIds, newKind });

    if (!response.success) {
      throw new Error('Ошибка при объединении отсутствий');
    }

    await onRefresh();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Объединить отсутствия
      </Button>

      <MergeAbsenceDialog
        open={open}
        absences={absences}
        employees={employees}
        onClose={() => setOpen(false)}
        onMerge={handleMerge}
      />
    </>
  );
};
