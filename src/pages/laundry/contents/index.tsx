import {
  Add,
  ArrowBack,
  Cancel,
  Delete,
  Edit,
  Search,
  Sort,
} from "@mui/icons-material";
import {
  Box,
  Button,
  colors,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { useBoundStore } from "../../../utils/store";
import { ClothingCategory, IWardrobe } from "../../../interfaces/IWardrobe";
import TopImage from "../../../assets/images/top.png";
import BottomImage from "../../../assets/images/bottoms.png";
import UndergarmentImage from "../../../assets/images/undergarments.png";
import { useMemo, useState } from "react";
import TypeButtonGroup from "../../../components/TypeButtonGroup";
import ViewButtonGroup from "../../../components/ViewButtonGroup";
import { ILaundry } from "../../../interfaces/ILaundry";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Colors } from "../../../utils/Colors";
import dayjs from "dayjs";
import EditModeSwitcher from "../../../components/EditModeSwitcher";
import ReusableDialog from "../../../components/ReusableDialog";
import { toLocaleDateStringOptions } from "../../../utils/DateFormat";

function Contents() {
  const { laundryItems, wardrobeItems } = useBoundStore();

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const sessionId = location.pathname.split("/")[2];

  const sessionData = laundryItems.find(
    (item) => item.id.toString() === sessionId
  );

  const fetchedLaundryItems = wardrobeItems.filter((wardrobeItem) =>
    sessionData?.laundry_items.some((id) => wardrobeItem.id == id)
  );

  const handleClickBack = () => {
    navigate(`/laundry`);
  };

  const handleClickAdd = () => {
    navigate(`${location.pathname}/add`);
  };

  const handleFilter = (
    items: IWardrobe[],
    filterWord: string,
    key: keyof Omit<IWardrobe, "id">
  ) => {
    return items.filter((item) =>
      item[key].toLowerCase().includes(filterWord.toLowerCase())
    ) as IWardrobe[];
  };

  const handleAscendingSort = (items: IWardrobe[]) => {
    return items.sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
  };

  const handleDescendingSort = (items: IWardrobe[]) => {
    return items.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  };

  const laundryItemsMemo = useMemo(() => {
    const category = searchParams.get("category");
    const isAscending = searchParams.has("sort");
    const searchQuery = searchParams.get("search");

    const items = category
      ? handleFilter(fetchedLaundryItems, category, "clothing_category")
      : fetchedLaundryItems;

    // This sort of acts as a guard clause for the search query
    const searchedItems = searchQuery
      ? handleFilter(items, searchQuery, "name")
      : items;

    return isAscending
      ? handleAscendingSort(searchedItems)
      : handleDescendingSort(searchedItems);
  }, [searchParams, fetchedLaundryItems]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((params) => {
      if (e.target.value === "") {
        params.delete("search");
        return params;
      }
      params.set("search", e.target.value);
      return params;
    });
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <Container
      maxWidth="lg"
      className="flex flex-col gap-4 p-5 overflow-y-auto"
    >
      <div className="flex justify-between items-center">
        <span className="flex gap-2 items-center w-full">
          <IconButton className="w-fit" onClick={handleClickBack}>
            <ArrowBack />
          </IconButton>
          <h1 className="font-semibold text-lg text-gray-300 tracking-wide">
            {sessionData?.session_name}
          </h1>
        </span>
        <EditModeSwitcher showChildren={!isEditing}>
          <IconButton className="size-8" onClick={toggleEditMode}>
            <Edit htmlColor="white" fontSize="small" />
          </IconButton>
        </EditModeSwitcher>
      </div>

      <EditModeSwitcher showChildren={!isEditing}>
        <>
          <section className="flex flex-col gap-2">
            <span className="flex gap-2">
              <TextField
                placeholder="Search"
                variant="standard"
                className="flex-1"
                value={searchParams.get("search") || ""}
                onChange={handleSearch}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search
                          fontSize="small"
                          sx={{
                            color: "#A0AAB4",
                            opacity: 0.5,
                          }}
                        />
                      </InputAdornment>
                    ),
                    sx: {
                      backgroundColor: "primary.dark",
                      borderRadius: 1,
                      px: 1.6,
                      py: 0.3,
                      height: 37,
                      "& .MuiInputBase-input": {
                        color: "#A0AAB4",
                      },
                    },
                    disableUnderline: true,
                  },
                }}
              />
              <Button
                className="flex gap-1.5 items-center"
                sx={{
                  ml: "auto",
                }}
                onClick={handleClickAdd}
              >
                <Add fontSize="small" />
                Add Items
              </Button>
            </span>
            <section className="flex gap-2 overflow-y-auto justify-between">
              <TypeButtonGroup />
              <ViewButtonGroup hideFormatButton />
            </section>
          </section>
          <section className="flex flex-col gap-2">
            {laundryItemsMemo.length === 0 && (
              <div className="flex justify-center items-center gap-2 p-5 rounded-md">
                <h1 className="font-semibold text-gray-400">No items found</h1>
              </div>
            )}

            {laundryItemsMemo.map((item, index) => (
              <ContentsCard
                id={item.id}
                name={item.name}
                clothing_category={item.clothing_category}
                status={item.status}
                description={item.description}
                key={item.id}
              >
                <CustomSelect id={item.id} status={item.status} />
              </ContentsCard>
            ))}
          </section>
        </>
      </EditModeSwitcher>
      <EditModeSwitcher showChildren={isEditing}>
        <EditModeComponent
          laundrySessionInfo={sessionData}
          laundryItems={laundryItemsMemo}
          setEditMode={setIsEditing}
        />
      </EditModeSwitcher>
    </Container>
  );
}

