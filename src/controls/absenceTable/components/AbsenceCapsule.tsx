import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { AbsenceType, EmployeeAbsence } from '../types';
import { getAbsenceTypeName, getColor, getIcon } from '../tools/absenceCommon';

interface AbsenceCapsuleProps {
  absences: EmployeeAbsence[];
  isToday: boolean;
}

export const AbsenceCapsule: React.FC<AbsenceCapsuleProps> = ({ absences, isToday }) => {
  if (!absences || absences.length === 0) return null;

  // Определяем рабочие часы сотрудника
  const startInterval = Math.min(...absences.map(a => a.startWorkHour));
  const endInterval = Math.max(...absences.map(a => a.endWorkHour));
  const totalHours = endInterval - startInterval;

  // Группировка по дате
  const groupedByDate: Record<string, EmployeeAbsence[]> = {};
  absences.forEach(a => {
    const dayKey = a.startDate.toDateString();
    if (!groupedByDate[dayKey]) groupedByDate[dayKey] = [];
    groupedByDate[dayKey].push(a);
  });

  // Определяем пересечения
  const overlapsByDay: Record<string, EmployeeAbsence[][]> = {};
  for (const [day, list] of Object.entries(groupedByDate)) {
    const sorted = [...list].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    const layers: EmployeeAbsence[][] = [];

    sorted.forEach(abs => {
      let placed = false;
      for (const layer of layers) {
        const lastInLayer = layer[layer.length - 1];
        if (abs.startDate >= lastInLayer.endDate) {
          layer.push(abs);
          placed = true;
          break;
        }
      }
      if (!placed) layers.push([abs]);
    });

    overlapsByDay[day] = layers;
  }

  const maxOverlaps = Math.max(...Object.values(overlapsByDay).map(layers => layers.length));

  return (

    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Фон для пустых областей */}
      {(isToday && <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 6, 
          bgcolor: 'rgba(0,0,0,0.05)',
          borderRadius: 1,
          zIndex: 0,
        }}
      />)}

      {/* Отсутствия */}
      {Object.entries(overlapsByDay).map(([dayKey, layers]) =>
        layers.map((layer, layerIndex) =>
          layer.map((absence, i) => {
            const { type, startDate, endDate } = absence;
            const startHour = startDate.getHours() + startDate.getMinutes() / 60;
            const endHour = endDate.getHours() + endDate.getMinutes() / 60;

            const leftPercent =
              ((Math.max(startHour, startInterval) - startInterval) / totalHours) * 100;
            const widthPercent =
              ((Math.min(endHour, endInterval) - Math.max(startHour, startInterval)) / totalHours) *
              100;

            if (widthPercent <= 0) return null;

            const heightPercent = 100 / maxOverlaps;
            const IconComponent = getIcon(type);

            const tooltipTitle = (
              <Box sx={{ p: 1 }}>
                <div>
                  <b>{getAbsenceTypeName(type as AbsenceType)}: </b>
                  {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} —{' '}
                  {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </Box>
            );

            return (
              <Tooltip key={`${dayKey}-${i}-${layerIndex}`} title={tooltipTitle} arrow>
                <Box
                  sx={{
                    position: 'absolute',
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`,
                    bottom: `${heightPercent * layerIndex}%`,
                    height: `${heightPercent}%`,
                    bgcolor: getColor(type),
                    opacity: 0.8,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 12,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    zIndex: 1,
                  }}
                >
                  {IconComponent && <IconComponent fontSize="small" />}
                </Box>
              </Tooltip>
            );
          })
        )
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
