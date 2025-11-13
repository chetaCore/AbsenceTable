import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Autocomplete,
  Divider,
  Stack,
} from '@mui/material';
import { AbsenceType, Employee, EmployeeAbsence } from '../../api/types/types';
import { getAbsenceTypeName } from '../../tools/absenceCommon';
import dayjs from 'dayjs';

interface MergeAbsenceDialogProps {
  open: boolean;
  absences: EmployeeAbsence[];
  employees: Employee[];
  onClose: () => void;
  onMerge: (sourceId: number, mergedIds: number[], newKind: AbsenceType | null) => Promise<void>;
}

export const MergeAbsenceDialog: React.FC<MergeAbsenceDialogProps> = ({
  open,
  absences,
  employees,
  onClose,
  onMerge,
}) => {
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [sourceId, setSourceId] = useState<number | null>(null);
  const [mergedIds, setMergedIds] = useState<number[]>([]);
  const [type, setType] = useState<AbsenceType | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredAbsences = useMemo(() => {
    if (!employeeId) return [];
    return absences.filter(a => a.employeeId === employeeId);
  }, [employeeId, absences]);

  const handleConfirm = async () => {
    if (!sourceId || mergedIds.length === 0) return;
    setLoading(true);
    await onMerge(sourceId, mergedIds, type);
    setLoading(false);
    onClose();
  };

  const getAbsenceLabel = (a: EmployeeAbsence) =>
    `${getAbsenceTypeName(a.type)} — ${dayjs(a.startDate).format('DD.MM HH:mm')} → ${dayjs(a.endDate).format('DD.MM HH:mm')}`;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Объединить отсутствия</DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Stack spacing={2}>
          <Divider />

          {/* Выбор нового типа отсутствия */}
          <Autocomplete
            options={Object.values(AbsenceType)}
            getOptionLabel={(option) => getAbsenceTypeName(option)}
            value={type ?? null}
            onChange={(_, newValue) => setType(newValue ?? null)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Новый тип (необязательно)"
              />
            )}
            clearOnEscape
            disableClearable={false}
            noOptionsText="Ничего не нашлось"
          />

          {/* Выбор сотрудника */}
          <Autocomplete
            options={employees}
            getOptionLabel={option => option.name}
            value={employees.find(e => e.id === employeeId) || null}
            onChange={(_, newValue) => {
              setEmployeeId(newValue ? newValue.id : null);
              setSourceId(null);
              setMergedIds([]);
            }}
            renderInput={params => (
              <TextField
                {...params}
                label="Сотрудник"
                error={!employeeId}
                helperText={!employeeId ? "Выберите сотрудника" : ''}
              />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            clearOnEscape
            noOptionsText="Ничего не нашлось"
          />

          <Divider />

          {/* Выбор основного отсутствия */}
          {employeeId && (
            <Autocomplete
              options={filteredAbsences}
              getOptionLabel={getAbsenceLabel}
              value={filteredAbsences.find(a => a.id === sourceId) || null}
              onChange={(_, newValue) => {
                setSourceId(newValue ? newValue.id : null);
                setMergedIds(prev => prev.filter(id => id !== newValue?.id));
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Основное отсутствие"
                  error={!sourceId && !!employeeId}
                  helperText={!sourceId && !!employeeId ? 'Выберите основное отсутствие' : ''}
                />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              disabled={!employeeId}
              clearOnEscape
              noOptionsText="Ничего не нашлось"
            />
          )}

          {/* Выбор отсутствий для объединения */}
          {employeeId && (
            <Autocomplete
              multiple
              options={filteredAbsences.filter(a => a.id !== sourceId)}
              getOptionLabel={getAbsenceLabel}
              value={filteredAbsences.filter(a => mergedIds.includes(a.id))}
              onChange={(_, newValues) => setMergedIds(newValues.map(v => v.id))}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Отсутствия для объединения"
                  error={mergedIds.length === 0 && !!employeeId}
                  helperText={
                    mergedIds.length === 0 && !!employeeId
                      ? 'Выберите хотя бы одно отсутствие'
                      : ''
                  }
                />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              disabled={!sourceId}
              clearOnEscape
              noOptionsText="Ничего не нашлось"
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button
          disabled={!sourceId || mergedIds.length === 0 || loading}
          onClick={handleConfirm}
          variant="contained"
          color="primary"
        >
          {loading ? 'Объединение...' : 'Объединить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
