import React, { useMemo } from "react";
import {
  Avatar,
  Card,
  CardActionArea,
  Stack,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { Employee } from "../api/types/types";

interface EmployeeCardProps {
  employee: Employee;
}

const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = (hash & 0x00ffffff).toString(16).toUpperCase();
  return `#${"00000".substring(0, 6 - color.length) + color}`;
};

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee: { name: name, personalPhoto: photo, department: department, uri },
}) => {
  const avatarColor = useMemo(() => stringToColor(name), [name]);
  const photoSrc = photo
    ? `data:image/jpeg;base64,${photo}`
    : null;

  return (
    <Box
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
              src={photoSrc ?? undefined}
              sx={{
                width: 40,
                height: 40,
                bgcolor: photoSrc ? "transparent" : avatarColor,
                fontSize: 18,
              }}
            >
              {!photoSrc && name[0]}
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
    </Box>
  );
};
