import React, { useMemo } from "react";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { Employee } from "../types";

interface EmployeeCardProps {
  employee: Employee;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee: { name, icon, department, uri },
}) => {
  const avatarColor = useMemo(() => {
    return `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`;
  }, []); 

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 6,
        },
      }}
    >
      <Card sx={{ borderRadius: 2 }}>
        <CardActionArea
          component="a"
          href={uri}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ p: 1.5 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={name}
              sx={{
                width: 40,
                height: 40,
                bgcolor: avatarColor,
                fontSize: 18,
              }}
            >
              {name[0]}
            </Avatar>

            <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: "#ccc" }} />

            <Stack>
              <Typography
                textAlign="left"
                variant="body1"
                fontWeight={500}
                sx={{ lineHeight: 1.2 }}
              >
                {name}
              </Typography>

              <Typography
                textAlign="left"
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 13 }}
              >
                {department}
              </Typography>
            </Stack>
          </Stack>
        </CardActionArea>
      </Card>
    </Paper>
  );
};
