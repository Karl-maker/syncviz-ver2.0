import { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
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
  const enterKeyHandler = (event) => {
    if (event.key === "Enter") {
      toggleSearchRequest((search) => !search);
    }
  };

  return (
    <>
      <TextField
        id="search-bar"
        inputRef={(input) => {
          if (input != null) {
            input.focus();
          }
        }}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        sx={{ margin: "5px" }}
        fullWidth
        onKeyDown={enterKeyHandler}
        label="Search Virtual Rooms"
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          textAlign: "center",
        }}
      >
        <Typography variant="caption">
          Search through all public Virtual Rooms using key words and hashtags
        </Typography>
      </div>
    </>
  );
}
