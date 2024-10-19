import { Add, MoreVert, Search } from "@mui/icons-material";
import {
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../../utils/store";
import { ILaundry } from "../../interfaces/ILaundry";

function Laundry() {
  return (
    <Container
      maxWidth="lg"
      className="flex flex-col gap-4 p-5 overflow-y-auto"
    >
      <TopSection />
      <SessionTable />
    </Container>
  );
}

function TopSection() {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/laundry/create");
  };

  return (
    <section className="flex gap-2 items-center">
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
      <Button className="flex gap-1.5 items-center" onClick={handleAddClick}>
        <Add fontSize="small" />
        Add Laundry
      </Button>
    </section>
  );
}

function SessionTable() {
  const { laundryItems } = useBoundStore();
  return (
    <section className="grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_2rem] gap-y-2">
      <span className="col-span-3 grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_2rem]">
        <h1 className="font-semibold col-span-1">Name</h1>
        <h1 className="font-semibold col-span-1 hidden sm:block">
          Date Sent Out
        </h1>
      </span>
      <Divider className="col-span-3" />
      {laundryItems.map((item, index) => (
        <SessionTableCard
          key={item.id}
          id={item.id}
          session_name={item.session_name}
          session_date={item.session_date}
        />
      ))}
    </section>
  );
}

function SessionTableCard({
  id,
  session_name,
  session_date,
}: Omit<ILaundry, "laundry_items">) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/laundry/${id}`);
  };

  return (
    <span
      onClick={handleCardClick}
      className="col-span-3 hover:cursor-pointer hover:bg-gray-700 items-center grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_2rem] bg-primary-dark p-5 rounded-md relative"
    >
      <h1 className="font-semibold col-span-2 sm:col-span-1 flex items-center gap-2">
        <span className="bg-orange-400 rounded-full size-2.5" />
        {session_name}
      </h1>
      <h2 className="col-span-1 truncate hidden sm:block">{session_date}</h2>
      {/* <IconButton size="small" className="col-span-1">
        <MoreVert fontSize="small" />
      </IconButton> */}
    </span>
  );
}

export default Laundry;
