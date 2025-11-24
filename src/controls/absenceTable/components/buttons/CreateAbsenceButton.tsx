import React, { useState, useTransition } from 'react';
import { Button, colors, Paper } from '@mui/material';
import { CreateAbsenceDialog } from '../dialogs/CreateAbsenceDialog';
import { Employee } from '../../api/types/types';
import { CreateAbsenceDTO } from '../../api/dto';
import { RequestResult } from '../../api/api';
import { useTranslation } from 'react-i18next';

interface CreateAbsenceButtonProps {
  employees: Employee[];
  onCreateAbsence: (data: CreateAbsenceDTO) => Promise<RequestResult>;
}

export const CreateAbsenceButton: React.FC<CreateAbsenceButtonProps> = ({
  employees,
  onCreateAbsence
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
      }}>
      <Button
        fullWidth
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ height: 36 }}
      >
        {t("components.common.create")}
      </Button>

      <CreateAbsenceDialog
        open={open}
        employees={employees}
        onClose={() => setOpen(false)}
        onCreate={onCreateAbsence}
      />
    </Paper>
  );
};
