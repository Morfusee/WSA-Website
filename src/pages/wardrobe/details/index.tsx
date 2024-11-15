import {
  Box,
  Button,
  colors,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import logo from "../../../assets/images/logo.png";
import { ArrowBack, Delete, Edit } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ClothingCategory, IWardrobe } from "../../../interfaces/IWardrobe";
import TopImage from "../../../assets/images/top.png";
import BottomImage from "../../../assets/images/bottoms.png";
import UndergarmentImage from "../../../assets/images/undergarments.png";
import { useBoundStore } from "../../../utils/store";
import { toLocaleDateStringOptions } from "../../../utils/DateFormat";
import ReusableDialog from "../../../components/ReusableDialog";

function Details() {
  const { wardrobeItems, deleteWardrobeItem } = useBoundStore();

  const [editMode, setEditMode] = useState<boolean>(false);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const location = useLocation();

  const WardrobeItem = wardrobeItems.find(
    (item) => item.id === +location.pathname.split("/")[2]
  );

  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  if (WardrobeItem === undefined) {
    return <div>Item doesn't exist</div>;
  }

  const handleImagePlaceholder = (category: ClothingCategory) => {
    switch (category) {
      case "Top":
        return TopImage;
      case "Bottom":
        return BottomImage;
      case "Undergarments":
        return UndergarmentImage;
      default:
        return logo;
    }
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const deleteItem = (id: number) => {
    deleteWardrobeItem(id);
    setIsDialogOpen(false);
    navigate("/wardrobe");
  };

  return (
    <Container
      maxWidth="sm"
      className="flex flex-col gap-4 p-5 overflow-y-auto"
    >
      <span className="flex gap-2 items-center">
        <IconButton className="w-fit" onClick={handleClickBack}>
          <ArrowBack />
        </IconButton>
        <h1 className="font-semibold text-lg text-gray-300 tracking-wide">
          Details
        </h1>
      </span>
      <EditModeSwitcher showChildren={!editMode}>
        <img
          src={handleImagePlaceholder(WardrobeItem.clothing_category)}
          alt="logo"
          className="bg-primary-dark shadow-sm p-2 rounded-md max-h-56 object-contain"
        />
        <section className="bg-primary-dark shadow-sm p-5 rounded-md flex flex-col gap-2">
          <div className="flex justify-between">
            <div>
              <h1 className="font-semibold text-xl">{WardrobeItem.name}</h1>
              <span className="flex gap-2 items-center text-sm">
                <h2 className="">{WardrobeItem.clothing_category}</h2>
                <span className="size-1 bg-gray-300 rounded-full" />
                <h2 className="">{WardrobeItem.status}</h2>
              </span>
            </div>
            <div className="flex gap-2.5">
              <IconButton className="size-8" onClick={toggleEditMode}>
                <Edit htmlColor="white" fontSize="small" />
              </IconButton>
              <IconButton className="size-8" onClick={toggleDialog}>
                <Delete htmlColor="white" fontSize="small" />
              </IconButton>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between gap-1.5 flex-wrap">
            <InfoHeirarchy
              title="Previous Session"
              value={WardrobeItem.previous_session}
            />
            <InfoHeirarchy
              title="Last Washed"
              value={WardrobeItem.last_washed}
            />
            <InfoHeirarchy title="Date Added" value={WardrobeItem.date_added} />
          </div>
          <Divider />
          <span className="flex flex-col text-sm">
            <h2 className="text-lg">Description</h2>
            <p className="text-gray-300">
              {WardrobeItem.description === ""
                ? "No description available"
                : WardrobeItem.description}
            </p>
          </span>
        </section>
      </EditModeSwitcher>
      <EditModeSwitcher showChildren={editMode}>
        <EditModeComponent
          WardrobeItem={WardrobeItem}
          setEditMode={setEditMode}
        />
      </EditModeSwitcher>
      <ReusableDialog
        isDialogOpen={isDialogOpen}
        dialogAction={toggleDialog}
        dialogTitle="Delete Item"
        dialogContentText="Are you sure you want to delete this item?"
        handleConfirm={() => deleteItem(WardrobeItem.id)}
        handleCancel={() => setIsDialogOpen(false)}
      />
    </Container>
  );
}

function EditModeSwitcher({
  showChildren,
  children,
}: {
  showChildren: boolean;
  children: React.ReactNode;
}) {
  return showChildren ? <>{children}</> : null;
}

function EditModeComponent({
  WardrobeItem,
  setEditMode,
}: {
  WardrobeItem: IWardrobe;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { updateWardrobeItem } = useBoundStore();

  const [category, setCategory] = useState<string>(
    WardrobeItem.clothing_category
  );

  const untoggleEditMode = () => {
    setEditMode(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the form from submitting
    e.preventDefault();

    // Get the form data
    const formData = new FormData(e.currentTarget);

    const wardrobePayload = {
      id: WardrobeItem.id,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      clothing_category: formData.get("category") as string,
      date_added: WardrobeItem.date_added,
      last_washed: WardrobeItem.last_washed,
      previous_session: WardrobeItem.previous_session,
      status: WardrobeItem.status,
    } as IWardrobe;

    updateWardrobeItem(WardrobeItem.id, wardrobePayload);

    untoggleEditMode();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-primary-dark shadow-sm p-5 rounded-md flex flex-col gap-4"
    >
      <TextField
        label="Name"
        defaultValue={WardrobeItem.name}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "0.75rem",
          },
        }}
        required
        name="name"
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
          defaultValue={WardrobeItem.clothing_category}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <MenuItem value={"Top"}>Top</MenuItem>
          <MenuItem value={"Bottom"}>Bottom</MenuItem>
          <MenuItem value={"Undergarments"}>Undergarments</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Description"
        defaultValue={WardrobeItem.description}
        multiline
        rows={4}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "0.75rem",
          },
        }}
        name="description"
      />
      <Box className="flex gap-2 ml-auto">
        <Button
          sx={{
            padding: "0.5rem 1.5rem",
            width: "fit-content",
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "background.default",
              color: "primary.main",
            },
          }}
          type="submit"
        >
          Update
        </Button>
        <Button
          sx={{
            padding: "0.5rem 1.5rem",
            width: "fit-content",
          }}
          onClick={untoggleEditMode}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
}

function InfoHeirarchy({ title, value }: { title: string; value: string }) {
  return (
    <span className="flex flex-col text-sm">
      <h2 className="text-lg">{title}</h2>
      <h3 className="text-gray-300">{value}</h3>
    </span>
  );
}

export default Details;
