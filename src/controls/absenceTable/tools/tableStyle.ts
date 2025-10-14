import { createTheme } from '@mui/material/styles';
import type { } from '@mui/x-data-grid/themeAugmentation';

export type PaletteMode = 'light' | 'dark';

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

            // Заголовок первого столбца
            '& .stickyColumnHeader': {
              position: 'sticky',
              left: 0,
              zIndex: theme.zIndex.appBar + 1,
              backgroundColor: mode === 'light' ? '#d3d3d4ff' : '#1e293b',
            },

            // Все ячейки первого столбца
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
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-cell:focus-within': {
              outline: 'none',
            },
            '& .MuiDataGrid-cell--selected': {
              backgroundColor: 'inherit !important',
            },
            '& .MuiDataGrid-row.Mui-selected': {
              backgroundColor: 'inherit !important',
            },
          },
        },
      },
    },
  });
};
