import User from "./user";

class UserAccount extends User {
  constructor(props) {
    const { username, theme } = props;
    super(username, theme);

    // Default attribute values
    this._guest = true;
  }

  get guest() {
    return this._guest;
  }

  set guest(is_guest) {
    this._guest = is_guest;
  }
}

export default UserAccount;
