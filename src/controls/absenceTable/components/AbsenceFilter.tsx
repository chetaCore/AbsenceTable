import * as React from 'react';
import { CalendarMonth, Edit, Image, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { Button, Stack, Box, ButtonGroup, IconButton, Tooltip, Drawer, Divider } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AbsenceType } from '../types';
import { AbsenceButton } from './AbsenceButton';
import { DatePickerWithControls } from './DatePickerWithControls';
import { AbsenceSwitcher } from './AbsenceSwitcher';
import WeekIcon from '@mui/icons-material/DateRange';
import MonthIcon from '@mui/icons-material/CalendarMonth';

interface AbsenceFilterProps {
    selectedDate: Date;
    onDateChange: (newDate: Date) => void;
    activeAbsences: Record<AbsenceType, boolean>;
    onAbsenceToggle: (type: AbsenceType) => void;
    onShowIconClick: () => boolean;
}

export const AbsenceFilter: React.FC<AbsenceFilterProps> = ({
    selectedDate,
    onDateChange,
    activeAbsences,
    onAbsenceToggle,
    onShowIconClick,
}) => {
    const [showIcons, setShowIcons] = React.useState(false);

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
            <Box p={3}>
                <Stack
                    direction="row"
                    spacing={0}
                    alignItems="center"
                    sx={{ width: '100%' }}
                >
                    {/* Блок кнопок отсутствий */}
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

                    <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: '#ccc' }} />

                    <Stack direction="column" spacing={1} alignItems="center">
                        <AbsenceSwitcher
                            checked={showIcons}
                            onChange={setShowIcons}
                            iconOn={Image}
                            iconOff={Edit}
                            tooltipOn="Показать иконки"
                            tooltipOff="Показать текст"
                        />
                        <AbsenceSwitcher
                            checked={showIcons}
                            onChange={setShowIcons}
                            iconOn={MonthIcon}
                            iconOff={WeekIcon}
                            tooltipOn="Месяц"
                            tooltipOff="Неделя"
                        />
                    </Stack>


                    <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: '#ccc' }} />

                    <Stack direction="row" spacing={1} alignItems="center">
                        <DatePickerWithControls selectedDate={selectedDate} onDateChange={onDateChange} />
                    </Stack>
                </Stack>

            </Box>
        </LocalizationProvider>
    );

};
