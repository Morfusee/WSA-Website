import { Add, ArrowBack, Search, Sort } from "@mui/icons-material";
import {
  Button,
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
import { useMemo } from "react";
import TypeButtonGroup from "../../../components/TypeButtonGroup";
import ViewButtonGroup from "../../../components/ViewButtonGroup";

function Contents() {
  const { laundryItems, wardrobeItems } = useBoundStore();

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

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
          {sessionData?.session_name}
        </h1>
      </span>

      <section className="flex flex-col gap-2">
        <span className="flex gap-2">
          <TextField
            placeholder="Search"
            variant="standard"
            className="flex-1"
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
        {laundryItemsMemo.map((item, index) => (
          <ContentsCard
            id={item.id}
            name={item.name}
            clothing_category={item.clothing_category}
            status={item.status}
            description={item.description}
            key={item.id}
          />
        ))}
      </section>
    </Container>
  );
}

function ContentsCard({
  id,
  name,
  clothing_category,
  status,
  description,
}: Omit<IWardrobe, "last_washed" | "date_added" | "previous_session">) {
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
      <CustomSelect id={id} status={status} />
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
      className="ml-auto bg-gray-800 text-primary-light text-sm px-2 py-1 rounded-md min-w-20"
      onChange={handleSelectChange}
      value={status === "Available" ? "Returned" : "Pending"}
    >
      <option value="Pending">Pending</option>
      <option value="Returned">Returned</option>
    </select>
  );
}

export default Contents;
