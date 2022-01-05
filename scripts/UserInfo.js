export default class UserInfo {
    constructor({ name:userNameSelector, info:userAboutSelector}) {
        this._profileName = document.querySelector(userNameSelector);
        this._profileInfo = document.querySelector(userAboutSelector);
    }

    getUserInfo() {
        const userInfo = {
          name: this._profileName.textContent,
          info: this._profileInfo.textContent
        }

        return userInfo;
    }

    setUserInfo(name, info) {
        this._profileName.textContent = name;
        this._profileInfo.textContent = info;
    }
}