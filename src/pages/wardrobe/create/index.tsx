import { CloudUpload } from "@mui/icons-material";
import {
  Box,
  Button,
  colors,
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
import CircularProgressBar from "../../../components/CircularProgressBar";
import Undergarment from "../../../assets/images/undergarments.png";

function CreateWardrobe() {
  const { createWardrobeItem } = useBoundStore();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
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

    handleCancelClick();
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
          onChange={(e) => setName(e.target.value)}
          value={name}
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
          onChange={(e) => setDescription(e.target.value)}
          value={description}
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
            required
          >
            <MenuItem value={"Top"}>Top</MenuItem>
            <MenuItem value={"Bottom"}>Bottom</MenuItem>
            <MenuItem value={"Undergarments"}>Undergarments</MenuItem>
          </Select>
        </FormControl>
        <UploadDragDrop
          setName={setName}
          setDescription={setDescription}
          setCategory={setCategory}
        />
        <Box className="flex gap-2 ml-auto">
          <Button
            sx={{
              padding: "0.5rem 1.5rem",
              width: "fit-content",
              backgroundColor: "primary.main",
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

function UploadDragDrop({
  setName,
  setDescription,
  setCategory,
}: {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [progress, setProgress] = useState(10);
  const [isUploading, setIsUploading] = useState(false);
  const [imageName, setImageName] = useState<string>("");

  const MockUploadItem = () => {
    setName("Ben 10 Underwear (AI Generated)");
    setDescription("This is a Ben 10 underwear (AI Generated).");
    setCategory("Undergarments");
    setImageName(Undergarment);
  };

  const startUpload = () => {
    setIsUploading(true);
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 200);

    setTimeout(() => {
      clearInterval(timer);
      setIsUploading(false);
      setProgress(0);
      MockUploadItem();
    }, 2000);
  };

  return (
    <span className="w-full h-44 flex items-center justify-center rounded-md border border-dashed">
      <span className="flex flex-col items-center">
        <UploadDragDropContent
          isUploading={isUploading}
          imageName={imageName}
          progress={progress}
          startUpload={startUpload}
        />
      </span>
    </span>
  );
}

function UploadDragDropContent({
  isUploading,
  imageName,
  progress,
  startUpload,
}: {
  isUploading: boolean;
  imageName: string;
  progress: number;
  startUpload: () => void;
}) {
  if (imageName) {
    return <img src={imageName} alt="Generated Image" />;
  }

  if (isUploading) {
    return <CircularProgressBar value={progress} />;
  }

  return (
    <>
      <IconButton onClick={startUpload}>
        <CloudUpload />
      </IconButton>
      <div className="flex flex-col text-center">
        <h1 className="text-gray-400">Drag and drop your image here</h1>
        <h6 className="text-sm text-gray-500">
          Let AI generate the item's information for you.
          <p className="text-xs text-gray-600">(Just click the icon)</p>
        </h6>
      </div>
    </>
  );
}

export default CreateWardrobe;
