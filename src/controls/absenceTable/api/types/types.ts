export interface Employee {
  id: number;
  name: string;
  personalPhoto?: {
    value: string;
  };
  department?: {
    name: string;
  };
  uri?: string;
}

export interface EmployeeAbsence {
  id: number;
  employeeId: number;
  type: AbsenceType;
  startDate: Date;
  endDate: Date;
  startWorkHour: number;
  endWorkHour: number;
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
