import { FormatListBulleted, Sort } from "@mui/icons-material";
import { Container, IconButton, Pagination } from "@mui/material";
import logo from "../../assets/images/logo.png";

function Wardrobe() {
  return (
    <Container maxWidth="lg" className="flex flex-col gap-4 p-5">
      <section className="w-full flex justify-between flex-wrap">
        <TypeButtonGroup />
        <ViewButtonGroup />
      </section>
      <Pagination shape="rounded" hideNextButton hidePrevButton count={10} />
      <section className="flex gap-4">
        <WardrobeCard />
        {/* <WardrobeCard />
        <WardrobeCard /> */}
      </section>
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

function TypeButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      className={
        "bg-primary-dark hover:bg-primary-main text-gray-100 rounded-md min-h-0 px-6 py-2 " +
        className
      }
    >
      {label}
    </button>
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

function WardrobeCard() {
  return (
    <div className="flex flex-col min-w-[40%] gap-3 bg-primary-dark p-4 rounded-md">
      <h1>Lorem, ipsum dolor.</h1>
      <img
        src={logo}
        alt="logo"
        className="bg-gray-800 p-2 rounded-md max-h-56 object-contain"
      />
      <div className="flex justify-between pt-3">
        <div className="flex gap-2 items-center">
          <span className="rounded-full bg-green-400 size-2.5" />
          <span className="flex flex-col leading-5 text-sm">
            <h1 className="font-semibold tracking-wide">Status</h1>
            <p className="text-gray-300 text-xs">Available</p>
          </span>
        </div>
        <span className="flex flex-col leading-5 text-sm">
          <h1 className="font-semibold tracking-wide">Last Date of Laundry</h1>
          <p className="text-gray-300 text-xs">10/12/2002</p>
        </span>
      </div>
    </div>
  );
}

export default Wardrobe;
