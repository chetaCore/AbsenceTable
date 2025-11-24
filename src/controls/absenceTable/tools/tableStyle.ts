import { createTheme, PaletteMode } from "@mui/material";

export const getTheme = (mode: PaletteMode) => {
  const theme = createTheme({
    palette: {
      mode,
      background: {
        default: mode === "light" ? "#ffffff" : "#353535",
        paper:   mode === "light" ? "#ffffff" : "#353535",
      },
    },
  });

  return createTheme(theme, {
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.background.default,
            "& .stickyColumnHeader": {
              position: "sticky",
              left: 0,
              zIndex: theme.zIndex.appBar + 1,
              backgroundColor: mode === "light" ? "#d3d3d4ff" : "#1e293b",
            },
            "& .stickyColumn": {
              position: "sticky",
              left: 0,
              zIndex: 2,
              backgroundColor: theme.palette.background.default,
            },
            "& .stickyColumn::after": {
              content: '""',
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "2px",
              backgroundColor: mode === "light" ? "#d1d5db" : "#1e293b",
            },
            '& .MuiDataGrid-cell': {
              padding: 0,
            },
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.background.paper,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            minHeight: 36,
            padding: '6px 12px',
            backgroundColor: 'transparent',
            border: '1px solid',
            borderColor: mode === 'light' ? '#c4c4c4' : '#555555',
            color: mode === 'light' ? '#000' : '#fff',
            textTransform: 'none',
            fontSize: 14,
            '&:hover': {
              backgroundColor: 'transparent',
              borderColor: mode === 'light' ? '#999' : '#888',
            },
          },
        },
      },
    },
  });
};
