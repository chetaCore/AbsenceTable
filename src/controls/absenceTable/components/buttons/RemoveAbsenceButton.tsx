import React, { useState } from 'react';
import { Button, Paper } from '@mui/material';
import { RemoveAbsenceDialog } from '../dialogs/RemoveAbsenceDialog';
import { Employee, EmployeeAbsence } from '../../api/types/types';
import { RemoveAbsenceDTO } from '../../api/dto';
import { RequestResult } from '../../api/api';
import { useTranslation } from 'react-i18next';

interface RemoveAbsenceButtonProps {
  employees: Employee[];
  absences: EmployeeAbsence[];
  onRemoveAbsence: (data: RemoveAbsenceDTO) => Promise<RequestResult>;
}

export const RemoveAbsenceButton: React.FC<RemoveAbsenceButtonProps> = ({
  employees,
  absences,
  onRemoveAbsence,
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
        color="error"
        onClick={() => setOpen(true)}
        sx={{ height: 36 }}
      >
        {t("components.common.remove")}
      </Button>

      <RemoveAbsenceDialog
        open={open}
        employees={employees}
        absences={absences}
        onClose={() => setOpen(false)}
        onRemove={onRemoveAbsence}
      />
    </Paper>
  );
};
