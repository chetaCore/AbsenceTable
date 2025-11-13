import React from 'react';
import { Button } from "@mui/material";
import { getIcon, getColor } from "../../tools/absenceCommon";
import { AbsenceType } from "../../api/types/types";

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
        bgcolor: active ? color : undefined,
        color: active ? '#fff' : undefined,
        '&:hover': {
          bgcolor: active ? color : undefined,
        },
      }}
    >
      {children}
    </Button>
  );
};
