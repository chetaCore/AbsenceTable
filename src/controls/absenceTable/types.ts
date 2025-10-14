export interface Employee {
    id: number;
    name: string;
} 

export enum AbsenceType {
    vacation, 
    sick,
    businessTrip
}

export interface AsencesInfo
{
    color: string;
    type: AbsenceType;
}