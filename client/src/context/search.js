import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PAGE from "../utils/constants/page-names";

export const SearchContext = createContext({});

export function SearchContextProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchRquest, toggleSearchRequest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchRquest) {
      // Search Page
      navigate(`${PAGE.METAVERSE_SEARCH}?q=${searchQuery}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchRquest]);

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, toggleSearchRequest }}
    >
      {children}
    </SearchContext.Provider>
  );
}
