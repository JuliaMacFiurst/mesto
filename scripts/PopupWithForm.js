import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleSubmit }) {
        super(popupSelector);

        this._popupForm = this._popup.querySelector(".popup__form");
        this._handleSubmit = handleSubmit;
        this._inputList = this._popupForm.querySelectorAll(".popup__input");
    }
    _getInputValues() {
        this._newValues = {};
        this._inputList.forEach(input => {
            this._newValues[input.name] = input.value;
        });
        return this._newValues;
    }


    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener ('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
        });       
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}