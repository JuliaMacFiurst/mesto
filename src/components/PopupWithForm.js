import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleSubmit }) {
        super(popupSelector);

        this._popupForm = this._popup.querySelector(".popup__form");
        this._handleSubmit = handleSubmit;
        this._inputList = Array.from(this._popupForm.querySelectorAll(".popup__input"));
        this._newValues = {};

        this._getInputValues = this._getInputValues.bind(this);
        this._submitBtn = this._popupForm.querySelector(".popup__sbmt-button");
        this._originSubmitBtnText = this._submitBtn.textContent;
    }
    _getInputValues() {
        this._inputList.forEach(
            (input) =>
            (this._newValues[input.name] = input.value)
        );
        return this._newValues;
    }


    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener ('submit', () => {
            this._handleSubmit(this._getInputValues());
        });       
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    renderLoading(isLoading) {
        if(isLoading) {
            this._submitBtn.textContent = "Сохранение..."
            
        } else {
            this._submitBtn.textContent = this._originSubmitBtnText;
        
        }
    }
}