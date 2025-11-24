import React, { useMemo, useState, useCallback } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { EmployeeCard } from "../../components/EmployeeCard";
import { Employee } from "../../api/types/types";
import {
  Autocomplete,
  TextField,
  Checkbox,
  ListItemText
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useTranslation } from "react-i18next";


interface useEmployeeColumnsProps {
  width: number;
  minWidth: number;
  filter: number[];
  employees: Employee[];
  onFilterChange?: (employeesIds: number[]) => void;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function useEmployeeColumns({
  width,
  minWidth,
  filter,
  employees,
  onFilterChange
}: useEmployeeColumnsProps): GridColDef[] {

  const { t } = useTranslation();

  const allEmployees = employees;

  const handleFilterChange = useCallback(
    (newValues: Employee[]) => {
      const newIds = newValues.map(v => v.id);

      if (onFilterChange) {
        onFilterChange(newIds);
      }
    },
    [onFilterChange]
  );

  const columns = useMemo<GridColDef[]>(() => [
    {
      headerAlign: "center",
      field: "employee",
      width,
      minWidth,
      align: "center",
      cellClassName: "stickyColumn",
      headerClassName: "stickyColumnHeader",
      disableColumnMenu: true,
      sortable: false,
      renderHeader: () => (
        <Autocomplete
          multiple
          disableCloseOnSelect
          options={allEmployees}
          getOptionLabel={(option) => option.name}
          value={employees.filter(e => filter.includes(e.id))} 
          onChange={(_, newValues) => handleFilterChange(newValues)}
          renderValue={() => null}
          renderOption={(props, option, { selected }) => (
            <li {...props} key={option.id}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              <ListItemText primary={option.name} />
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Сотрудник"
              label={`${t("columns.employees")} (${filter.length < 1 ? employees.length : filter.length})`}
              variant="outlined"
              size="small"
              sx={{
                "& fieldset": { border: "none" },
                "& .MuiInputBase-root": {
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  paddingTop: "4px",
                  paddingBottom: "4px"
                }
              }}
            />
          )}
          noOptionsText="Ничего не нашлось"
          sx={{ width: 300, p: 1 }}
        />
      ),

      renderCell: (params) => {
        if (!params.value) return null;
        return <EmployeeCard employee={params.value} />;
      },

      sortComparator: (a, b) => {
        const nameA = a?.name?.toLowerCase() || "";
        const nameB = b?.name?.toLowerCase() || "";
        return nameA.localeCompare(nameB);
      }
    }
  ], [width, minWidth, allEmployees, filter, handleFilterChange]);

  return columns;
}
