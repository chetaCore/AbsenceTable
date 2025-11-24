import React from 'react';
import { Button, Paper, Theme } from "@mui/material";
import { getIcon, getColor } from "../../tools/absenceCommon";
import { AbsenceType } from "../../api/types/types";

interface AbsenceButtonProps {
  theme: 'dark' | 'light';
  type: AbsenceType;
  active?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const AbsenceButton: React.FC<AbsenceButtonProps> = ({
  theme,
  type,
  active = false,
  onClick,
  children
}) => {
  const IconComponent = getIcon(type);
  const typeColor = getColor(type, theme);

  return (
    <Paper
      elevation={3}
      sx={{
        width: 200,
        height: 36,
      }}>
      <Button
        fullWidth
        onClick={onClick}
        variant='outlined'
        startIcon={
          IconComponent ? (
            <IconComponent
              sx={(muiTheme: Theme) => ({
                fontSize: 20,
                color: active
                  ? '#000'
                  : muiTheme.palette.text.primary
              })}
            />
          ) : undefined
        }
        sx={(muiTheme: Theme) => ({
          backgroundColor: active
            ? typeColor
            : muiTheme.palette.background.default,
          whiteSpace: 'normal',
          textAlign: 'center',
          overflowWrap: 'break-word',
          px: 1,
          color: active
            ? '#000'
            : muiTheme.palette.text.primary
        })}
      >
        {children}
      </Button>
    </Paper>
  );

};
