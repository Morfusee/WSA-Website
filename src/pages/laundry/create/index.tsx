import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  colors,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../../utils/Colors";
import { useBoundStore } from "../../../utils/store";
import { ILaundry } from "../../../interfaces/ILaundry";
import { toLocaleDateStringOptions } from "../../../utils/DateFormat";

function CreateLaundry() {
  const { createLaundryItem } = useBoundStore();
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/laundry");
  };

  const handleAddClick = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the form from submitting
    e.preventDefault();

    // Get the form data
    const formData = new FormData(e.currentTarget);

    const dateObject = new Date(formData.get("date") as string);

    const laundryPayload: ILaundry = {
      id: new Date().getTime(),
      session_name: formData.get("name") as string,
      session_date: dateObject.toLocaleDateString(
        undefined,
        toLocaleDateStringOptions
      ),
      laundry_items: [],
    };

    createLaundryItem(laundryPayload);

    handleCancelClick();
  };

  return (
    <Container
      maxWidth="md"
      className="flex flex-col gap-4 p-5 overflow-y-auto"
    >
      <h1 className="text-xl font-bold text-gray-300 opacity-85">
        Create Laundry Session
      </h1>
      <form className="flex flex-col gap-2.5" onSubmit={handleAddClick}>
        <TextField
          name="name"
          label="Name"
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "0.75rem",
            },
          }}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="date"
            label="Date Sent Out"
            slotProps={{
              mobilePaper: {
                sx: {
                  backgroundColor: Colors.primary.dark,
                  color: "white",
                  "& .Mui-selected": {
                    backgroundColor: Colors.primary.main,
                    color: "white",
                  },
                },
              },
              desktopPaper: {
                sx: {
                  backgroundColor: Colors.primary.dark,
                  color: "white",
                  "& .Mui-selected": {
                    backgroundColor: Colors.primary.main,
                    color: "white",
                  },
                },
              },
              day: {
                sx: {
                  color: "white",
                },
              },
              leftArrowIcon: {
                sx: {
                  color: "white",
                },
              },
              rightArrowIcon: {
                sx: {
                  color: "white",
                },
              },
              layout: {
                sx: {
                  "& .MuiDayCalendar-weekDayLabel": {
                    color: Colors.primary.main,
                  },
                  // Change the dropdown icon
                  "& .MuiSvgIcon-root": {
                    color: Colors.primary.main,
                  },
                },
              },
              toolbar: {
                sx: {
                  backgroundColor: colors.grey[900],
                  color: "white",
                  "& .MuiTypography-root": {
                    color: Colors.primary.main,
                  },
                },
              },
              dialog: {
                sx: {
                  "& .MuiButton-root": {
                    color: Colors.primary.main,
                  },
                  "& .Mui-selected": {
                    backgroundColor: Colors.primary.main,
                    color: "white",
                  },
                },
              },
            }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "0.75rem",
                color: "white",
              },
            }}
          />
        </LocalizationProvider>
        <Box className="flex gap-2 ml-auto">
          <Button
            sx={{
              padding: "0.5rem 1.5rem",
              width: "fit-content",
              backgroundColor: "primary.main",
              color: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.dark",
                color: "primary.main",
              },
            }}
            type="submit"
          >
            Add
          </Button>
          <Button
            sx={{
              padding: "0.5rem 1.5rem",
              width: "fit-content",
            }}
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default CreateLaundry;
