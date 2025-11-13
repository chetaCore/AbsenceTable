import React, { useState } from 'react';
import { IRemoteComponentCoverApi } from '@directum/sungero-remote-component-types';
import { Alert, AlertTitle, Backdrop, Box, Button, CircularProgress, ThemeProvider } from '@mui/material';
import { getTheme } from './tools/tableStyle';
import { AbsenceToolbar } from './components/AbsenceToolbar';
import { AbsenceGrid } from './components/AbsenceGrid';
import { useAbsenceFilter } from './hooks/state/useAbsenceFilter';
import { useEmployeeData } from './hooks/state/useEmployeeData';
import { usePeriod } from './hooks/state/usePeriod';
import { useThemeSwitcher } from './hooks/state/useThemeSwitcher';
import { useLoadingAndErrors } from './hooks/state/useLoadingAndErrors';

export const AbsenceTable: React.FC<{ api: IRemoteComponentCoverApi }> = ({ api }) => {
  const { theme, toggleTheme } = useThemeSwitcher(); //Получить тему комопонента.
  const { period, setPeriod } = usePeriod();  //Получить период отображения отсутвий.
  const { filter, setFilter, absencesTypesState, setAbsencesTypesState } = useAbsenceFilter(); //Получить фильтр сотрудников и сосотояние отображения типов остутвий.
  const { isLoading, errors, handleLoadingChange, handleError, clearErrors } = useLoadingAndErrors(); //Получить ошибки и признак загрузки.

  const [isShowIcons, setIsShowIcons] = useState(true);
  const [isWideColumns, setIsWideColumns] = useState(false);
  const [isShowEmptyEmployees, setIsShowEmptyEmployees] = useState(false);

  const { employees, allEmployees, absences, refreshAbcences, refreshEmployees } = useEmployeeData({
    filter,
    period,
    onLoadingChange: handleLoadingChange,
    onError: handleError,
  });

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>
        <AbsenceToolbar
          absencesTypesState={absencesTypesState}
          allEmployees={allEmployees}
          employees={employees}
          abcences={absences}
          filter={filter}
          period={period}
          theme={theme}
          isShowIcons={isShowIcons}
          isWideColumns={isWideColumns}
          isShowEmptyEmployees={isShowEmptyEmployees}
          onRefresh={refreshAbcences}
          onAbsencesTypesStateToggle={setAbsencesTypesState}
          onShowIconClick={setIsShowIcons}
          onFilterValueChange={setFilter}
          onPeriodChange={setPeriod}
          onThemeChanged={toggleTheme}
          onScaleChanged={setIsWideColumns}
          onShowEmptyEmployeesChanged={setIsShowEmptyEmployees}
        />

        {errors.length > 0 && (
          <Box>
            {errors.map((error, index) => (
              <Alert
                key={index}
                severity="error"
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => {
                      clearErrors();
                      refreshAbcences();
                      refreshEmployees();
                    }}
                  >
                    Обновить
                  </Button>
                }
              >
                <AlertTitle>Ошибка:</AlertTitle>
                {error}
              </Alert>
            ))}
          </Box>
        )}

        <AbsenceGrid
          employees={employees}
          absences={absences}
          period={period}
          absencesTypesState={absencesTypesState}
          isShowIcons={isShowIcons}
          isWideColumns={isWideColumns}
          isShowEmptyEmployees={isShowEmptyEmployees}
          isLoading={isLoading}
        />

        {/* Индикатор загрузки */}
        {isLoading && (
          <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: 1300 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Box>
    </ThemeProvider>
  );
};

