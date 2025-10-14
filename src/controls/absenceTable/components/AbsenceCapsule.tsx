import React from 'react';
import { Box } from '@mui/material';
import { AbsenceType } from '../types';
import { getColor, getIcon } from '../tools/absenceCommon';

interface AbsenceCapsuleProps {
  absences: AbsenceType[];
  rounded?: 'none' | 'left' | 'right' | 'both';
}

export const AbsenceCapsule: React.FC<AbsenceCapsuleProps> = ({
  absences,
  rounded = 'none',
}) => {
  if (!absences || absences.length === 0) return null;

  const borderRadius = (() => {
    switch (rounded) {
      case 'none':
        return 0;
      case 'left':
        return '12px 0 0 12px';
      case 'right':
        return '0 12px 12px 0';
      case 'both':
        return 12;
    }
  })();

  const shrinkTop = 3;
  const shrinkBottom = 3;
  const shrinkLeft = 0;
  const shrinkRight = 0;

  const heightPerCapsule = 100 / absences.length;

  return (
    <Box
      sx={{
        flex: 1,
        height: `calc(100% - ${shrinkTop + shrinkBottom}px)`,
        width: `calc(100% - ${shrinkLeft + shrinkRight}px)`,
        display: 'flex',
        flexDirection: 'column',
        borderRadius,
        overflow: 'hidden',
        alignSelf: 'center',
        justifySelf: 'center',
      }}
    >
      {absences.map((type, i) => {
        const color = getColor(type);
        const IconComponent = getIcon(type);

        const iconSize = 10; 

        return (
          <Box
            key={i}
            sx={{
              flex: `${heightPerCapsule}%`,
              bgcolor: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              position: 'relative',
              height: `${heightPerCapsule}%`,
              borderRadius,
              pl: 1,
            }}
          >
            {rounded === "left" && IconComponent && (
              <Box
                sx={{
                  width: iconSize,
                  height: iconSize,
                  minWidth: 16,
                  minHeight: 16,
                  borderRadius: '50%',
                  bgcolor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 0.5,
                }}
              >
               <IconComponent sx={{ fontSize: 20,
                                      bgcolor:  color,
                                      color: '#fff'
                                        
                  
                   }} />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
