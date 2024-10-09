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
import { useBoundStore } from "../../../utils/store";
import { useState } from "react";
import { IWardrobe } from "../../../interfaces/IWardrobe";
import { toLocaleDateStringOptions } from "../../../utils/DateFormat";

function CreateWardrobe() {
  const { createWardrobeItem } = useBoundStore();
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/wardrobe");
  };

  const handleAddClick = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the form from submitting
    e.preventDefault();

    // Get the form data
    const formData = new FormData(e.currentTarget);

    formData.forEach((value, key) => console.log({ [key]: value }));

    const wardrobePayload = {
      id: new Date().getTime(),
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      clothing_category: formData.get("category") as string,
      date_added: new Date().toLocaleDateString(
        undefined,
        toLocaleDateStringOptions
      ),
      last_washed: "N/A",
      previous_session: "N/A",
      status: "Available",
    } as IWardrobe;

    createWardrobeItem(wardrobePayload);
  };

  return (
    <Container
      maxWidth="md"
      className="flex flex-col gap-4 p-5 overflow-y-auto"
    >
      <h1 className="text-xl font-bold text-gray-300 opacity-85">
        Add Clothes
      </h1>
      <form className="flex flex-col gap-2.5" onSubmit={handleAddClick}>
        <TextField
          label="Name"
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "0.75rem",
            },
          }}
          required
          name="name"
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
          name="description"
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
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
