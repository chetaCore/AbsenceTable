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
  CircularProgress,
  Autocomplete,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import dayjs, { Dayjs } from 'dayjs';
import { AbsenceType, Employee, EmployeeAbsence } from '../../api/types/types';
import { RemoveAbsenceDTO, EditAbsenceDTO } from '../../api/dto';
import { getAbsenceTypeName } from '../../tools/absenceCommon';
import { useTranslation } from 'react-i18next';
import { RequestResult } from '../../api/api';

interface EditAbsenceDialogProps {
  open: boolean;
  employeeName: string;
  absence: EmployeeAbsence;
  onClose: () => void;
  onUpdate: (updatedAbsence: EditAbsenceDTO) => Promise<RequestResult>;
  onRemove: (data: RemoveAbsenceDTO) => Promise<RequestResult>;
}

export const EditAbsenceDialog: React.FC<EditAbsenceDialogProps> = ({
  open,
  employeeName,
  absence,
  onClose,
  onUpdate,
  onRemove,
}) => {
  const [type, setType] = useState<AbsenceType>(absence.type);
  const [employeeId, setEmployeeId] = useState<number>(absence.employeeId);
  const [start, setStart] = useState<Dayjs | null>(dayjs(absence.startDate));
  const [end, setEnd] = useState<Dayjs | null>(dayjs(absence.endDate));
  const [applicationDate, setApplicationDate] = useState<Dayjs | null>(
    dayjs(absence.applicationDate)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

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

  const handleUpdate = async () => {
    if (!isValid) return;

    setLoading(true);
    setError(null);

    const dto: EditAbsenceDTO = {
      absenceId: absence.id,
      type,
      employeeId,
      start: start!.toDate(),
      end: end!.toDate(),
      applicationDate: applicationDate!.toDate(),
      hours: hoursDiff,
    };

    try {
      await onUpdate(dto);
      onClose();
    } catch (e: any) {
      setError(e?.message || t("errors.updateAbsenceError"));
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    setError(null);
    try {
      await onRemove({ absenceId: absence.id });
      onClose();
    } catch (e: any) {
      setError(e?.message || t("errors.removeAbsenceError"));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setLoading(false);
    setError(null);
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{t("components.editAbsenceDialog.title")}</DialogTitle>

        <DialogContent sx={{ px: 3, py: 2 }}>
          <Stack spacing={2}>
            <Divider />

            {/* Отображение выбранного отсутствия */}
            <Typography variant="body2">
              <b>{t("components.editAbsenceDialog.selectedAbsence")}:</b> {getAbsenceTypeName(absence.type, t)}<br />
              <b>{t("components.common.employee")}:</b> {employeeName}<br />
              <b>{t("components.editAbsenceDialog.dates")}:</b> с {dayjs(absence.startDate).format('DD.MM.YYYY HH:mm')} по {dayjs(absence.endDate).format('DD.MM.YYYY HH:mm')}
            </Typography>

            <Divider />

            {/* Тип отсутствия */}
            <Autocomplete
              options={Object.values(AbsenceType)}
              getOptionLabel={(option) => getAbsenceTypeName(option, t)}
              value={type}
              onChange={(_, newValue) => setType(newValue!)}
              renderInput={(params) => <TextField {...params} label="Тип" variant="outlined" />}
              clearOnEscape
              disableClearable={false}
              noOptionsText={t("components.autocomplete.noOptionsText")}
            />

            <Divider />

            {/* Дата заявления */}
            <DatePicker
              label={t("components.editAbsenceDialog.recordDate")}
              value={applicationDate}
              onChange={(newValue) => setApplicationDate(newValue as Dayjs | null)}
              slotProps={{ actionBar: { actions: [] } }}
              sx={{ width: '100%' }}
            />

            <Divider />

            {/* Даты начала и окончания */}
            <Stack direction="row" spacing={2}>
              <DateTimePicker
                label={t("components.editAbsenceDialog.absenceFrom")}
                ampm={false}
                value={start}
                onChange={(newValue) => setStart(newValue as Dayjs | null)}
                minTime={dayjs().hour(8).minute(0)}
                maxTime={dayjs().hour(18).minute(0)}
                minutesStep={30}
                slotProps={{ actionBar: { actions: [] } }}
                sx={{ width: '100%' }}
              />

              <DateTimePicker
                label={t("components.editAbsenceDialog.absenceTo")}
                ampm={false}
                value={end}
                onChange={(newValue) => setEnd(newValue as Dayjs | null)}
                minTime={dayjs().hour(8).minute(0)}
                maxTime={dayjs().hour(18).minute(0)}
                minutesStep={30}
                slotProps={{ actionBar: { actions: [] } }}
                sx={{ width: '100%' }}
              />
            </Stack>

            {start && end && start.isAfter(end) && (
              <Typography variant="caption" color="error">
                {t("errors.startDateAfterEndDate")}
              </Typography>
            )}

            <Divider />

            <Typography variant="caption">
              {t("components.common.numberOfHours")} {hoursDiff.toFixed(2)}
            </Typography>

            {error && (
              <Typography variant="caption" color="error">
                {error}
              </Typography>
            )}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button variant="outlined" color="error" onClick={handleClose} disabled={loading}>
            {t("components.common.cancellation")}
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleRemove}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} /> : null}
          >
            {loading ? t("components.common.removing") : t("components.common.remove")}
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={!isValid || loading}
            startIcon={loading ? <CircularProgress size={18} /> : null}
          >
            {loading ? t("components.common.saving") : t("components.common.change")}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};
