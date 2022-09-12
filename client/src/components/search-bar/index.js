import { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { SearchContext } from "../../context/search";

export default function SearchBarComponent() {
  const { searchQuery, setSearchQuery, toggleSearchRequest } =
    useContext(SearchContext);

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleSearchRequest={toggleSearchRequest}
      />
    </div>
  );
}

function SearchBar({ setSearchQuery, searchQuery, toggleSearchRequest }) {
  return (
    <form>
      <TextField
        id="search-bar"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        sx={{ margin: "5px" }}
        fullWidth
        label="Search Metaverse"
        variant="outlined"
        placeholder="Search"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="search"
                size="small"
                onClick={() => {
                  toggleSearchRequest((search) => !search);
                }}
              >
                <BsSearch />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
