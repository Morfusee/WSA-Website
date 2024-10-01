import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Container, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";
import TypeButton from "../../../../components/TypeButton";

function AddContents() {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
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
      <section className="flex justify-between flex-wrap gap-y-2">
        <span className="flex gap-1 overflow-y-auto">
          <TypeButton label="Top" />
          <TypeButton label="Bottom" />
          <TypeButton label="Undergarments" />
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
      </section>
      <section className="flex flex-col gap-1.5">
        {Array.from(Array(10)).map((x, i) => (
          <ClothesCard key={i} />
        ))}
      </section>
    </Container>
  );
}

function ClothesCard() {
  return (
    <div className="cursor-pointer hover:bg-gray-700 flex px-4 py-2 bg-primary-dark rounded-md items-center gap-4">
      <img
        src={logo}
        alt=""
        className="w-14 h-10 min-w-14 min-h-10 object-contain bg-gray-800 rounded-md"
      />
      <span className="flex flex-col">
        <h1 className="font-semibold line-clamp-1">Lorem ipsum dolor sit amet.</h1>
        <p className="text-sm line-clamp-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
          illo.
        </p>
      </span>
    </div>
  );
}

export default AddContents;
