export default class UserInfo {
    constructor({ name:userNameSelector, about:userAboutSelector, avatar:userAvatarSelector}) {
        this._profileName = document.querySelector(userNameSelector);
        this._profileInfo = document.querySelector(userAboutSelector);
        this._profileAvatar = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        const userInfo = {
          name: this._profileName.textContent,
          about: this._profileInfo.textContent
        }

        return userInfo;
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileInfo.textContent = data.about;
        this.setAvatar(data.avatar);
    }

    setAvatar(url) {
        this._profileAvatar.src = url;
    }
}