import { useCallback } from "react";
import { RequestResult } from "../../api/api";
import { CreateAbsenceDTO, RemoveAbsenceDTO, EditAbsenceDTO } from "../../api/dto";
import { createAbsence as apiCreate, removeAbsence as apiRemove, editAbsence as apiEdit } from "../../api/odata";

interface UseAbsenceActionsResult {
  createAbsence?: (data: CreateAbsenceDTO) => Promise<RequestResult>;
  removeAbsence?: (data: RemoveAbsenceDTO) => Promise<RequestResult>;
  editAbsence?: (data: EditAbsenceDTO) => Promise<RequestResult>;
}

export function useAbsenceActions(
  canUseToolbar: boolean,
  onRefresh: () => Promise<void>
): UseAbsenceActionsResult {

  const createAbsenceFn = useCallback(async (data: CreateAbsenceDTO) => {
    const result = await apiCreate(data);
    if (result.success && !result.data?.error) {
      await onRefresh();
      return result;
    }

    throw Error(result.data?.error);

  }, [onRefresh]);

  const removeAbsenceFn = useCallback(async (data: RemoveAbsenceDTO) => {
    const result = await apiRemove(data);
    if (result.success && !result.data?.error) {
      await onRefresh();
      return result;
    }

    throw Error(result.data?.error);
  }, [onRefresh]);

  const editAbsenceFn = useCallback(async (data: EditAbsenceDTO) => {
    const result = await apiEdit(data);
    if (result.success && !result.data?.error) {
      await onRefresh();
      return result;
    }

    throw Error(result.data?.error);
  }, [onRefresh]);

  return {
    createAbsence: canUseToolbar ? createAbsenceFn : undefined,
    removeAbsence: canUseToolbar ? removeAbsenceFn : undefined,
    editAbsence: canUseToolbar ? editAbsenceFn : undefined,
  };
}
