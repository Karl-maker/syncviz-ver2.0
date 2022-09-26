import User from "./user";
import config from "../config";

class UserAccount extends User {
  constructor({ username, theme, email, img, credential }) {
    super(username, theme, img);

    // Default attribute values
    this._credential = credential || null;
    this._access_token = null;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get credential() {
    return this._credential;
  }

  set credential(credential) {
    this._credential = credential;
  }

  get access_token() {
    return this._access_token || "";
  }

  set access_token(access_token) {
    this._access_token = access_token;
  }

  async getAccessToken() {
    const res = await fetch(`${config.API.LIVE_SERVER}/api/auth/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "API-Key",
      },
    });

    const data = await res.json();

    if (data.access_token) {
      this._access_token = data.access_token;
      return data.access_token;
    } else return false;
  }

  async checkLastRoom() {
    try {
      const res = await fetch(
        `${config.API.LIVE_SERVER}/api/virtual-room/find-one`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this._access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data._id) return data._id;

      return null;
    } catch (err) {
      return null;
    }
  }

  async getCurrentUser({ setLoggedIn, setLoading }) {
    try {
      const res = await fetch(`${config.API.LIVE_SERVER}/api/auth/current`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this._access_token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.user) {
        this._email = data.user.email;
        this._username = data.user.username;
        this._img = data.user.picture;

        if (setLoggedIn) setLoggedIn((log) => !log);
      }

      if (setLoading) setLoading(false);

      return data;
    } catch (err) {
      throw err;
    }
  }
}

export default UserAccount;
