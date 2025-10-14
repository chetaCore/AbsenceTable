import { AbsenceType } from "../types";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HotelIcon from '@mui/icons-material/Hotel';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

export function getMonday(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

export function getColor (type: AbsenceType): string {
    switch (type) {
      case AbsenceType.vacation:
        return '#1976d2';
      case AbsenceType.sick:
        return '#d32f2f';
      case AbsenceType.businessTrip:
        return '#ed6c02';
      default:
        return '#999';
    }
};

export function getIcon (type: AbsenceType) : any {
    switch (type) {
      case AbsenceType.vacation:
        return HotelIcon;
      case AbsenceType.sick:
        return MedicalServicesIcon;
      case AbsenceType.businessTrip:
        return FlightTakeoffIcon;
      default:
        return null;
    }
};