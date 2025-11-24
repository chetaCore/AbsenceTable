import React, { useState, useMemo } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Stack,
  Divider,
  Autocomplete,
  TextField,
  CircularProgress,
} from '@mui/material';
import { Employee, EmployeeAbsence } from '../../api/types/types';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { RequestResult } from '../../api/api';
import { RemoveAbsenceDTO } from '../../api/dto';
import { useTranslation } from 'react-i18next';
import { getAbsenceTypeName } from '../../tools/absenceCommon';

interface RemoveAbsenceDialogProps {
  open: boolean;
  employees: Employee[];
  absences: EmployeeAbsence[];
  onClose: () => void;
  onRemove: (data: RemoveAbsenceDTO) => Promise<RequestResult>;
}

export const RemoveAbsenceDialog: React.FC<RemoveAbsenceDialogProps> = ({
  open,
  employees,
  absences,
  onClose,
  onRemove,
}) => {
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [absenceId, setAbsenceId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const filteredAbsences = useMemo(() => {
    if (!employeeId) return [];
    return absences.filter((a) => a.employeeId === employeeId);
  }, [employeeId, absences]);

  const handleRemove = async () => {
    if (!absenceId) return;
    setLoading(true);
    setError(null);
    try {
      await onRemove({absenceId: absenceId});
      onClose();
    } catch (e: any) {
      setError(e?.message || 'Ошибка при удалении отсутствия');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setEmployeeId(null);
    setAbsenceId(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Удалить отсутствие</DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Stack spacing={2}>
          <Divider />

          <Autocomplete
            options={employees}
            getOptionLabel={(option) => option.name}
            value={employees.find((e) => e.id === employeeId) || null}
            onChange={(_, newValue) => {
              setEmployeeId(newValue ? newValue.id : null);
              setAbsenceId(null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Сотрудник"
                error={!employeeId}
                helperText={!employeeId ? 'Выберите сотрудника' : ''}
              />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            clearOnEscape
            noOptionsText="Ничего не нашлось"
          />

          <Autocomplete
            options={filteredAbsences}
            getOptionLabel={(option) =>
              `${getAbsenceTypeName(option.type, t)} — ${dayjs(option.startDate).format('DD.MM HH:mm')} → ${dayjs(option.endDate).format('DD.MM HH:mm')}`
            }
            value={filteredAbsences.find((a) => a.id === absenceId) || null}
            onChange={(_, newValue) => setAbsenceId(newValue ? newValue.id : null)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Отсутствие"
                error={!absenceId && !!employeeId}
                helperText={!absenceId && !!employeeId ? 'Выберите отсутствие' : ''}
              />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            disabled={!employeeId}
            clearOnEscape
            noOptionsText="Ничего не нашлось"
          />

          {error && (
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ pr: 3, pb: 2 }}>
        <Button variant="outlined" onClick={handleClose} disabled={loading}>
          Отмена
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleRemove}
          disabled={!absenceId || loading}
          startIcon={loading ? <CircularProgress size={18} /> : null}
        >
          {loading ? 'Удаление...' : 'Удалить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
