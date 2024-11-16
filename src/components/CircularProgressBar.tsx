import {
  CircularProgressProps,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "white", fontSize: "0.6rem" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;