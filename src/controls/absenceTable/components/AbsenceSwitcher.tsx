import React from 'react';
import { Box, Switch, Tooltip } from '@mui/material';

interface AbsenceSwitcherProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  iconOn: React.ElementType;
  iconOff: React.ElementType;
  tooltipOn?: string;
  tooltipOff?: string;
  switchColor?: string;
}

export const AbsenceSwitcher: React.FC<AbsenceSwitcherProps> = ({
  checked,
  onChange,
  iconOn: IconOn,
  iconOff: IconOff,
  tooltipOn = 'Вкл',
  tooltipOff = 'Выкл',
  switchColor = '#1976d2',
}) => {
  return (
    <Tooltip title={checked ? tooltipOn : tooltipOff}>
      <Box display="flex" alignItems="center" gap={1}>
        {/* Иконка слева */}
        <IconOff fontSize="small" />

        <Switch
          checked={checked}
          onChange={(e, checked) => onChange(checked)}
          color={switchColor as 'primary' | 'secondary'}
        />

        {/* Иконка справа */}
        <IconOn fontSize="small" />
      </Box>
    </Tooltip>
  );
};
