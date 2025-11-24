import { AbsenceType } from "./types/types";

/** 
 * Структура сотрудника
 * */
export interface EmployeeDTO {
  id: number;
  name: string;
  personalPhoto: string;
  department: string;
  uri: string;
}

/** 
 * Параметры получения информации для таблицы отсутствий
 */
export interface AbsenceTableDTO {
  startPeriod: Date;
  endPeriod: Date;
  employeesIds: number[];
}

/**
 * Структура отдельного отсутствия
 */
export interface AbsenceDTO {
  id: number;
  employeeId: number;
  type: string;
  tooltipData: string;
  startDate: Date;
  endDate: Date;
  applicationDate: Date;
  hours: number;
  startWorkHour: number;
  endWorkHour: number;
}

/**
 * Информация для таблицы отсутствий
 */
export interface AbsenceTableResponseDTO {
  absences: AbsenceDTO[];
  canUseToolbar: boolean;
}

/**
 * Информация для создания отсутствия
 */
export interface CreateAbsenceDTO {
  type: AbsenceType;
  employeeId: number;
  start: Date;
  end: Date;
  applicationDate: Date;
  hours: number;
}

/**
 * Информация для удаления отсутствия
 */
export interface RemoveAbsenceDTO {
  absenceId: number;
}

/**
 * Информация для изменения отсутствия
 */
export interface EditAbsenceDTO {
  absenceId: number;
  type: AbsenceType;
  employeeId: number;
  start: Date;
  end: Date;
  applicationDate: Date;
  hours: number;
}

