import React from 'react';
import { Box } from '@mui/material';

interface ClickableEmptySlotProps {
  onClick?: () => void;
}

export const ClickableEmptySlot: React.FC<ClickableEmptySlotProps> = ({ onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'transparent',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        '&:hover': {
          bgcolor: 'rgba(0, 0, 0, 0.05)',
        },
      }}
    />
  );
};
