import React from 'react';
import { AbsenceType } from "../api/types/types";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { TFunction } from "react-i18next";

/**
 * Получить уникальный ключ поля для колонки по дате.
 */
export function getFieldKeyByDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

export function getMonday(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

export function stripTime(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function getColor(type: AbsenceType, themeMode: 'light' | 'dark'): string {
  const colorsLight: Record<AbsenceType, string> = {
    [AbsenceType.Vacation]: '#fcbf49CC',
    [AbsenceType.SickLeave]: '#d62828CC',
    [AbsenceType.JobDeparture]: '#f77f00CC',
    [AbsenceType.LeaveOfAbs4h]: '#b5ff9dCC',
    [AbsenceType.RemoteWork]: '#588157CC',
    [AbsenceType.BusinessTripOut]: '#c5b3ffCC'
  };

  const colorsDark: Record<AbsenceType, string> = {
    [AbsenceType.Vacation]: '#ff6b6bAA',
    [AbsenceType.SickLeave]: '#ffb86bAA',
    [AbsenceType.JobDeparture]: '#ffd93dAA',
    [AbsenceType.LeaveOfAbs4h]: '#4cd964AA',
    [AbsenceType.RemoteWork]: '#00b6d8AA',
    [AbsenceType.BusinessTripOut]: '#8b7bffAA'
  };


  if (type in AbsenceType) {
    return themeMode === 'dark' ? colorsDark[type] : colorsLight[type];
  }

  return themeMode === 'dark' ? '#757575' : '#BDBDBD';
}

export function getIcon(type: AbsenceType): any {
  switch (type) {
    case AbsenceType.Vacation:
      return BeachAccessIcon;
    case AbsenceType.SickLeave:
      return MedicalServicesIcon;
    case AbsenceType.JobDeparture:
      return FlightTakeoffIcon;
    case AbsenceType.LeaveOfAbs4h:
      return AccessTimeIcon;
    case AbsenceType.RemoteWork:
      return HomeWorkIcon;
    case AbsenceType.BusinessTripOut:
      return DirectionsCarIcon;
    default:
      return null;
  }
}

export function getAbsenceTypeName(type: AbsenceType, t: TFunction): string {
  switch (type) {
    case AbsenceType.Vacation:
      return t('absenceTypes.vacation');
    case AbsenceType.SickLeave:
      return t('absenceTypes.sickLeave');
    case AbsenceType.JobDeparture:
      return t('absenceTypes.jobDeparture');
    case AbsenceType.LeaveOfAbs4h:
      return t('absenceTypes.leaveOfAbs4h');
    case AbsenceType.RemoteWork:
      return t('absenceTypes.remoteWork');
    case AbsenceType.BusinessTripOut:
      return t('absenceTypes.businessTripOut');
    default:
      return t('absenceTypes.unknown');
  }
}