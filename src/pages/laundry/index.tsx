import { Add, MoreVert, Search } from "@mui/icons-material";
import {
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

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
      <Button className="flex gap-1.5 items-center">
        <Add fontSize="small" />
        Add Laundry
      </Button>
    </section>
  );
}

function SessionTable() {
  return (
    <section className="grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_1rem] gap-y-2">
      <span className="col-span-3 grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_1rem]">
        <h1 className="font-semibold col-span-1">Name</h1>
        <h1 className="font-semibold col-span-1 hidden sm:block">
          Date Sent Out
        </h1>
      </span>
      <Divider className="col-span-3" />
      {Array.from(Array(7)).map((x, i) => (
        <SessionTableCard key={i} />
      ))}
    </section>
  );
}

function SessionTableCard() {
  return (
    <span className="col-span-3 items-center grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_1rem] bg-primary-dark p-5 rounded-md relative">
      <h1 className="font-semibold col-span-2 sm:col-span-1 flex items-center gap-2">
        <span className="bg-orange-400 rounded-full size-2.5" />
        Session 1
      </h1>
      <h2 className="col-span-1 truncate hidden sm:block">
        September 23, 2024
      </h2>
      <IconButton size="small" className="col-span-1">
        <MoreVert fontSize="small" />
      </IconButton>
    </span>
  );
}

export default Laundry;
