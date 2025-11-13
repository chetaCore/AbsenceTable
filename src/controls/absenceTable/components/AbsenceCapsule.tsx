import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { AbsenceType, EmployeeAbsence } from '../api/types/types';
import { getAbsenceTypeName, getColor, getIcon } from '../tools/absenceCommon';

interface AbsenceCapsuleProps {
  absences: EmployeeAbsence[];
  isToday: boolean;
  isShowIcons: boolean;
}

export const AbsenceCapsule: React.FC<AbsenceCapsuleProps> = ({
  absences,
  isToday,
  isShowIcons,
}) => {
  if (!absences || absences.length === 0) return null;

  const startInterval = Math.min(...absences.map(a => a.startWorkHour));
  const endInterval = Math.max(...absences.map(a => a.endWorkHour));
  const totalHours = endInterval - startInterval;

  // Проверка пересечения
  const overlaps = (a: EmployeeAbsence, b: EmployeeAbsence) =>
    a.startDate < b.endDate && b.startDate < a.endDate;

  // Распределение по "уровням"
  const sorted = [...absences].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  const layers: EmployeeAbsence[][] = [];

  sorted.forEach(abs => {
    let placed = false;
    for (const layer of layers) {
      if (!layer.some(l => overlaps(l, abs))) {
        layer.push(abs);
        placed = true;
        break;
      }
    }
    if (!placed) layers.push([abs]);
  });

  const heightPercent = 100 / layers.length;

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Подсветка текущего дня */}
      {isToday && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(0, 123, 255, 0.08)',
            borderRadius: 1,
            zIndex: 0,
          }}
        />
      )}

      {layers.map((layer, layerIndex) =>
        layer.map((absence, i) => {
          const { type, startDate, endDate } = absence;
          const startHour = startDate.getHours() + startDate.getMinutes() / 60;
          const endHour = endDate.getHours() + endDate.getMinutes() / 60;

          const leftPercent =
            ((Math.max(startHour, startInterval) - startInterval) / totalHours) * 100;
          const widthPercent =
            ((Math.min(endHour, endInterval) - Math.max(startHour, startInterval)) /
              totalHours) *
            100;
          if (widthPercent <= 0) return null;

          const IconComponent = getIcon(type);

          const tooltipTitle = (
            <Box sx={{ p: 1 }}>
              <Typography variant="body2" component="div">
                <b>{getAbsenceTypeName(type as AbsenceType)}</b>
              </Typography>
              <Typography variant="body2" component="div">
                {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} —{' '}
                {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Box>
          );

          return (
            <Tooltip key={`${i}-${layerIndex}`} title={tooltipTitle} arrow>
              <Box
                sx={{
                  position: 'absolute',
                  left: `${leftPercent}%`,
                  width: `${widthPercent}%`,
                  bottom: `${heightPercent * layerIndex}%`,
                  height: `${heightPercent}%`,
                  bgcolor: getColor(type),
                  opacity: 0.85,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 12,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  zIndex: 1,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    opacity: 1,
                    transform: 'scaleY(1.05)',
                    boxShadow: '0 0 4px rgba(0,0,0,0.3)',
                  },
                }}
              >
                {isShowIcons && IconComponent ? (
                  <IconComponent fontSize="small" />
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
                    {getAbsenceTypeName(type)}
                  </Typography>
                )}
              </Box>
            </Tooltip>
          );
        })
      )}

      {/* Шкала времени */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          display: 'flex',
          zIndex: 2,
        }}
      >
        {Array.from({ length: endInterval - startInterval + 1 }, (_, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              borderLeft: i === 0 ? 'none' : '1px solid #ccc',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
