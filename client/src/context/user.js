import { createContext, useState, useEffect } from "react";
import UserAccount from "../classes/user-account";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import makeid from "../utils/others/generateString";

export const UserAccountContext = createContext({});

export function UserContextProvider({ children }) {
  const [userDetails, setUserDetails] = useLocalStorage(
    "user",
    JSON.stringify({
      username: `Guest_${makeid(5)}`,
      theme: "#0984e3",
    })
  );
  const [save, triggerSave] = useState(false);
  const [user] = useState(
    new UserAccount({
      username: userDetails ? JSON.parse(userDetails).username : "Guest",
      theme: userDetails ? JSON.parse(userDetails).theme : "#0984e3",
    })
  );

  useEffect(() => {
    setUserDetails(
      JSON.stringify({ username: user.username, theme: user.theme })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [save]);

  return (
    <UserAccountContext.Provider value={{ user, save, triggerSave }}>
      {children}
    </UserAccountContext.Provider>
  );
}
