import { AbsenceType } from "../api/types/types";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { isPlainObject, camelCase } from "lodash";
import { colors } from "@mui/material";


/**
 * Получить уникальный ключ поля для колонки по дате.
 * Пример: 2025-10-30
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

export function getColor(type: AbsenceType): string {
  switch (type) {
    case AbsenceType.Vacation:
      return '#FFB300';       // Ярко-желтый (Золотой) — для отпуска
    case AbsenceType.SickLeave:
      return '#D32F2F';       // Красный — для больничного
    case AbsenceType.JobDeparture:
      return '#FF5722';       // Тёплый оранжевый — для увольнения
    case AbsenceType.LeaveOfAbs4h:
      return '#9C27B0';       // Фиолетовый — для 4-х часового отпуска
    case AbsenceType.RemoteWork:
      return '#388E3C';       // Тёмно-зеленый — для удалённой работы
    case AbsenceType.BusinessTripOut:
      return '#1976D2';       // Синий — для командировки
    default:
      return '#BDBDBD';       // Серая палитра для неопределённого типа
  }
}


export function getIcon(type: AbsenceType): any {
  switch (type) {
    case AbsenceType.Vacation:
      return  BeachAccessIcon ;
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

export function getAbsenceTypeName(type: AbsenceType): string {
  switch (type) {
    case AbsenceType.Vacation:
      return "Отпуск";
    case AbsenceType.SickLeave:
      return "Больничный";
    case AbsenceType.JobDeparture:
      return "Командировка";
    case AbsenceType.LeaveOfAbs4h:
      return "Отгул (менее 4 часов)";
    case AbsenceType.RemoteWork:
      return "Удалённая работа";
    case AbsenceType.BusinessTripOut:
      return "Выезд по работе";
    default:
      return "Неизвестно";
  }
}