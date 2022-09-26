import PAGE from "../utils/constants/page-names";
import { UserAccountContext } from "../context/user";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

export default function ProtectPage({ children }) {
  const navigation = useNavigate();
  const { loggedIn } = useContext(UserAccountContext);

  useEffect(() => {
    if (!loggedIn) {
      navigation(PAGE.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return <>{loggedIn ? <>{children}</> : <></>}</>;
}
