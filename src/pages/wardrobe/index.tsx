import { Add, FormatListBulleted, Sort } from "@mui/icons-material";
import { Container, Fab, IconButton, Pagination } from "@mui/material";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import TypeButton from "../../components/TypeButton";

function Wardrobe() {
  const navigate = useNavigate();
  const handleFabClick = () => {
    navigate("/wardrobe/add");
  };
  return (
    <Container
      maxWidth="lg"
      className="flex flex-col gap-4 p-5 overflow-y-auto"
    >
      <section className="w-full flex justify-between flex-wrap">
        <TypeButtonGroup />
        <ViewButtonGroup />
      </section>
      <Pagination shape="rounded" hideNextButton hidePrevButton count={10} />
      <section className="flex gap-4 flex-wrap">
        {Array.from(Array(10)).map((x, i) => (
          <WardrobeCard key={i} id={i.toString()} />
        ))}
      </section>
      <Fab color="primary" aria-label="add" onClick={handleFabClick}>
        <Add />
      </Fab>
    </Container>
  );
}

function TypeButtonGroup() {
  return (
    <section className="flex gap-2">
      <TypeButton label="Top" />
      <TypeButton label="Bottom" />
      <TypeButton label="Undergarments" />
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

function WardrobeCard({ id }: { id: string }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/wardrobe/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col min-w-[32%] gap-3 hover:cursor-pointer hover:bg-gray-600 bg-primary-dark p-4 rounded-md"
    >
      <img
        src={logo}
        alt="logo"
        className="bg-gray-800 shadow-sm p-2 rounded-md max-h-56 object-contain"
      />
      <span className="flex flex-col gap-0.5">
        <h1 className="text-gray-200 font-semibold">Lorem, ipsum dolor.</h1>
        <h6 className="text-gray-300 text-sm">Top</h6>
        <div className="flex items-center gap-1.5 text-sm">
          <h6 className="text-gray-300">Available</h6>
          <span className="size-1 bg-gray-300 rounded-full" />
          <h6 className="text-gray-300">September 23, 2024</h6>
        </div>
      </span>
    </div>
  );
}

export default Wardrobe;
