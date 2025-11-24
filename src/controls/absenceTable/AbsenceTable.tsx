import React, { useState } from 'react';
import { IRemoteComponentContext, IRemoteComponentCoverApi, Theme } from '@directum/sungero-remote-component-types';
import { Alert, AlertTitle, Backdrop, Box, Button, CircularProgress, ThemeProvider } from '@mui/material';
import { getTheme } from './tools/tableStyle';
import { AbsenceToolbar } from './components/AbsenceToolbar';
import { AbsenceGrid } from './components/AbsenceGrid';
import { useAbsenceFilter } from './hooks/state/useAbsenceFilter';
import { useEmployeeData } from './hooks/state/useEmployeeData';
import { usePeriod } from './hooks/state/usePeriod';
import { useThemeSwitcher } from './hooks/state/useThemeSwitcher';
import { useLoadingAndErrors } from './hooks/state/useLoadingAndErrors';
import { useAbsenceActions } from './hooks/api/useAbsencesActions';

export const AbsenceTable: React.FC<{ api: IRemoteComponentCoverApi, context: IRemoteComponentContext}> = ({ api, context }) => {
  const { theme, setTheme } = useThemeSwitcher(context.theme == Theme.Default ? "light" : "dark"); //Получить тему комопонента.
  const { period, setPeriod } = usePeriod();  //Получить период отображения отсутвий.
  const { filter, setFilter, absencesTypesState, setAbsencesTypesState } = useAbsenceFilter(); //Получить фильтр сотрудников и сосотояние отображения типов остутвий.
  const { isLoading, errors, handleLoadingChange, handleError, clearErrors } = useLoadingAndErrors(); //Получить ошибки и признак загрузки.

  const [isShowIcons, setIsShowIcons] = useState(true);
  const [isWideColumns, setIsWideColumns] = useState(false);
  const [isShowEmptyEmployees, setIsShowEmptyEmployees] = useState(false);

  const { employees, allEmployees, absences, canUseToolbar, refreshAbcences, refreshEmployees } = useEmployeeData({
    filter,
    period,
    onLoadingChange: handleLoadingChange,
    onError: handleError,
  });

  const { createAbsence, removeAbsence, editAbsence } = useAbsenceActions(canUseToolbar, refreshAbcences); //Получить действия с отутсвиями.

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>
        <AbsenceToolbar
          absencesTypesState={absencesTypesState}
          employees={allEmployees}
          abcences={absences}
          period={period}
          theme={theme}
          isShowIcons={isShowIcons}
          isWideColumns={isWideColumns}
          isShowEmptyEmployees={isShowEmptyEmployees}
          onAbsencesTypesStateToggle={setAbsencesTypesState}
          onShowIconClick={setIsShowIcons}
          onPeriodChange={setPeriod}
          onThemeChanged={setTheme}
          onScaleChanged={setIsWideColumns}
          onShowEmptyEmployeesChanged={setIsShowEmptyEmployees}
          onCreateAbsence={createAbsence}
          onRemoveAbsence={removeAbsence}
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
          theme={theme}
          filter={filter}
          allEmployees={allEmployees}
          employees={employees}
          absences={absences}
          period={period}
          absencesTypesState={absencesTypesState}
          isShowIcons={isShowIcons}
          isWideColumns={isWideColumns}
          isShowEmptyEmployees={isShowEmptyEmployees}
          isLoading={isLoading}
          onEditAbsence={editAbsence}
          onRemoveAbsence={removeAbsence}
          onFilterChange={setFilter}
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

