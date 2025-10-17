import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getColor } from '../tools/absenceCommon';
import { AbsenceType } from '../types';

interface AbsenceInputProps {
  type: AbsenceType;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  active?: boolean;
  debounceMs?: number;
}
export const AbsenceInput: React.FC<AbsenceInputProps> = ({
  type,
  value,
  onChange,
  placeholder = 'Введите текст...',
  active = false,
  debounceMs = 300,
}) => {
  const color = getColor(type);
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(internalValue);
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [internalValue, onChange, debounceMs]);

  return (
    <TextField
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: active ? color : '#757575' }} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        width: '280px',
        bgcolor: active ? `${color}20` : '#f9f9f9',
        borderRadius: '16px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '16px',
          '& fieldset': {
            borderColor: active ? color : '#ccc',
          },
          '&:hover fieldset': {
            borderColor: active ? color : '#999',
          },
          '&.Mui-focused fieldset': {
            borderColor: color,
          },
        },
      }}
    />
  );
};
