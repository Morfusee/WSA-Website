import { Container, TextField, FormControl, InputLabel, Select, MenuItem, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


function CreateLaundry() {
    const navigate = useNavigate();
  
    const handleCancelClick = () => {
      navigate("/wardrobe");
    };
    
    return (
      <Container
        maxWidth="md"
        className="flex flex-col gap-4 p-5 overflow-y-auto"
      >
        <h1 className="text-xl font-bold text-gray-300 opacity-85">
          Add Clothes
        </h1>
        <section className="flex flex-col gap-2.5">
          <TextField
            label="Name"
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "0.75rem",
              },
            }}
            required
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "0.75rem",
              },
            }}
          />
          <FormControl>
            <InputLabel>Clothing Category</InputLabel>
            <Select
              label="Clothing Category"
              sx={{
                "& fieldset.MuiOutlinedInput-notchedOutline": {
                  borderRadius: "0.75rem",
                },
              }}
            >
              <MenuItem value={"Top"}>Top</MenuItem>
              <MenuItem value={"Bottom"}>Bottom</MenuItem>
              <MenuItem value={"Undergarments"}>Undergarments</MenuItem>
            </Select>
          </FormControl>
          <Box className="flex gap-2 ml-auto">
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
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </Box>
        </section>
      </Container>
    );
  }