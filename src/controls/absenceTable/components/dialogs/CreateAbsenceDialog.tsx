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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  CircularProgress,
  Autocomplete,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import dayjs, { Dayjs } from 'dayjs';
import { AbsenceType, Employee } from '../../api/types/types';
import { getAbsenceTypeName } from '../../tools/absenceCommon';
import { CreateAbsenceDTO } from '../../api/dto';

interface CreateAbsenceDialogProps {
  open: boolean;
  employees: Employee[];
  onClose: () => void;
  onCreate: (data: CreateAbsenceDTO) => Promise<void>;
}

export const CreateAbsenceDialog: React.FC<CreateAbsenceDialogProps> = ({
  open,
  employees,
  onClose,
  onCreate,
}) => {
  const [type, setType] = useState<AbsenceType>(AbsenceType.Vacation);
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [start, setStart] = useState<Dayjs | null>(dayjs().hour(9).minute(0));
  const [end, setEnd] = useState<Dayjs | null>(dayjs().hour(17).minute(0));
  const [applicationDate, setApplicationDate] = useState<Dayjs | null>(dayjs());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hoursDiff = start && end ? end.diff(start, 'minute') / 60 : 0;

  const isValid = useMemo(() => {
    return (
      employeeId !== null &&
      start !== null &&
      end !== null &&
      applicationDate !== null &&
      start.isBefore(end)
    );
  }, [employeeId, start, end, applicationDate]);

  const handleCreate = async () => {
    if (!isValid) return;

    setLoading(true);
    setError(null);
    try {
      await onCreate({
        type,
        employeeId: employeeId!,
        start: start!.toDate(),
        end: end!.toDate(),
        applicationDate: applicationDate!.toDate(),
        hours: hoursDiff,
      });
      onClose();
    } catch (e: any) {
      setError(e?.message || 'Произошла ошибка при создании отсутствия');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setLoading(false);
    setError(null);
    onClose();
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Создать отсутствие</DialogTitle>

        <DialogContent sx={{ px: 3, py: 2 }}>
          <Stack spacing={2}>
            <Divider />

            {/* Тип отсутствия */}
            <Autocomplete
              options={Object.values(AbsenceType)}
              getOptionLabel={(option) => getAbsenceTypeName(option)}
              value={type}
              onChange={(_, newValue) => setType(newValue!)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Тип"
                  variant="outlined"
                />
              )}
              clearOnEscape
              disableClearable={false}
              noOptionsText="Ничего не нашлось"
            />

            <Autocomplete
              options={employees}
              getOptionLabel={(option) => option.name}
              value={employees.find((e) => e.id === employeeId) || null}
              onChange={(_, newValue) => setEmployeeId(newValue ? newValue.id : null)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Сотрудник"
                  error={!employeeId}
                  helperText={!employeeId ? "Выберите сотрудника" : ''}
                />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              clearOnEscape
              filterOptions={(options, state) => {
                return options.filter((option) =>
                  option.name.toLowerCase().includes(state.inputValue.toLowerCase())
                );
              }}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  {option.name}
                </li>
              )}
              noOptionsText="Ничего не нашлось"
            />

            <Divider />

            {/* Дата заявления */}
            <Stack spacing={1}>
              <DatePicker
                label="Дата заявления"
                value={applicationDate}
                onChange={(newValue) => setApplicationDate(newValue as Dayjs | null)}
                slotProps={{ actionBar: { actions: [] } }}
              />
            </Stack>

            <Divider />

            {/* Даты начала и окончания */}
            <Stack direction="row" spacing={2}>
              <DateTimePicker
                label="Отсутствие с"
                ampm={false}
                value={start}
                onChange={(newValue) => setStart(newValue as Dayjs | null)}
                minTime={dayjs().hour(8).minute(0)}
                maxTime={dayjs().hour(18).minute(0)}
                slotProps={{ actionBar: { actions: [] } }}
                sx={{ width: "100%" }}
              />

              <DateTimePicker
                label="Отсутствие по"
                ampm={false}
                value={end}
                onChange={(newValue) => setEnd(newValue as Dayjs | null)}
                minTime={dayjs().hour(8).minute(0)}
                maxTime={dayjs().hour(18).minute(0)}
                slotProps={{ actionBar: { actions: [] } }}
                sx={{ width: "100%" }}
              />
            </Stack>

            {start && end && start.isAfter(end) && (
              <Typography variant="caption" color="error">
                Дата начала не может быть больше даты окончания
              </Typography>
            )}

            <Divider />

            <Stack direction="row" spacing={2}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Количество часов: {hoursDiff.toFixed(2)}
              </Typography>

              {error && (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
            </Stack>
          </Stack>


        </DialogContent>

        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button variant="outlined" color="error" onClick={handleClose} disabled={loading}>
            Отмена
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleCreate}
            disabled={!isValid || loading}
            startIcon={loading ? <CircularProgress size={18} /> : null}
          >
            {loading ? 'Сохранение...' : 'Создать'}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};
