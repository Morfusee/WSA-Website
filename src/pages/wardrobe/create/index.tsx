import { CloudUpload } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function CreateWardrobe() {
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/wardrobe");
  };
  
  return (
    <Container
      maxWidth="md"
      className="flex flex-col gap-4 p-5 overflow-y-auto"
    >
      <h1 className="text-xl font-bold text-gray-300 opacity-85">
        Add Clothes
      </h1>
      <section className="flex flex-col gap-2.5">
        <TextField
          label="Name"
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "0.75rem",
            },
          }}
          required
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "0.75rem",
            },
          }}
        />
        <FormControl>
          <InputLabel>Clothing Category</InputLabel>
          <Select
            label="Clothing Category"
            sx={{
              "& fieldset.MuiOutlinedInput-notchedOutline": {
                borderRadius: "0.75rem",
              },
            }}
          >
            <MenuItem value={"Top"}>Top</MenuItem>
            <MenuItem value={"Bottom"}>Bottom</MenuItem>
            <MenuItem value={"Undergarments"}>Undergarments</MenuItem>
          </Select>
        </FormControl>
        <UploadDragDrop />
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
      </section>
    </Container>
  );
}

function UploadDragDrop() {
  return (
    <span className="w-full h-44 flex items-center justify-center rounded-md border border-dashed">
      <span className="flex gap-2 items-center">
        <h1 className="text-gray-400">Drag and drop your image here</h1>
        <IconButton>
          <CloudUpload />
        </IconButton>
      </span>
    </span>
  );
}

export default CreateWardrobe;
