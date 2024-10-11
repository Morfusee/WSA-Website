import { Container } from "@mui/material";
import welcome_logo from "../../assets/images/welcome.svg";
import logo from "../../assets/images/logo.png";
import { useBoundStore } from "../../utils/store";
import { ClothingCategory, IWardrobe } from "../../interfaces/IWardrobe";
import TopImage from "../../assets/images/top.png";
import BottomImage from "../../assets/images/bottoms.png";
import UndergarmentImage from "../../assets/images/undergarments.png";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const WardrobeItems = useBoundStore((state) => state.wardrobeItems);

  const numberOfTops = WardrobeItems.filter(
    (item) => item.clothing_category === "Top"
  ).length;

  const numberOfBottoms = WardrobeItems.filter(
    (item) => item.clothing_category === "Bottom"
  ).length;

  const numberOfUndergarments = WardrobeItems.filter(
    (item) => item.clothing_category === "Undergarments"
  ).length;

  return (
    <Container
      maxWidth="lg"
      className="flex flex-col gap-4 p-5 overflow-y-auto"
    >
      <WelcomeCard />
      <section className="flex gap-4 flex-wrap">
        <StatisticsCard title="Tops" value={numberOfTops} />
        <StatisticsCard title="Bottoms" value={numberOfBottoms} />
        <StatisticsCard title="Undergarments" value={numberOfUndergarments} />
      </section>
      <CurrentItemsTable />
    </Container>
  );
}

function WelcomeCard() {
  return (
    <section className="flex rounded-md p-6 lg:max-h-48 text-white shadow-sm bg-primary-dark">
      <div className="flex flex-col gap-4 flex-[1_1_80%]">
        <span className="flex flex-col">
          <h1 className="font-bold text-lg">Welcome back,</h1>
          <h2 className="text-gray-300">John Doe</h2>
        </span>
        <span className="flex flex-col gap-2 w-full lg:w-2/3">
          <p className="text-sm text-gray-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            doloremque?
          </p>
          <GoButton id={1} />
        </span>
      </div>
      <div className="flex-[1_1_30%] hidden lg:block">
        <img src={welcome_logo} alt="Dashboard" className="" />
      </div>
    </section>
  );
}

function StatisticsCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="flex flex-col flex-[1_0_30%] justify-between bg-primary-dark gap-4 rounded-md p-6 text-gray-200 shadow-sm">
      <h1 className="font-semibold">{title}</h1>
      <h2 className="text-3xl">{value}</h2>
    </div>
  );
}

function CurrentItemsTable() {
  const WardrobeItems = useBoundStore((state) => state.wardrobeItems);
  const currentItems = WardrobeItems.filter(
    (item) => item.status === "In Laundry"
  );

  return (
    <section className="flex flex-col gap-3.5 p-6 text-white rounded-md shadow-sm bg-primary-dark">
      <h1 className="font-semibold tracking-wide">
        Current Items in the Laundry
      </h1>
      {currentItems.map((item, index) => (
        <CurrentItemsCard
          id={item.id}
          clothing_category={item.clothing_category}
          description={item.description}
          name={item.name}
          status={item.status}
          key={item.id}
        />
      ))}
    </section>
  );
}

function CurrentItemsCard({
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
      className="flex px-4 py-2 bg-gray-600 rounded-md items-center gap-4"
    >
      <img
        src={handleImagePlaceholder(clothing_category)}
        alt="image_placeholder"
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
      <GoButton className="ml-auto" id={id} />
    </div>
  );
}

function GoButton({ className, id }: { className?: string; id: number }) {
  const navigate = useNavigate();

  const handleGoButtonClick = () => {
    navigate(`/wardrobe/${id}`);
  };

  return (
    <button
      onClick={handleGoButtonClick}
      className={
        "rounded-md px-4 py-2 w-fit font-semibold text-sm text-white bg-primary-main hover:bg-blue-500 " +
        className
      }
    >
      Go
    </button>
  );
}
export default Dashboard;
