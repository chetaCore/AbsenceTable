import React, { useState } from 'react';
import { Button } from '@mui/material';
import { CreateAbsenceDialog } from '../dialogs/CreateAbsenceDialog';
import { Employee } from '../../api/types/types';
import { CreateAbsenceDTO } from '../../api/dto';
import { createAbsence } from '../../api/odata';

interface CreateAbsenceButtonProps {
  employees: Employee[];
  onRefresh: () => Promise<void>;
}

export const CreateAbsenceButton: React.FC<CreateAbsenceButtonProps> = ({ employees, onRefresh }) => {
  const [open, setOpen] = useState(false);

  const handleCreate = async (data: CreateAbsenceDTO) => {
    const response = await createAbsence(data);

    if (!response.success) {
      throw new Error('Ошибка при создании отсутствия');
    }

    await onRefresh();
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={() => setOpen(true)}>
        Создать отсутствие
      </Button>

      <CreateAbsenceDialog
        open={open}
        employees={employees}
        onClose={() => setOpen(false)}
        onCreate={handleCreate}
      />
    </>
  );
};
