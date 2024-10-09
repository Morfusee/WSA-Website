import { Add, FormatListBulleted, Sort, GridView } from "@mui/icons-material";
import { Container, Fab, IconButton, Pagination } from "@mui/material";
import logo from "../../assets/images/logo.png";
import {
  SetURLSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import TypeButton from "../../components/TypeButton";
import {
  ClothingCategory,
  IWardrobe,
  Status,
} from "../../interfaces/IWardrobe";
import TopImage from "../../assets/images/top.png";
import BottomImage from "../../assets/images/bottoms.png";
import UndergarmentImage from "../../assets/images/undergarments.png";
import { useEffect, useMemo, useState } from "react";
import { useBoundStore } from "../../utils/store";

function Wardrobe() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    wardrobeItems: WardrobeSlice,
    wardrobePageConfig: { formatType },
  } = useBoundStore((state) => state);

  const handleFilter = (filterWord: string) => {
    return WardrobeSlice.filter((item) =>
      item.clothing_category.toLowerCase().includes(filterWord.toLowerCase())
    ) as IWardrobe[];
  };

  const handleAscendingSort = (WardrobeItems: IWardrobe[]) => {
    return WardrobeItems.sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
  };

  const handleDescendingSort = (WardrobeItems: IWardrobe[]) => {
    return WardrobeItems.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  };

  const handleFabClick = () => {
    navigate("/wardrobe/add");
  };

  const WardrobeItems = useMemo(() => {
    const category = searchParams.get("category");
    const isAscending = searchParams.has("sort");

    const items = category ? handleFilter(category) : WardrobeSlice;

    return isAscending
      ? handleAscendingSort(items)
      : handleDescendingSort(items);
  }, [searchParams]);

  return (
    <Container
      maxWidth="lg"
      className="flex flex-col gap-3 p-5 overflow-y-auto"
    >
      <section className="w-full flex justify-between flex-wrap gap-y-2">
        <TypeButtonGroup />
        <ViewButtonGroup
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </section>
      <Pagination shape="rounded" hideNextButton hidePrevButton count={10} />
      <FormatFactory WardrobeItems={WardrobeItems} formatType={formatType} />
      <Fab color="primary" aria-label="add" onClick={handleFabClick}>
        <Add />
      </Fab>
    </Container>
  );
}

