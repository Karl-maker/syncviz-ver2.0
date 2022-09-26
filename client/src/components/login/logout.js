import makeid from "../../utils/others/generateString";
import config from "../../config";

export default async function Logout(user, setLogin) {
  let data = null;

  try {
    const res = await fetch(`${config.API.LIVE_SERVER}/api/auth/`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-type": "API-Key",
      },
    });

    data = await res.json();
  } catch (err) {}

  user.username = `Guest_${makeid(5)}`;
  user.email = "";
  user.img = "";

  setLogin(false);

  return data;
}
