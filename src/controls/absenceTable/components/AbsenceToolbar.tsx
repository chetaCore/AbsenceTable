import React, { useState } from 'react';
import {
  Edit,
  Image,
  PeopleAlt,
  PersonOff,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import {
  Stack,
  Box,
  Divider,
  IconButton
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AbsenceType, Employee, EmployeeAbsence, Period } from '../api/types/types';
import { AbsenceSwitcher } from './AbsenceSwitcher';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import { PeriodPicker } from './PeriodPicker';
import { CreateAbsenceButton } from './buttons/CreateAbsenceButton';
import { AbsenceButton } from './buttons/AbsenceButton';
import { RemoveAbsenceButton } from './buttons/RemoveAbsenceButton';
import { CreateAbsenceDTO, RemoveAbsenceDTO } from '../api/dto';
import { RequestResult } from '../api/api';
import { getAbsenceTypeName } from '../tools/absenceCommon';
import { useTranslation } from 'react-i18next';

interface AbsenceToolbarProps {
  absencesTypesState: Record<AbsenceType, boolean>;
  employees: Employee[];
  abcences: EmployeeAbsence[];
  period: Period;
  theme: 'dark' | 'light';
  isShowEmptyEmployees: boolean;
  isShowIcons: boolean;
  isWideColumns: boolean;
  onAbsencesTypesStateToggle: (newAbsences: Record<AbsenceType, boolean>) => void;
  onShowIconClick: (value: boolean) => void;
  onPeriodChange: (period: Period) => void;
  onThemeChanged: (value: boolean) => void;
  onScaleChanged: (value: boolean) => void;
  onShowEmptyEmployeesChanged: (value: boolean) => void;
  onCreateAbsence?: (data: CreateAbsenceDTO) => Promise<RequestResult>
  onRemoveAbsence?: (data: RemoveAbsenceDTO) => Promise<RequestResult>;
}

export const AbsenceToolbar: React.FC<AbsenceToolbarProps> = ({
  absencesTypesState: activeAbsences,
  employees,
  abcences,
  period,
  theme,
  isShowIcons,
  isWideColumns,
  isShowEmptyEmployees,
  onAbsencesTypesStateToggle,
  onShowIconClick,
  onPeriodChange,
  onThemeChanged,
  onScaleChanged,
  onShowEmptyEmployeesChanged,
  onCreateAbsence,
  onRemoveAbsence
}) => {

  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  const absenceButtons = Object.values(AbsenceType).map((type) => ({
    type,
    label: getAbsenceTypeName(type, t),
  }));

  const chunkedButtons: typeof absenceButtons[] = [];
  for (let i = 0; i < absenceButtons.length; i += 3) {
    chunkedButtons.push(absenceButtons.slice(i, i + 3));
  }

  const handleAbsenceToggle = (type: AbsenceType) => {
    const updatedAbsences = {
      ...activeAbsences,
      [type]: !activeAbsences[type],
    };
    onAbsencesTypesStateToggle(updatedAbsences);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <Box
        p={1}
        m={1}
        sx={(theme) => ({
          borderRadius: 2,
          border: '1px solid',
          borderColor: theme.palette.divider,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        })}
      >
        {/* Контент скрывается */}
        {!collapsed && (
          <Stack spacing={2} mt={1}>
            {/* Верхний блок */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              flexWrap="nowrap"
              sx={{ overflowX: 'auto' }}
            >


              {/* Блок кнопок отсутствий + действий */}
              <Stack spacing={1} sx={{ minWidth: 500, maxWidth: 500 }}>
                {/* Ряды кнопок отсутствий по 3 */}
                {(() => {
                  const absenceButtons = Object.values(AbsenceType).map((type) => (
                    <AbsenceButton
                      key={type}
                      theme={theme}
                      type={type}
                      active={activeAbsences[type]}
                      onClick={() => handleAbsenceToggle(type)}
                    >
                      {getAbsenceTypeName(type, t)}
                    </AbsenceButton>
                  ));

                  const rows: JSX.Element[] = [];
                  for (let i = 0; i < absenceButtons.length; i += 3) {
                    rows.push(
                      <Stack
                        key={`absence-${i}`}
                        direction="row"
                        spacing={1}
                        justifyContent="flex-start"
                      >
                        {absenceButtons.slice(i, i + 3)}
                      </Stack>
                    );
                  }

                  return rows;
                })()}

                {onCreateAbsence && onRemoveAbsence ? (
                  <>
                    <Divider orientation="horizontal" flexItem />

                    {/* Ряд действий: Create / Remove */}
                    <Stack direction="row" spacing={1} justifyContent="flex-start">
                      <CreateAbsenceButton employees={employees} onCreateAbsence={onCreateAbsence} />
                      <RemoveAbsenceButton employees={employees} absences={abcences} onRemoveAbsence={onRemoveAbsence} />
                    </Stack>
                  </>
                ) : null}

              </Stack>

              <Divider orientation="vertical" flexItem />

              {/* Переключатели */}
              <Stack direction="column" spacing={1} alignItems="center">

                <Stack direction="row" spacing={1} alignItems="center">
                  <AbsenceSwitcher
                    checked={isShowIcons}
                    onChange={onShowIconClick}
                    iconOn={Image}
                    iconOff={Edit}
                    tooltipOn="Показать текст"
                    tooltipOff="Показать иконки"
                  />

                  <Divider orientation="vertical" flexItem />

                  <AbsenceSwitcher
                    checked={theme === 'dark'}
                    onChange={onThemeChanged}
                    iconOn={DarkModeIcon}
                    iconOff={LightModeIcon}
                    tooltipOn="Темная тема"
                    tooltipOff="Светлая тема"
                  />
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">

                  <AbsenceSwitcher
                    checked={isWideColumns}
                    onChange={onScaleChanged}
                    iconOn={ZoomOutMapIcon}
                    iconOff={ZoomInMapIcon}
                    tooltipOn="Масштаб столбцов x2"
                    tooltipOff="Масштаб столбцов x1"
                  />

                  <Divider orientation="vertical" flexItem />

                  <AbsenceSwitcher
                    checked={isShowEmptyEmployees}
                    onChange={onShowEmptyEmployeesChanged}
                    iconOn={PeopleAlt}
                    iconOff={PersonOff}
                    tooltipOn="Показать всех сотрудников"
                    tooltipOff="Скрыть сотрудников без отсутствий"
                  />
                </Stack>
              </Stack>


              <Divider orientation="vertical" flexItem />

              {/* Период */}
              <PeriodPicker period={period} onPeriodChange={onPeriodChange} />
            </Stack>
          </Stack>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 20,
          }}
        >
          <IconButton onClick={() => setCollapsed(prev => !prev)}>
            {collapsed ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
