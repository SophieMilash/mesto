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

  setUserInfo({nameInput, activityInput}) {
    nameInput.value = this._name.textContent;
    activityInput.value = this._activity.textContent;
  }
}
