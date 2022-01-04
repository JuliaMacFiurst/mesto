import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector(".popup_open-image");
        this._popupCaption = this._popup.querySelector(".popup__caption")
    }
    open({ name, link }) {
        super.open();
        this._image.src = values.link;
        this._image.alt = values.name;
        this._popupCaption.textContent = values.name;
          }
    }
