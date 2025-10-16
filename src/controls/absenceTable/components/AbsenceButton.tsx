import React from 'react';
import { Button } from "@mui/material";
import { getIcon, getColor } from "../tools/absenceCommon";
import { AbsenceType } from "../types";

interface AbsenceButtonProps {
  type: AbsenceType;
  active?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const AbsenceButton: React.FC<AbsenceButtonProps> = ({ type, active = false, onClick, children }) => {
  const IconComponent = getIcon(type);
  const color = getColor(type);

  return (
    <Button
      onClick={onClick}
      startIcon={IconComponent ? <IconComponent sx={{ fontSize: 20, color: active ? '#fff' : color }} /> : undefined}
      sx={{
        bgcolor: active ? color : '#f0f0f0',
        color: active ? '#fff' : '#000',
        '&:hover': {
          bgcolor: active ? color : '#e0e0e0',
        },
        borderRadius: '16px', 
        textTransform: 'none',
        px: 2,
        py: 0.5, 
        minHeight: 36,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        width: '300px',
      }}
    >
      {children}
    </Button>
  );
};
