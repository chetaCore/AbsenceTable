import React, { useState } from 'react';
import { Edit, Image, PeopleAlt, PersonOff } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { ButtonGroup, Stack, Box, Divider, Button, Autocomplete, TextField, Chip, Checkbox, ListItemText } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AbsenceType, Employee, EmployeeAbsence, Period } from '../api/types/types';
import { AbsenceSwitcher } from './AbsenceSwitcher';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import { PeriodPicker } from './PeriodPicker';
import { getAbsenceTypeName } from '../tools/absenceCommon';
import { CreateAbsenceButton } from './buttons/CreateAbsenceButton';
import { AbsenceButton } from './buttons/AbsenceButton';
import { RemoveAbsenceButton } from './buttons/RemoveAbsenceButton';
import { MergeAbsenceButton } from './buttons/MergeAbsenceButton';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface AbsenceToolbarProps {
  absencesTypesState: Record<AbsenceType, boolean>;
  allEmployees: Employee[];
  employees: Employee[];
  abcences: EmployeeAbsence[];
  filter: number[];
  period: Period;
  theme: 'dark' | 'light';
  isShowEmptyEmployees: boolean;
  isShowIcons: boolean;
  isWideColumns: boolean;
  onRefresh: () => Promise<void>;
  onAbsencesTypesStateToggle: (newAbsences: Record<AbsenceType, boolean>) => void;
  onShowIconClick: (value: boolean) => void;
  onFilterValueChange: (value: number[]) => void;
  onPeriodChange: (period: Period) => void;
  onThemeChanged: (value: boolean) => void;
  onScaleChanged: (value: boolean) => void;
  onShowEmptyEmployeesChanged: (value: boolean) => void;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const AbsenceToolbar: React.FC<AbsenceToolbarProps> = ({
  absencesTypesState: activeAbsences,
  allEmployees,
  employees,
  abcences,
  filter,
  period,
  theme,
  isShowIcons,
  isWideColumns,
  isShowEmptyEmployees,
  onRefresh,
  onAbsencesTypesStateToggle,
  onShowIconClick,
  onFilterValueChange,
  onPeriodChange,
  onThemeChanged,
  onScaleChanged,
  onShowEmptyEmployeesChanged
}) => {

  const absenceButtons = Object.values(AbsenceType).map((type) => ({
    type,
    label: getAbsenceTypeName(type),
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
      <Box p={1} m={1}>
        <Stack spacing={2} >
          {/* Верхний ряд: кнопки, переключатели, DatePicker */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
            flexWrap="nowrap"
            sx={{ overflowX: 'auto' }}
          >

            {/* Кнопки отсутствий */}
            <Stack spacing={2} flex={1}>
              {chunkedButtons.map((row, index) => (
                <ButtonGroup
                  key={index}
                  variant="outlined"
                  fullWidth
                >
                  {row.map(({ type, label }) => (
                    <AbsenceButton
                      key={type}
                      type={type}
                      active={activeAbsences[type]}
                      onClick={() => handleAbsenceToggle(type)}
                    >
                      {label}
                    </AbsenceButton>
                  ))}
                </ButtonGroup>
              ))}
            </Stack>

            <Divider orientation="vertical" flexItem />

            {/* Переключатели */}
            <Stack direction="column" spacing={1} alignItems="center">
              {/* Показ иконок / текста */}
              <AbsenceSwitcher
                checked={isShowIcons}
                onChange={(value) => {
                  onShowIconClick(value);
                }}
                iconOn={Image}
                iconOff={Edit}
                tooltipOn="Показать текст"
                tooltipOff="Показать иконки"
              />

              {/* Светлая / темная тема */}
              <AbsenceSwitcher
                checked={theme === 'dark'}
                onChange={onThemeChanged}
                iconOn={DarkModeIcon}
                iconOff={LightModeIcon}
                tooltipOn="Темная тема"
                tooltipOff="Светлая тема"
              />

              {/* Масштаб столбцов */}
              <AbsenceSwitcher
                checked={isWideColumns}
                onChange={(value) => {
                  console.log(value);
                  onScaleChanged(value);
                }}
                iconOn={ZoomOutMapIcon}
                iconOff={ZoomInMapIcon}
                tooltipOn="Масштаб столбцов x2"
                tooltipOff="Масштаб столбцов x1"
              />

              {/* Показ сотрудников без отсутствий */}
              <AbsenceSwitcher
                checked={isShowEmptyEmployees}
                onChange={(value) => {
                  onShowEmptyEmployeesChanged(value);
                }}
                iconOn={PeopleAlt}
                iconOff={PersonOff}
                tooltipOn="Показать всех сотрудников"
                tooltipOff="Скрыть сотрудников без отсутствий"
              />
            </Stack>

            <Divider orientation="vertical" flexItem />

            {/* DatePicker */}
            <Stack direction="row" spacing={1} alignItems="center">
              <PeriodPicker period={period} onPeriodChange={onPeriodChange} />
            </Stack>
          </Stack>

          <Divider />

          <Stack direction="row" spacing={1} alignItems="center">
            {/* Фильтр сотрудников */}
            <Autocomplete
              multiple
              options={allEmployees}
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
              value={allEmployees.filter(e => filter.includes(e.id))}
              onChange={(_, newValues) => onFilterValueChange(newValues.map(e => e.id))}
              renderOption={(props, option, { selected }) => (
                <li {...props} key={option.id}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  <ListItemText primary={option.name} />
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Сотрудник"
                  label="Фильтр"
                  variant="outlined"
                />
              )}
              noOptionsText="Ничего не нашлось"
              sx={{ width: 300 }}
            />

            {/* Группа кнопок управления отсутствиями */}
            <ButtonGroup variant="outlined" size="medium">
              <CreateAbsenceButton employees={employees} onRefresh={onRefresh} />
              <MergeAbsenceButton employees={employees} absences={abcences} onRefresh={onRefresh} />
              <RemoveAbsenceButton employees={employees} absences={abcences} onRefresh={onRefresh} />
            </ButtonGroup>
          </Stack>
        </Stack>
      </Box>
    </LocalizationProvider >
  );
};
