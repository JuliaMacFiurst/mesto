import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector(".popup__image");
        this._popupCaption = this._popup.querySelector(".popup__caption")
    }
    open(name, link) {
        document.addEventListener('keydown', () => super._handleEscClose(evt));
        super.setEventListeners();
        super.open(name, link);
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupCaption.textContent = name;
          }
    }
