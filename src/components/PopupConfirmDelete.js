import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector)

        // this._handleSubmit = handleSubmit;

        this._form = document.querySelector(".popup__form");
        this._popupButton = this._form.querySelector(".place__remove-button");
        // this._popupButtonTextContent = this._popupButton.textContent;
        // this._submitDelete = this._submitDelete.bind(this);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault()
            this._handleSubmit
        })
    }

    submitDeleteAction(action) {
        this._handleSubmit = action
        // evt.preventDefault();
        // this._handleSubmit(this._data)
        // this._form.removeEventListener('submit', this._submitDelete)
    }

    


}