export default class UserInfo {
  constructor({ name, activity }) {
    this._name = name;
    this._activity = activity;
  }

  getUserInfo() {

  }

  setUserInfo(data) {
    this._name.textContent = data.value;
    this._activity.textContent = data.value;
  }
}
