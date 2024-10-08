import { Container, Divider, IconButton } from "@mui/material";
import logo from "../../../assets/images/logo.png";
import { ArrowBack, Edit } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import WardrobeData from "../../../assets/data/wardrobe_data.json";
import { useState } from "react";
import { ClothingCategory, IWardrobe } from "../../../interfaces/IWardrobe";
import TopImage from "../../../assets/images/top.png";
import BottomImage from "../../../assets/images/bottoms.png";
import UndergarmentImage from "../../../assets/images/undergarments.png";

function Details() {
  const [WardrobeItems, setWardrobeItems] = useState<IWardrobe[]>(
    WardrobeData as IWardrobe[]
  );

  const location = useLocation();

  const WardrobeItem = WardrobeItems.find(
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
          <IconButton className="size-8">
            <Edit htmlColor="white" fontSize="small" />
          </IconButton>
        </div>
        <Divider />
        <div className="flex justify-between gap-1.5 flex-wrap">
          <InfoHeirarchy
            title="Previous Session"
            value={WardrobeItem.previous_session}
          />
          <InfoHeirarchy title="Last Washed" value={WardrobeItem.last_washed} />
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
    </Container>
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
