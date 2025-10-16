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
  const iconStyle = (active: boolean) => ({
    color: active ? switchColor : 'rgba(0,0,0,0.5)',
    transition: 'color 0.3s',
  });

  return (
    <Tooltip title={checked ? tooltipOn : tooltipOff}>
      <Box display="flex" alignItems="center" gap={1}>
        {/* Иконка слева */}
        <IconOff fontSize="small" style={iconStyle(!checked)} />

        <Switch
          checked={checked}
          onChange={(e, checked) => onChange(checked)}
          color={checked ? 'primary' : 'default'} // нужен только для стиля Switch
        />

        {/* Иконка справа */}
        <IconOn fontSize="small" style={iconStyle(checked)} />
      </Box>
    </Tooltip>
  );
};
