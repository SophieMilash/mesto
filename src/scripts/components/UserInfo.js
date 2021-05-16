export default class UserInfo {
  constructor({ name, activity }) {
    this._name = name;
    this._activity = activity;
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      activity: this._activity.textContent
    };
    return userData;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._activity.textContent = data.activity;
  }
}
