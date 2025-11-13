import { AbsenceType } from "./types/types";

/** 
 * Параметры получения информации для таблицы отсутствий
 */
export interface AbsenceTableDTO {
    startPeriod: Date;
    endPeriod: Date;
    employeesIds: number[];
}

/**
 * Информация для таблицы отсутствий
 */
export interface AbsenceTableResponseDTO {
    id: number;
    employeeId: number;
    type: string;
    tooltipData: string;
    startDate: Date;
    endDate: Date;
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
export interface RemoveAbsenceDTO
{
  absenceId: number;
}

