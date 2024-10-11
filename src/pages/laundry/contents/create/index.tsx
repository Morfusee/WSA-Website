import { ArrowBack, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";
import TypeButtonGroup from "../../../../components/TypeButtonGroup";
import { useMemo, useState } from "react";
import { ClothingCategory, IWardrobe } from "../../../../interfaces/IWardrobe";
import { useBoundStore } from "../../../../utils/store";
import TopImage from "../../../../assets/images/top.png";
import BottomImage from "../../../../assets/images/bottoms.png";
import UndergarmentImage from "../../../../assets/images/undergarments.png";
import { ILaundry } from "../../../../interfaces/ILaundry";

function AddContents() {
  const {
    laundryItems,
    wardrobeItems,
    updateLaundryItemWithProperty,
    updateWardrobeItemWithProperty,
  } = useBoundStore();

  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClickBack = () => {
    navigate(location.pathname.replace("/add", ""));
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const sessionId = location.pathname.split("/")[2];

  const sessionData = laundryItems.find(
    (item) => item.id.toString() === sessionId
  );

  const filteredWardrobeItems = wardrobeItems.filter(
    (wardrobeItem) => wardrobeItem.status === "Available"
  );

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

  const wardrobeItemsMemo = useMemo(() => {
    const category = searchParams.get("category");
    const isAscending = searchParams.has("sort");
    const searchQuery = searchParams.get("search");

    const items = category
      ? handleFilter(filteredWardrobeItems, category, "clothing_category")
      : filteredWardrobeItems;

    // This sort of acts as a guard clause for the search query
    const searchedItems = searchQuery
      ? handleFilter(items, searchQuery, "name")
      : items;

    return isAscending
      ? handleAscendingSort(searchedItems)
      : handleDescendingSort(searchedItems);
  }, [searchParams, filteredWardrobeItems]);

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

  const handleWardrobeAndLaundryChange = (
    targetIdLaundry: number,
    targetIdWardrobe: number,
    laundryItemsValue: ILaundry["laundry_items"],
    statusValue: IWardrobe["status"],
    previousSessionValue: IWardrobe["previous_session"]
  ) => {
    updateLaundryItemWithProperty(
      targetIdLaundry,
      "laundry_items",
      laundryItemsValue
    );
    updateWardrobeItemWithProperty(targetIdWardrobe, "status", statusValue);
    updateWardrobeItemWithProperty(
      targetIdWardrobe,
      "previous_session",
      previousSessionValue
    );
  };

  const addSelectedCards = () => {
    if (!sessionData) return;

    selectedCards.forEach((id, x, arr) => {
      handleWardrobeAndLaundryChange(
        sessionData.id as number,
        id,
        [...sessionData.laundry_items, ...arr], // Fuck it
        "In Laundry",
        sessionData.session_name
      );
    });

    handleClickBack();
  };

  return (
    <Container
      maxWidth="lg"
      className="flex flex-col gap-4 p-5 overflow-y-auto"
    >
      <span className="flex gap-2 items-center">
        <IconButton className="w-fit" onClick={handleClickBack}>
          <ArrowBack />
        </IconButton>
        <h1 className="font-semibold text-lg text-gray-300 tracking-wide">
          Add Items to Laundry
        </h1>
      </span>
      <section className="flex flex-col gap-2">
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
        <div className="flex justify-between flex-wrap gap-y-2">
          <span className="flex gap-1 overflow-y-auto">
            <TypeButtonGroup />
          </span>
          <Box className="flex gap-2">
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
              onClick={addSelectedCards}
            >
              Add
            </Button>
            <Button
              sx={{
                padding: "0.5rem 1.5rem",
                width: "fit-content",
              }}
              onClick={handleClickBack}
            >
              Cancel
            </Button>
          </Box>
        </div>
      </section>
      <section className="flex flex-col gap-1.5">
        {wardrobeItemsMemo.map((item, index) => (
          <ClothesCard
            clothing_category={item.clothing_category}
            description={item.description}
            name={item.name}
            status={item.status}
            id={item.id}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            key={index}
          />
        ))}
      </section>
    </Container>
  );
}

function ClothesCard({
  id,
  name,
  clothing_category,
  status,
  description,
  selectedCards,
  setSelectedCards,
}: Omit<IWardrobe, "last_washed" | "date_added" | "previous_session"> & {
  selectedCards: number[];
  setSelectedCards: React.Dispatch<React.SetStateAction<number[]>>;
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

  const handleCardClick = (id: number) => {
    if (selectedCards.includes(id)) {
      setSelectedCards((prev) => prev.filter((item) => item !== id));
      return;
    }

    setSelectedCards((prev) => [...prev, id]);
  };

  return (
    <div
      onClick={() => handleCardClick(id)}
      className={
        "flex px-4 py-2 rounded-md items-center gap-4 hover:cursor-pointer hover:bg-gray-600 " +
        (selectedCards.includes(id) ? "bg-gray-600" : "bg-primary-dark")
      }
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
    </div>
  );
}

export default AddContents;
