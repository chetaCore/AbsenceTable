import React from 'react';
import { Box, Switch, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface AbsenceSwitcherProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  iconOn: React.ElementType;
  iconOff: React.ElementType;
  tooltipOn?: string;
  tooltipOff?: string;
  colorOn?: 'success' | 'primary' | 'secondary' | 'warning' | 'info' | 'error';
  colorOff?: 'success' | 'primary' | 'secondary' | 'warning' | 'info' | 'error';
}

export const AbsenceSwitcher: React.FC<AbsenceSwitcherProps> = ({
  checked,
  onChange,
  iconOn: IconOn,
  iconOff: IconOff,
  tooltipOn = 'Вкл',
  tooltipOff = 'Выкл',
  colorOff = 'primary',
  colorOn = 'success',
}) => {
  const theme = useTheme();

  const iconStyle = (isActive: boolean, colorKey: typeof colorOn) => ({
    color: isActive
      ? theme.palette[colorKey].main
      : theme.palette.action.disabled,
    transition: 'color 0.3s',
  });

  return (
    <Tooltip title={checked ? tooltipOn : tooltipOff}>
      <Box display="flex" alignItems="center" gap={1}>
        {/* Иконка слева (off) */}
        <IconOff fontSize="small" style={iconStyle(!checked, colorOff)} />

        {/* Переключатель */}
        <Switch
          checked={checked}
          onChange={(e, checked) => onChange(checked)}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: theme.palette[colorOn].main,
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: theme.palette[colorOn].main,
            },
            '& .MuiSwitch-switchBase:not(.Mui-checked)': {
              color: theme.palette[colorOff].main,
            },
            '& .MuiSwitch-switchBase:not(.Mui-checked) + .MuiSwitch-track': {
              backgroundColor: theme.palette[colorOff].main,
            },
          }}
        />

        {/* Иконка справа (on) */}
        <IconOn fontSize="small" style={iconStyle(checked, colorOn)} />
      </Box>
    </Tooltip>
  );
};
