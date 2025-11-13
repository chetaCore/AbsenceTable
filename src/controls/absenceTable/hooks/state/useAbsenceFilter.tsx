import React, { useState } from 'react';
import { AbsenceType } from "../../api/types/types";

export function useAbsenceFilter() {
  const [filter, setFilter] = useState<number[]>([]);
  const [absencesTypesState, setAbsencesTypesState] = useState<Record<AbsenceType, boolean>>({
    [AbsenceType.Vacation]: true,
    [AbsenceType.SickLeave]: true,
    [AbsenceType.JobDeparture]: true,
    [AbsenceType.LeaveOfAbs4h]: true,
    [AbsenceType.RemoteWork]: true,
    [AbsenceType.BusinessTripOut]: true,
  });

  return { filter, setFilter, absencesTypesState, setAbsencesTypesState };
}
