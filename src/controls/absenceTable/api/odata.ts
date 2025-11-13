import { Employee } from "./types/types";
import api, { callOdataMethod, RequestResult } from "./api";
import { AbsenceTableDTO, CreateAbsenceDTO, RemoveAbsenceDTO } from "./dto";

export const getAbsenceTableData = (absenceTableDTO: AbsenceTableDTO) =>
  callOdataMethod<AbsenceTableDTO, RequestResult>("AbsenceBase/GetAbsenceTableData", absenceTableDTO);

export const getEmployees = () =>
  callOdataMethod<undefined, Employee[]>("http://localhost/integration/odata/Iemployees?$expand=department($select=Id,Name),PersonalPhoto($select=value)&$select=Id,Name,department,PersonalPhoto", undefined, 'GET');

export const createAbsence = (createAbsenceDTO: CreateAbsenceDTO) =>
  callOdataMethod<CreateAbsenceDTO, RequestResult>("AbsenceBase/CreateAbsence", createAbsenceDTO);

export const removeAbsence = (createAbsenceDTO: RemoveAbsenceDTO) =>
  callOdataMethod<RemoveAbsenceDTO, RequestResult>("AbsenceBase/RemoveAbsence", createAbsenceDTO);

export const mergeAbsences = (mergeAbsencesDTO: {sourceId: number, mergedIds: number[], newKind: string | null}) =>
  callOdataMethod<{sourceId: number, mergedIds: number[], newKind: string | null}, RequestResult>("AbsenceBase/RemoveAbsence", mergeAbsencesDTO);
