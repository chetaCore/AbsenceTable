import { AbsenceType } from "../types";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export function getMonday(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

export function getColor(type: AbsenceType): string {
  switch (type) {
    case AbsenceType.vacation:
      return '#1976d2';       // Синий
    case AbsenceType.sick:
      return '#d32f2f';       // Красный
    case AbsenceType.businessTrip:
      return '#ed6c02';       // Оранжевый
    case AbsenceType.halfDay:
      return '#9c27b0';       // Фиолетовый
    case AbsenceType.remoteWork:
      return '#2e7d32';       // Зелёный
    case AbsenceType.businessTripOut:
      return '#0288d1';       // Голубой
    default:
      return '#999';
  }
}

export function getIcon(type: AbsenceType): any {
  switch (type) {
    case AbsenceType.vacation:
      return  BeachAccessIcon ;
    case AbsenceType.sick:
      return MedicalServicesIcon;
    case AbsenceType.businessTrip:
      return FlightTakeoffIcon;
    case AbsenceType.halfDay:
      return AccessTimeIcon;      // значок часов
    case AbsenceType.remoteWork:
      return HomeWorkIcon;        // домашний офис
    case AbsenceType.businessTripOut:
      return DirectionsCarIcon;   // машина / выезд
    default:
      return null;
  }
}

export function getAbsenceTypeName(type: AbsenceType): string {
  switch (type) {
    case AbsenceType.vacation:
      return "Отпуск";
    case AbsenceType.sick:
      return "Больничный";
    case AbsenceType.businessTrip:
      return "Командировка";
    case AbsenceType.halfDay:
      return "Отгул (менее 4 часов)";
    case AbsenceType.remoteWork:
      return "Удалённая работа";
    case AbsenceType.businessTripOut:
      return "Выезд по работе";
    default:
      return "Неизвестно";
  }
}
