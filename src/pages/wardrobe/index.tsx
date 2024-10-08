import { Add, FormatListBulleted, Sort } from "@mui/icons-material";
import { Container, Fab, IconButton, Pagination } from "@mui/material";
import logo from "../../assets/images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import TypeButton from "../../components/TypeButton";
import WardrobeData from "../../assets/data/wardrobe_data.json";
import {
  ClothingCategory,
  IWardrobe,
  Status,
} from "../../interfaces/IWardrobe";
import TopImage from "../../assets/images/top.png";
import BottomImage from "../../assets/images/bottoms.png";
import UndergarmentImage from "../../assets/images/undergarments.png";
import { useEffect, useState } from "react";

function Wardrobe() {
  const [WardrobeItems, setWardrobeItems] = useState<IWardrobe[]>(
    WardrobeData as IWardrobe[]
  );

  const location = useLocation();

  useEffect(() => {
    if (!location.search) {
      return setWardrobeItems(WardrobeData as IWardrobe[]);
    }

    const filterWord = location.search.split("?")[1];
    setWardrobeItems(handleFilter(filterWord));
  }, [location.search]);

  const handleFilter = (filterWord: string) => {
    return WardrobeData.filter((item) =>
      item.clothing_category.toLowerCase().includes(filterWord.toLowerCase())
    ) as IWardrobe[];
  };

  const navigate = useNavigate();
  const handleFabClick = () => {
    navigate("/wardrobe/add");
  };

  return (
    <Container
      maxWidth="lg"
      className="flex flex-col gap-3 p-5 overflow-y-auto"
    >
      <section className="w-full flex justify-between flex-wrap gap-y-2">
        <TypeButtonGroup />
        <ViewButtonGroup />
      </section>
      <Pagination shape="rounded" hideNextButton hidePrevButton count={10} />
      <section className="flex gap-4 flex-wrap">
        {WardrobeItems.map((data, index) => (
          <WardrobeCard
            key={data.id}
            id={data.id}
            name={data.name}
            clothing_category={data.clothing_category as ClothingCategory}
            last_washed={data.last_washed}
            status={data.status as Status}
          />
        ))}
      </section>
      <Fab color="primary" aria-label="add" onClick={handleFabClick}>
        <Add />
      </Fab>
    </Container>
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
    
    navigate(`/wardrobe?${category.toLocaleLowerCase()}`);
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

function ViewButtonGroup() {
  return (
    <span className="flex gap-2 items-center">
      <IconButton
        sx={{
          "&:hover": {
            backgroundColor: "primary.main",
          },
        }}
      >
        <Sort htmlColor="white" />
      </IconButton>
      <IconButton
        sx={{
          "&:hover": {
            backgroundColor: "primary.main",
          },
        }}
      >
        <FormatListBulleted htmlColor="white" />
      </IconButton>
    </span>
  );
}

function WardrobeCard({
  id,
  name,
  clothing_category,
  status,
  last_washed,
}: Omit<IWardrobe, "description" | "date_added" | "previous_session">) {
  const navigate = useNavigate();

  const handleCardClick = () => {
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

  return (
    <div
      onClick={handleCardClick}
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
