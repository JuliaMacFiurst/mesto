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

    setUserInfo(name, about, avatar) {
        this._profileName.textContent = name;
        this._profileInfo.textContent = about;
        this.setAvatar(avatar);
    }

    setAvatar(avatar) {
        this._profileAvatar.src = avatar;
    }
}