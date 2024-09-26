import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { colors } from "@mui/material";
import { Colors as ColorPalette } from "../utils/Colors";

const styling = {
    "& .MuiInputBase-root": {
      borderRadius: "0.5rem",
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: ColorPalette.primary.main,
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: ColorPalette.primary.light,
    },
    // For hovering the input
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: ColorPalette.primary.light,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: ColorPalette.primary.main, color: "white" },
      "&:hover fieldset": {
        borderColor: ColorPalette.primary.main,
        color: "white",
      },
      "& .Mui-focused fieldset": {
        borderColor: ColorPalette.primary.main,
        color: "white",
      },
    },
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: colors.grey[500],
    },
  };

const CustomUnderlineField = styled(TextField)({
  ...styling,
  "& label": {
    color: colors.grey[400],
  },
  "& label.Mui-focused": {
    color: colors.grey[500],
  },
  "& .MuiSvgIcon-root": {
    color: ColorPalette.primary.main,
  },
});

export default CustomUnderlineField;
