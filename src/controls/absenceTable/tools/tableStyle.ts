import { createTheme, PaletteMode } from "@mui/material";

export const getTheme = (mode: PaletteMode) => {
  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return createTheme(theme, {
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#f8fafc' : '#334155',
            '& .stickyColumnHeader': {
              position: 'sticky',
              left: 0,
              zIndex: theme.zIndex.appBar + 1,
              backgroundColor: mode === 'light' ? '#d3d3d4ff' : '#1e293b',
            },
            '& .stickyColumn': {
              position: 'sticky',
              left: 0,
              zIndex: 2,
              backgroundColor: mode === 'light' ? '#f8fafc' : '#334155',
            },
            '& .stickyColumn::after': {
              content: '""',
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: '2px',
              backgroundColor: mode === 'light' ? '#d1d5db' : '#1e293b',
            },
            '& .MuiDataGrid-cell': {
              padding: 0,
              boxSizing: 'border-box',
              lineHeight: 1,
              height: 'auto',
            },
            '& .MuiDataGrid-cell:focus': { outline: 'none' },
            '& .MuiDataGrid-cell:focus-within': { outline: 'none' },
            '& .MuiDataGrid-cell--selected': { backgroundColor: 'inherit !important' },
            '& .MuiDataGrid-row.Mui-selected': { backgroundColor: 'inherit !important' },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '16px',
              bgcolor: mode === 'light' ? '#f0f0f0' : '#475569',
              padding: '0 8px',
              '&:hover': { bgcolor: mode === 'light' ? '#e0e0e0' : '#334155' },
              '&.Mui-focused': { bgcolor: mode === 'light' ? '#d0d0d0' : '#1e293b' },
            },
            '& input': { padding: '8px 12px' },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            '&.MuiButton-outlined': {
              borderColor: mode === 'light' ? '#ccc' : '#475569',
              color: mode === 'light' ? '#000' : '#f8fafc',
              '&:hover': {
                borderColor: mode === 'light' ? '#999' : '#64748b',
                backgroundColor: mode === 'light' ? '#e0e0e0' : '#1e293b',
              },
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#ccc' : '#64748b',
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            '& .MuiSvgIcon-root': { fontSize: 20 },
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            '&.Mui-selected': {
              bgcolor: '#4f46e5',
              color: '#fff',
              '&:hover': { bgcolor: '#4338ca' },
            },
            '&:hover': { bgcolor: mode === 'light' ? '#e0e0e0' : '#1e293b' },
          },
        },
      },
      MuiCalendarPicker: {
        styleOverrides: {
          root: {
            '& .MuiPickersCalendar-weekContainer': {
              justifyContent: 'center',
            },
          },
        },
      },
      MuiPickersPopper: {
        styleOverrides: {
          paper: {
            borderRadius: '16px',
            overflow: 'hidden',
          },
        },
      },
      MuiPickersInputBase: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            bgcolor: mode === 'light' ? '#f0f0f0' : '#475569',
            padding: '4px 12px',
            minHeight: 36,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            '&:hover': {
              bgcolor: mode === 'light' ? '#e0e0e0' : '#334155',
            },
            '&.Mui-focused': {
              bgcolor: mode === 'light' ? '#d0d0d0' : '#1e293b',
            },
          },
        },
      },
      MuiPickersSection: {
        styleOverrides: {
          root: {
            color: mode === 'light' ? '#000' : '#f8fafc',
            fontWeight: 500,
          },
        },
      },
      MuiPickersSectionContent: {
        styleOverrides: {
          root: {
            padding: '4px 6px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#f8fafc' : '#334155',
          },
        },
      },
    },
  });
};
