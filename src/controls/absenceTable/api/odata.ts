import { Employee } from "./types/types";
import api, { callOdataMethod, RequestResult } from "./api";
import { AbsenceTableDTO, CreateAbsenceDTO, EditAbsenceDTO, EmployeeDTO, RemoveAbsenceDTO } from "./dto";

export const getAbsenceTableData = (absenceTableDTO: AbsenceTableDTO) =>
  callOdataMethod<AbsenceTableDTO, RequestResult>("AbsenceBase/GetAbsenceTableData", absenceTableDTO);

export const getEmployees = () =>
  callOdataMethod<undefined, RequestResult>("AbsenceBase/GetActiveEmployees", undefined, "GET");

export const createAbsence = (createAbsenceDTO: CreateAbsenceDTO) =>
  callOdataMethod<CreateAbsenceDTO, RequestResult>("AbsenceBase/CreateAbsence", createAbsenceDTO);

export const removeAbsence = (removeAbsenceDTO: RemoveAbsenceDTO) =>
  callOdataMethod<RemoveAbsenceDTO, RequestResult>("AbsenceBase/RemoveAbsence", removeAbsenceDTO);

export const editAbsence = (editAbsenceDTO: EditAbsenceDTO) =>
  callOdataMethod<EditAbsenceDTO, RequestResult>("AbsenceBase/EditAbsence", editAbsenceDTO);
