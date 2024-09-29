import { Add, ArrowBack, Search, Sort } from "@mui/icons-material";
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TypeButton from "../../../components/TypeButton";
import logo from "../../../assets/images/logo.png";

function Contents() {
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
          Session 1
        </h1>
      </span>

      <section className="flex flex-col gap-2">
        <span className="flex gap-2">
          <TextField
            placeholder="Search"
            variant="standard"
            className="flex-1"
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
          >
            <Add fontSize="small" />
            Add Items
          </Button>
        </span>
        <section className="flex gap-2">
          <TypeButton label="Top" />
          <TypeButton label="Bottom" />
          <TypeButton label="Undergarments" />
          <IconButton
            sx={{
              ml: "auto",
            }}
          >
            <Sort />
          </IconButton>
        </section>
      </section>
      <section className="flex flex-col gap-2">
        {Array.from(Array(10)).map((x, i) => (
          <ContentsCard key={i} />
        ))}
      </section>
    </Container>
  );
}

function ContentsCard() {
  return (
    <div className="flex px-4 py-2 bg-primary-dark rounded-md items-center gap-4">
      <img
        src={logo}
        alt=""
        className="w-14 h-10 object-contain bg-gray-800 rounded-md"
      />
      <span className="flex flex-col">
        <h1 className="font-semibold">Lorem ipsum dolor sit amet.</h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
          illo.
        </p>
      </span>
      <CustomSelect />
    </div>
  );
}

function CustomSelect() {
  return (
    <select
      name="CustomSelect"
      id="CustomSelect"
      className="ml-auto bg-gray-800 text-primary-light text-sm px-2 py-1 rounded-md min-w-20"
    >
      <option value="Pending">Pending</option>
      <option value="Returned">Returned</option>
    </select>
  );
}

export default Contents;
