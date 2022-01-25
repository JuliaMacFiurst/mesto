export default class UserInfo {
    constructor({ name:userNameSelector, about:userAboutSelector}) {
        this._profileName = document.querySelector(userNameSelector);
        this._profileInfo = document.querySelector(userAboutSelector);
    }

    getUserInfo() {
        const userInfo = {
          name: this._profileName.textContent,
          about: this._profileInfo.textContent
        }

        return userInfo;
    }

    setUserInfo(name, about) {
        this._profileName.textContent = name;
        this._profileInfo.textContent = about;
    }
}