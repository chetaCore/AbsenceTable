import React, { useState } from 'react';
import { Box, Paper, Tooltip, Typography } from '@mui/material';
import { AbsenceType, EmployeeAbsence } from '../api/types/types';
import { getAbsenceTypeName, getColor, getIcon } from '../tools/absenceCommon';
import { EditAbsenceDialog } from './dialogs/EditAbsenceDialog';
import { RequestResult } from '../api/api';
import { RemoveAbsenceDTO, EditAbsenceDTO } from '../api/dto';
import { useTranslation } from 'react-i18next';

interface AbsenceCapsuleProps {
  theme: 'dark' | 'light';
  capsuleDate: Date;
  employeeName: string;
  absences: EmployeeAbsence[];
  isShowIcons: boolean;
  onEditAbsence?: (absence: EditAbsenceDTO) => Promise<RequestResult>;
  onRemoveAbsence?: (data: RemoveAbsenceDTO) => Promise<RequestResult>;
}

export const AbsenceCapsule: React.FC<AbsenceCapsuleProps> = ({
  theme,
  capsuleDate,
  employeeName,
  absences,
  isShowIcons,
  onEditAbsence,
  onRemoveAbsence,
}) => {
  const [selectedAbsence, setSelectedAbsence] = useState<EmployeeAbsence | null>(null);
  const { t } = useTranslation();

  if (!absences || absences.length === 0) return null;

  const dayStart = new Date(capsuleDate);
  dayStart.setHours(0, 0, 0, 0);

  const dayEnd = new Date(capsuleDate);
  dayEnd.setHours(23, 59, 59, 999);

  const absenceForDay = absences.find(
    a => a.startDate <= dayEnd && a.endDate >= dayStart
  );

  if (!absenceForDay) return null;

  const workStart = absenceForDay.startWorkHour;
  const workEnd = absenceForDay.endWorkHour;
  const totalHours = workEnd - workStart;

  // --- Глобальные слои ---
  const overlaps = (a: EmployeeAbsence, b: EmployeeAbsence) =>
    a.startDate < b.endDate && b.startDate < a.endDate;

  const sorted = [...absences].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  const globalLayers: EmployeeAbsence[][] = [];

  sorted.forEach(abs => {
    let placed = false;
    for (const layer of globalLayers) {
      if (!layer.some(l => overlaps(l, abs))) {
        layer.push(abs);
        (abs as any).layerIndex = globalLayers.indexOf(layer);
        placed = true;
        break;
      }
    }
    if (!placed) {
      globalLayers.push([abs]);
      (abs as any).layerIndex = globalLayers.length - 1;
    }
  });

  const maxLayers = globalLayers.length;
  const heightPercent = 100 / maxLayers;

  const handleAbsenceClick = (absence: EmployeeAbsence) => {
    setSelectedAbsence(absence);
  };

  const renderAbsenceBox = (absence: EmployeeAbsence, i: number) => {
    const { type, startDate, endDate } = absence;

    const startDay = new Date(startDate);
    startDay.setHours(0, 0, 0, 0);

    const endDay = new Date(endDate);
    endDay.setHours(0, 0, 0, 0);

    const capsuleDayCopy = new Date(capsuleDate);
    capsuleDayCopy.setHours(0, 0, 0, 0);

    if (capsuleDayCopy < startDay || capsuleDayCopy > endDay) return null;

    const startsBeforeToday = capsuleDayCopy > startDay;
    const endsAfterToday = capsuleDayCopy < endDay;

    let effectiveStartHour = workStart;
    let effectiveEndHour = workEnd;

    if (!startsBeforeToday) {
      effectiveStartHour = startDate.getHours() + startDate.getMinutes() / 60;
    }
    if (!endsAfterToday) {
      effectiveEndHour = endDate.getHours() + endDate.getMinutes() / 60;
    }

    const leftPercent = ((Math.max(effectiveStartHour, workStart) - workStart) / totalHours) * 100;
    const widthPercent = ((Math.min(effectiveEndHour, workEnd) - Math.max(effectiveStartHour, workStart)) / totalHours) * 100;

    if (widthPercent <= 0) return null;

    const IconComponent = getIcon(type);

    const tooltipTitle = (
      <Box sx={{ p: 1 }}>
        <Typography variant="body2" component="div">
          <b>{getAbsenceTypeName(type as AbsenceType, t)}</b>
        </Typography>
        <Typography variant="body2" component="div">
          {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} —{' '}
          {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
        <Typography variant="body2" component="div">
          {absence.tooltipData}
        </Typography>
      </Box>
    );

    const layerIndex = (absence as any).layerIndex;

    return (
      <Tooltip key={`${i}-${layerIndex}`} title={tooltipTitle} arrow>
        <Paper
          elevation={3}
          onClick={() => handleAbsenceClick(absence)}
          sx={{
            position: 'absolute',
            left: `${leftPercent}%`,
            width: `${widthPercent}%`,
            bottom: `${heightPercent * layerIndex}%`,
            height: `${heightPercent}%`,
            bgcolor: getColor(type, theme),
            opacity: 0.85,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 12,
            overflow: 'hidden',
            cursor: 'pointer',
            zIndex: 1,
            transition: 'all 0.2s ease',
            borderTopLeftRadius: startsBeforeToday ? 0 : 8,
            borderBottomLeftRadius: startsBeforeToday ? 0 : 8,
            borderTopRightRadius: endsAfterToday ? 0 : 8,
            borderBottomRightRadius: endsAfterToday ? 0 : 8,
            '&:hover': {
              opacity: 1,
              transform: 'scaleY(1.05)',
              boxShadow: '0 0 4px rgba(0,0,0,0.3)',
            },
          }}
        >
          {isShowIcons && IconComponent ? (
            <IconComponent fontSize="small" sx={{ color: '#000000AA' }} />
          ) : (
            <Typography
              sx={{
                fontSize: '0.65rem',
                textAlign: 'center',
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {getAbsenceTypeName(type, t)}
            </Typography>
          )}
        </Paper>
      </Tooltip>
    );
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {sorted.map((absence, i) => renderAbsenceBox(absence, i))}

      {/* Нижняя шкала рабочего дня */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          display: 'flex',
          zIndex: 1,
        }}
      >
        {Array.from({ length: workEnd - workStart + 1 }, (_, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              borderLeft: i === 0 ? 'none' : '1px solid #ccc',
            }}
          />
        ))}
      </Box>

      {selectedAbsence && onEditAbsence && onRemoveAbsence && (
        <EditAbsenceDialog
          open={selectedAbsence != null}
          employeeName={employeeName}
          absence={selectedAbsence}
          onUpdate={onEditAbsence}
          onRemove={onRemoveAbsence}
          onClose={() => setSelectedAbsence(null)}
        />
      )}
    </Box>
  );
};
