import { AbsenceType } from "../api/types/types";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { isPlainObject, camelCase } from "lodash";

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
      return '#1976d2';       // Синий
    case AbsenceType.SickLeave:
      return '#d32f2f';       // Красный
    case AbsenceType.JobDeparture:
      return '#ed6c02';       // Оранжевый
    case AbsenceType.LeaveOfAbs4h:
      return '#9c27b0';       // Фиолетовый
    case AbsenceType.RemoteWork:
      return '#2e7d32';       // Зелёный
    case AbsenceType.BusinessTripOut:
      return '#0288d1';       // Голубой
    default:
      return '#999';
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