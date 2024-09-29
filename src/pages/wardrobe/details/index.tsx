import { Container, Divider, IconButton } from "@mui/material";
import logo from "../../../assets/images/logo.png";
import { ArrowBack, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Details() {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
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
        src={logo}
        alt="logo"
        className="bg-primary-dark shadow-sm p-2 rounded-md max-h-56 object-contain"
      />
      <section className="bg-primary-dark shadow-sm p-5 rounded-md flex flex-col gap-2">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-xl">Lorem, ipsum dolor.</h1>
            <span className="flex gap-2 items-center text-sm">
              <h2 className="">Top</h2>
              <span className="size-1 bg-gray-300 rounded-full" />
              <h2 className="">Available</h2>
            </span>
          </div>
          <IconButton className="size-8">
            <Edit htmlColor="white" fontSize="small" />
          </IconButton>
        </div>
        <Divider />
        <div className="flex justify-between gap-1.5 flex-wrap">
          <InfoHeirarchy title="Previous Session" value="Session 8" />
          <InfoHeirarchy title="Last Washed" value="September 23, 2024" />
          <InfoHeirarchy title="Date Added" value="September 23, 2024" />
        </div>
        <Divider />
        <span className="flex flex-col text-sm">
          <h2 className="text-lg">Description</h2>
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt optio
            repudiandae fugit accusantium aut vel praesentium nostrum ab,
            eligendi consequatur.
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
