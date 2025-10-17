import React, { useState } from 'react';
import { CalendarMonth, Edit, Image } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { ButtonGroup, Stack, Box, Divider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AbsenceType, Period } from '../types';
import { AbsenceButton } from './AbsenceButton';
import { AbsenceSwitcher } from './AbsenceSwitcher';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import { AbsenceInput } from './AbsenceInput';
import { PeriodPicker } from './PeriodPicker';

interface AbsenceToolbarProps {
    activeAbsences: Record<AbsenceType, boolean>;
    filter: string;
    period: Period;
    theme: 'dark' | 'light';
    onAbsenceToggle: (type: AbsenceType) => void;
    onShowIconClick: (value: boolean) => void;
    onFilterValueChange: (value: string) => void;
    onPeriodChange: (period: Period) => void;
    onThemeChanged: (value: boolean) => void;
    onScaleChanged: (value: boolean) => void; // 👈 новый обработчик
}

export const AbsenceToolbar: React.FC<AbsenceToolbarProps> = ({
    activeAbsences,
    filter,
    period,
    theme,
    onAbsenceToggle,
    onShowIconClick,
    onFilterValueChange,
    onPeriodChange,
    onThemeChanged,
    onScaleChanged
}) => {
    const [isShowIcons, setIsShowIcons] = useState(true);
    const [isWideColumns, setIsWideColumns] = useState(false); // 👈 состояние масштаба столбцов

    const absenceButtons = [
        { type: AbsenceType.vacation, label: 'Отпуск' },
        { type: AbsenceType.sick, label: 'Больничный' },
        { type: AbsenceType.businessTrip, label: 'Командировка' },
        { type: AbsenceType.halfDay, label: 'Отгул < 4ч' },
        { type: AbsenceType.remoteWork, label: 'Удалёнка' },
        { type: AbsenceType.businessTripOut, label: 'Выезд по работе' },
    ];

    const chunkedButtons: typeof absenceButtons[] = [];
    for (let i = 0; i < absenceButtons.length; i += 3) {
        chunkedButtons.push(absenceButtons.slice(i, i + 3));
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <Box sx={{ p: 1, m: 1 }}>
                <Stack spacing={2}>
                    {/* Верхний ряд: кнопки, переключатели, DatePicker */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        {/* Кнопки отсутствий */}
                        <Stack spacing={2} sx={{ flex: 1 }}>
                            {chunkedButtons.map((row, index) => (
                                <ButtonGroup
                                    key={index}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        '& .MuiButton-root': { flex: 1, textTransform: 'none' },
                                    }}
                                >
                                    {row.map(({ type, label }) => (
                                        <AbsenceButton
                                            key={type}
                                            type={type}
                                            active={activeAbsences[type]}
                                            onClick={() => onAbsenceToggle(type)}
                                        >
                                            {label}
                                        </AbsenceButton>
                                    ))}
                                </ButtonGroup>
                            ))}
                        </Stack>

                        <Divider orientation="vertical" flexItem sx={{ bgcolor: '#ccc' }} />

                        {/* Переключатели */}
                        <Stack direction="column" spacing={1} alignItems="center">
                            {/* Показ иконок / текста */}
                            <AbsenceSwitcher
                                checked={isShowIcons}
                                onChange={(value) => {
                                    setIsShowIcons(value);
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

                            {/* 👇 Новый свитчер масштаба ширины столбцов */}
                            <AbsenceSwitcher
                                checked={isWideColumns}
                                onChange={(value) => {
                                    setIsWideColumns(value);
                                    onScaleChanged(value);
                                }}
                                iconOn={ZoomOutMapIcon}
                                iconOff={ZoomInMapIcon}
                                tooltipOn="Масштаб столбцов x2"
                                tooltipOff="Масштаб столбцов x1"
                            />
                        </Stack>

                        <Divider orientation="vertical" flexItem sx={{ bgcolor: '#ccc' }} />

                        {/* DatePicker */}
                        <Stack direction="row" spacing={1} alignItems="center">
                            <PeriodPicker period={period} onPeriodChange={onPeriodChange} />
                        </Stack>
                    </Stack>

                    <Divider sx={{ bgcolor: '#ccc' }} />

                    {/* Фильтр */}
                    <Stack direction="row" spacing={1} alignItems="center">
                        <AbsenceInput
                            type={AbsenceType.businessTrip}
                            value={filter}
                            onChange={(value) => onFilterValueChange(value)}
                            placeholder="Имя или подразделение"
                            active={!!filter}
                        />
                    </Stack>
                </Stack>
            </Box>
        </LocalizationProvider>
    );
};
