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
    employeeId: number;
    type: string;
    tooltipData: string;
    startDate: Date;
    endDate: Date;
    canUseToolbar: boolean;
}