function ContentsCard({
  id,
  name,
  clothing_category,
  status,
  description,
  children,
}: Omit<IWardrobe, "last_washed" | "date_added" | "previous_session"> & {
  children: React.ReactNode;
}) {
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

  return (
    <div
      // onClick={() => handleCardClick(id)}
      className="flex px-4 py-2 bg-primary-dark rounded-md items-center gap-4"
    >
      <img
        src={handleImagePlaceholder(clothing_category)}
        alt=""
        className="w-14 h-14 min-w-14 min-h-14 p-2 object-contain bg-gray-800 rounded-md"
      />
      <span className="flex flex-col">
        <h1 className="font-semibold line-clamp-1">{name}</h1>
        <span className="text-sm text-white line-clamp-1 flex">
          <div className="flex flex-col">
            <p>{status}</p>
            <span className="flex items-center gap-1.5">
              <p>{clothing_category}</p>
              <span className="size-1 min-w-1 min-h-1 bg-gray-300 rounded-full" />
              <p className="line-clamp-1">{description}</p>
            </span>
          </div>
        </span>
      </span>
      {children}
    </div>
  );
}

function CustomSelect({
  id,
  status,
}: Omit<
  IWardrobe,
  | "name"
  | "description"
  | "clothing_category"
  | "date_added"
  | "last_washed"
  | "previous_session"
>) {
  const { updateWardrobeItemWithProperty, laundryItems } = useBoundStore();
  const location = useLocation();

  const handleWardrobeChange = (
    targetId: number,
    statusValue: IWardrobe["status"],
    previousSessionValue: IWardrobe["previous_session"]
  ) => {
    updateWardrobeItemWithProperty(targetId, "status", statusValue);
    updateWardrobeItemWithProperty(
      targetId,
      "previous_session",
      previousSessionValue
    );
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sessionData = laundryItems.find(
      (item) => item.id.toString() === location.pathname.split("/")[2]
    );

    if (!sessionData) return;

    if (e.target.value === "Pending") {
      handleWardrobeChange(id, "In Laundry", sessionData.session_name);
      return;
    }

    return handleWardrobeChange(id, "Available", sessionData.session_name);
  };

  return (
    <select
      name="CustomSelect"
      id="CustomSelect"
      className="ml-auto bg-gray-800 text-primary-light text-sm px-2 py-1 rounded-md min-w-28"
      onChange={handleSelectChange}
      value={status === "Available" ? "Returned" : "Pending"}
    >
      <option value="Pending">Pending</option>
      <option value="Returned">Returned</option>
    </select>
  );
}

