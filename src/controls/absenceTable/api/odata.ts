import { Employee } from "./types/types";
import api, { callOdataMethod, requestWrapper } from "./api";
import { AbsenceTableDTO, AbsenceTableResponseDTO } from "./dto";

export const getAbsenceTableData = (absenceTableDTO: AbsenceTableDTO) =>
  callOdataMethod<AbsenceTableDTO, AbsenceTableResponseDTO[]>("AbsenceBase/GetAbsenceTableData", absenceTableDTO);

export const getEmployees = () =>
  callOdataMethod<undefined, Employee[]>("http://localhost/integration/odata/Iemployees?$expand=department($select=Id,Name),PersonalPhoto($select=value)&$select=Id,Name,department,PersonalPhoto", undefined, 'GET');
