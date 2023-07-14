import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";

// Inspired by the former Facebook spinners.
export default function FacebookCircularProgress(props: CircularProgressProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}
