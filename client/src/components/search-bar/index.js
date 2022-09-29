import { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import synclogo from "../../images/logo192.png";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { SearchContext } from "../../context/search";

export default function SearchBarComponent({ setOpen }) {
  const { searchQuery, setSearchQuery, toggleSearchRequest } =
    useContext(SearchContext);

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleSearchRequest={toggleSearchRequest}
        setOpen={setOpen}
      />
    </div>
  );
}

function SearchBar({
  setSearchQuery,
  searchQuery,
  toggleSearchRequest,
  setOpen,
}) {
  const enterKeyHandler = (event) => {
    if (event.key === "Enter") {
      toggleSearchRequest((search) => !search);
      setOpen(false);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={synclogo} alt="SyncPoly-logo" height={120} />
      </div>
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
                  setOpen(false);
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
