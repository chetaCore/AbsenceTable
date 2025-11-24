import React, { useState } from 'react';
import { AbsenceType } from "../../api/types/types";
import { CACHE_FILTER_SID } from '../../constants';
import { CacheController } from '../../tools/CacheController';

export function useAbsenceFilter() {
  const [filterState, setFilterState] = useState<number[]>(() => {
    return CacheController.load<number[]>(CACHE_FILTER_SID) || [];
  });

  const setFilter = (newFilter: number[]) => {
    setFilterState(newFilter);
    CacheController.save(CACHE_FILTER_SID, newFilter);
  };

  const [absencesTypesState, setAbsencesTypesState] = useState<Record<AbsenceType, boolean>>({
    [AbsenceType.Vacation]: true,
    [AbsenceType.SickLeave]: true,
    [AbsenceType.JobDeparture]: true,
    [AbsenceType.LeaveOfAbs4h]: true,
    [AbsenceType.RemoteWork]: true,
    [AbsenceType.BusinessTripOut]: true,
  });

  return { filter: filterState, setFilter, absencesTypesState, setAbsencesTypesState };
}

