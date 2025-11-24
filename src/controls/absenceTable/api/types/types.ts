export interface Employee {
  id: number;
  name: string;
  personalPhoto: string;
  department : string;
  uri: string;
}

export interface EmployeeAbsence {
  id: number;
  employeeId: number;
  type: AbsenceType;
  startDate: Date;
  endDate: Date;
  applicationDate: Date;
  hours: number;
  startWorkHour: number;
  endWorkHour: number;
  tooltipData: string;
}

export enum AbsenceType {
  Vacation = "Vacation",
  SickLeave = "SickLeave",
  JobDeparture = "JobDeparture",
  LeaveOfAbs4h = "LeaveOfAbs4h",
  RemoteWork = "RemoteWork",
  BusinessTripOut = "BusinessTripOut"
}

export interface AsencesInfo {
  color: string;
  type: AbsenceType;
}

export interface Period {
  startDate: Date;
  endDate: Date;
}
