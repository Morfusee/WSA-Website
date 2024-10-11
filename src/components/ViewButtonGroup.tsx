import { Sort, GridView, FormatListBulleted } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useBoundStore } from "../utils/store";

function ViewButtonGroup({ hideFormatButton }: { hideFormatButton?: boolean }) {
  const { setWardrobePageFormatType, wardrobePageConfig } = useBoundStore();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortClick = () => {
    setSearchParams((params) => {
      params.has("sort") ? params.delete("sort") : params.append("sort", "asc");

      return params;
    });
  };

  const handleFormatClick = () => {
    wardrobePageConfig.formatType === "list"
      ? setWardrobePageFormatType("grid")
      : setWardrobePageFormatType("list");
  };

  return (
    <span className="flex gap-2 items-center">
      <IconButton
        sx={{
          "&:hover": {
            backgroundColor: "primary.main",
          },
        }}
        onClick={handleSortClick}
      >
        <Sort
          htmlColor="white"
          sx={{
            transform: searchParams.has("sort")
              ? "rotate(180deg) scaleX(-1)"
              : "rotate(0deg)",
          }}
        />
      </IconButton>
      {!hideFormatButton && (
        <IconButton
          sx={{
            "&:hover": {
              backgroundColor: "primary.main",
            },
          }}
          onClick={handleFormatClick}
        >
          {wardrobePageConfig.formatType === "list" ? (
            <GridView htmlColor="white" />
          ) : (
            <FormatListBulleted htmlColor="white" />
          )}
        </IconButton>
      )}
    </span>
  );
}

export default ViewButtonGroup;