function FormatFactory({
  WardrobeItems,
  formatType,
}: {
  WardrobeItems: IWardrobe[];
  formatType: "list" | "grid";
}) {
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/wardrobe/${id}`);
  };

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

  if (formatType === "list") {
    return (
      <section className="flex flex-col gap-2">
        {WardrobeItems.map((data, index) => (
          <WardrobeListCard
            key={data.id}
            id={data.id}
            name={data.name}
            clothing_category={data.clothing_category as ClothingCategory}
            last_washed={data.last_washed}
            status={data.status as Status}
            handleCardClick={handleCardClick}
            handleImagePlaceholder={handleImagePlaceholder}
          />
        ))}
      </section>
    );
  }

  return (
    <section className="flex gap-4 flex-wrap">
      {WardrobeItems.map((data, index) => (
        <WardrobeGridCard
          key={data.id}
          id={data.id}
          name={data.name}
          clothing_category={data.clothing_category as ClothingCategory}
          last_washed={data.last_washed}
          status={data.status as Status}
          handleCardClick={handleCardClick}
          handleImagePlaceholder={handleImagePlaceholder}
        />
      ))}
    </section>
  );
}

function TypeButtonGroup() {
  const clothing_category = [
    "Top",
    "Bottom",
    "Undergarments",
  ] as ClothingCategory[];

  const navigate = useNavigate();
  const location = useLocation();

  const handleTypeButtonClick = (category: ClothingCategory) => {
    if (location.search.includes(category.toLowerCase())) {
      return navigate("/wardrobe");
    }

    navigate(`/wardrobe?category=${category.toLocaleLowerCase()}`);
  };

  const isCategoryActive = (category: ClothingCategory) => {
    return location.search.includes(category.toLowerCase());
  };

  return (
    <section className="flex gap-2 overflow-y-auto">
      {clothing_category.map((category, index) => (
        <TypeButton
          key={index}
          label={category}
          onClick={() => handleTypeButtonClick(category)}
          active={isCategoryActive(category)}
        />
      ))}
    </section>
  );
}

function ViewButtonGroup({
  searchParams,
  setSearchParams,
}: {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}) {
  const { setWardrobePageFormatType, wardrobePageConfig } = useBoundStore();

  const handleSortClick = () => {
    setSearchParams((params) => {
      params.has("sort") ? params.delete("sort") : params.append("sort", "asc");

      return params;
    });
  };

  const handleFormatClick = () => {
    wardrobePageConfig.formatType === "list"
      ? setWardrobePageFormatType("grid")
      : setWardrobePageFormatType("list");
  };

  return (
    <span className="flex gap-2 items-center">
      <IconButton
        sx={{
          "&:hover": {
            backgroundColor: "primary.main",
          },
        }}
        onClick={handleSortClick}
      >
        <Sort
          htmlColor="white"
          sx={{
            transform: searchParams.has("sort")
              ? "rotate(180deg) scaleX(-1)"
              : "rotate(0deg)",
          }}
        />
      </IconButton>
      <IconButton
        sx={{
          "&:hover": {
            backgroundColor: "primary.main",
          },
        }}
        onClick={handleFormatClick}
      >
        {wardrobePageConfig.formatType === "list" ? (
          <GridView htmlColor="white" />
        ) : (
          <FormatListBulleted htmlColor="white" />
        )}
      </IconButton>
    </span>
  );
}

function WardrobeListCard({
  id,
  name,
  clothing_category,
  status,
  last_washed,
  handleCardClick,
  handleImagePlaceholder,
}: Omit<IWardrobe, "description" | "date_added" | "previous_session"> & {
  handleCardClick: (id: number) => void;
  handleImagePlaceholder: (category: ClothingCategory) => string;
}) {
  return (
    <div
      onClick={() => handleCardClick(id)}
      className="flex px-4 py-2 bg-primary-dark rounded-md items-center gap-4 hover:cursor-pointer hover:bg-gray-700"
    >
      <img
        src={handleImagePlaceholder(clothing_category)}
        alt=""
        className="w-14 h-14 min-w-14 min-h-14 p-2 object-contain bg-gray-800 rounded-md"
      />
      <span className="flex flex-col">
        <h1 className="font-semibold line-clamp-1">{name}</h1>
        <span className="text-sm text-white line-clamp-2 flex">
          <div className="flex flex-col">
            <p>{status}</p>
            <span className="flex items-center gap-1.5">
              <p>{clothing_category}</p>
              <span className="size-1 min-w-1 min-h-1 bg-gray-300 rounded-full" />
              <p>{last_washed}</p>
            </span>
          </div>
        </span>
      </span>
    </div>
  );
}

function WardrobeGridCard({
  id,
  name,
  clothing_category,
  status,
  last_washed,
  handleCardClick,
  handleImagePlaceholder,
}: Omit<IWardrobe, "description" | "date_added" | "previous_session"> & {
  handleCardClick: (id: number) => void;
  handleImagePlaceholder: (category: ClothingCategory) => string;
}) {
  return (
    <div
      onClick={() => handleCardClick(id)}
      className="flex flex-col flex-[0_1_100%] md:flex-[0_1_100%] lg:flex-[0_1_48%] xl:flex-[1_1_32%] gap-3 hover:cursor-pointer hover:bg-gray-600 bg-primary-dark p-4 rounded-md"
    >
      <img
        src={handleImagePlaceholder(clothing_category)}
        alt="logo"
        className="bg-gray-800 shadow-sm p-2 rounded-md max-h-56 object-contain"
      />
      <span className="flex flex-col gap-0.5">
        <h1 className="text-gray-200 font-semibold line-clamp-1">{name}</h1>
        <h6 className="text-gray-300 text-sm">{clothing_category}</h6>
        <div className="flex items-center gap-1.5 text-sm">
          <h6 className="text-gray-300">{status}</h6>
          <span className="size-1 min-w-1 min-h-1 bg-gray-300 rounded-full" />
          <h6 className="text-gray-300 line-clamp-1">{last_washed}</h6>
        </div>
      </span>
    </div>
  );
}

export default Wardrobe;
