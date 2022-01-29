import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._form = this._popup.querySelector(".popup__form");
        this._popupButton = this._form.querySelector(".popup__sbmt-button");
        this._popupButtonTextContent = this._popupButton.textContent;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault()
            this._handleSubmit()
        })
    }

    
    submitDeleteAction(action) {
        this._handleSubmit = action
        
    }

    renderDeletionLoading(isLoading) {
        if(isLoading) {
          this._popupButton.textContent = 'Сохранение...'
        } else {
          this._popupButton.textContent = this._popupButtonTextContent
        }
      }

}