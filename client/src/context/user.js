import { createContext, useState, useEffect } from "react";
import UserAccount from "../classes/user-account";
import makeid from "../utils/others/generateString";
import { Backdrop, CircularProgress } from "@mui/material";

export const UserAccountContext = createContext({});

export function UserContextProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(
    new UserAccount({
      username: `Guest_${makeid(5)}`,
      theme: "#0984e3",
      email: "",
    })
  );

  useEffect(() => {
    setUser(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  useEffect(() => {
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function setup() {
    try {
      await user.getAccessToken();
      await user.getCurrentUser({ setLoggedIn, setLoading });
    } catch (err) {
      setLoading(false);
    }
  }

  return (
    <UserAccountContext.Provider value={{ user, loggedIn, setLoggedIn }}>
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        children
      )}
    </UserAccountContext.Provider>
  );
}