function EditModeComponent({
  laundrySessionInfo,
  laundryItems,
  setEditMode,
}: {
  laundrySessionInfo: ILaundry | undefined;
  laundryItems: IWardrobe[];
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { updateLaundryItem } = useBoundStore();
  const [itemsToRemove, setItemsToRemove] = useState<IWardrobe[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [updatedInfo, setUpdatedInfo] = useState<
    Omit<ILaundry, "laundry_items">
  >({
    id: laundrySessionInfo!.id,
    session_name: laundrySessionInfo!.session_name,
    session_date: laundrySessionInfo!.session_date,
  });

  const untoggleEditMode = () => {
    setEditMode(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the form from submitting
    e.preventDefault();

    // Get the form data
    const formData = new FormData(e.currentTarget);

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    const dateObject = new Date(formData.get("date") as string);

    setUpdatedInfo({
      id: laundrySessionInfo!.id,
      session_name: formData.get("name") as string,
      session_date: dateObject.toLocaleDateString(
        undefined,
        toLocaleDateStringOptions
      ),
    });

    toggleDialog();
  };

  const laundryItemsMemo = useMemo(() => {
    if (itemsToRemove.length === 0) return laundryItems;

    return laundryItems.filter((item) => {
      return !itemsToRemove.some((removeItem) => removeItem.id === item.id);
    });
  }, [laundryItems, laundrySessionInfo, itemsToRemove]);

  const handleDelete = (item: IWardrobe) => {
    setItemsToRemove((prev) => [...prev, item]);
  };

  const handleCancelDelete = (item: IWardrobe) => {
    setItemsToRemove((prev) =>
      prev.filter((prevItem) => prevItem.id !== item.id)
    );
  };

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleConfirmation = () => {
    const updateLaundryItemsList = laundryItems.filter(
      (item) => !itemsToRemove.some((removeItem) => removeItem.id === item.id)
    );

    updateLaundryItem(laundrySessionInfo!.id, {
      id: updatedInfo.id,
      session_name: updatedInfo.session_name,
      session_date: updatedInfo.session_date,
      laundry_items: updateLaundryItemsList.map((item) => item.id),
    });

    untoggleEditMode();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="bg-primary-dark shadow-sm p-5 rounded-md flex flex-col gap-4">
        <TextField
          name="name"
          label="Name"
          defaultValue={laundrySessionInfo?.session_name}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "0.75rem",
            },
          }}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            defaultValue={dayjs(laundrySessionInfo?.session_date)}
            name="date"
            label="Date Sent Out"
            slotProps={{
              textField: {
                required: true,
              },
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
              "&:hover": {
                backgroundColor: "primary.dark",
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
      </div>
      <section className="w-full border-2 min-h-20 p-5 flex flex-col gap-4 rounded-md border-gray-400 border-dashed">
        <h1 className="font-semibold tracking-wide text-sm text-gray-400">
          Items to be removed ({itemsToRemove.length})
        </h1>
        <section className="flex flex-col gap-2">
          {itemsToRemove.map((item, index) => (
            <ContentsCard
              id={item.id}
              name={item.name}
              clothing_category={item.clothing_category}
              status={item.status}
              description={item.description}
              key={item.id}
            >
              <CustomAddButton
                item={item}
                handleCancelDelete={handleCancelDelete}
              />
            </ContentsCard>
          ))}
        </section>
      </section>
      <section className="flex flex-col gap-2">
        {laundryItemsMemo.map((item, index) => (
          <ContentsCard
            id={item.id}
            name={item.name}
            clothing_category={item.clothing_category}
            status={item.status}
            description={item.description}
            key={item.id}
          >
            <CustomDeleteButton
              item={item}
              handleDelete={() => handleDelete(item)}
            />
          </ContentsCard>
        ))}
      </section>
      <ReusableDialog
        isDialogOpen={isDialogOpen}
        dialogAction={toggleDialog}
        dialogTitle={"Update Laundry Session"}
        dialogContentText={
          "Are you sure you want to update the laundry session? This would also delete the items you've selected."
        }
        handleConfirm={handleConfirmation}
        handleCancel={toggleDialog}
      />
    </form>
  );
}

function CustomAddButton({
  item,
  handleCancelDelete,
}: {
  item: IWardrobe;
  handleCancelDelete: (item: IWardrobe) => void;
}) {
  return (
    <IconButton
      onClick={() => handleCancelDelete(item)}
      className="bg-danger text-white"
      sx={{
        ml: "auto",
      }}
    >
      <Cancel htmlColor={colors.grey[300]} />
    </IconButton>
  );
}

function CustomDeleteButton({
  item,
  handleDelete,
}: {
  item: IWardrobe;
  handleDelete: (item: IWardrobe) => void;
}) {
  return (
    <IconButton
      onClick={() => handleDelete(item)}
      className="bg-danger text-white"
      sx={{
        ml: "auto",
      }}
    >
      <Delete htmlColor={colors.grey[300]} />
    </IconButton>
  );
}

export default Contents;
