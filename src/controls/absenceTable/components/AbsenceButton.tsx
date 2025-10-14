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
        borderRadius: '16px', // скругление капсулы
        textTransform: 'none', // чтобы текст не был uppercase
        px: 2, // отступ слева/справа
        py: 0.5, // отступ сверху/снизу
        minHeight: 36,
        display: 'flex',
        alignItems: 'center',
        gap: 1, // расстояние между иконкой и текстом
      }}
    >
      {children}
    </Button>
  );
};
